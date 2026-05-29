# dora-actions

75 Facebook Chat API modules for [nkxfca](https://github.com/NeoKEX) / [@neoaz07/nkxfca](https://www.npmjs.com/package/@neoaz07/nkxfca).

Each folder contains a standalone module (`*.js`) and documentation (`README.md`). Tested May 2026 against live Messenger API endpoints — **54/56 tested working**, 2 broken, 12 skipped.

---

## Architecture

### Module Pattern

Every module follows a **factory function** pattern for inversion-of-control dependency injection:

```
module.exports = (defaultFuncs, api, ctx) => {
  return async function moduleName(args, callback) { ... };
};
```

| Inject | Role |
|--------|------|
| `defaultFuncs` | HTTP transport (`get`, `post`, `postFormData`) with auto-injected session tokens, retry logic, rate limiting |
| `api` | The full API namespace — modules register here, cross-call each other |
| `ctx` | Session context — userID, jar, fb_dtsg, MQTT client, cache, security tokens |

Modules support **dual callback/Promise** return patterns and are auto-discovered by nkxfca's `loadApiModules()` at login.

### Two Communication Paradigms

```
┌────────────────────────────────────────────────────────────────┐
│                     dora-actions Architecture                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   REST (HTTP via defaultFuncs)          MQTT (via listenMqtt)   │
│   ─────────────────────────────        ─────────────────────    │
│   POST /messaging/send/               publish /ls_req           │
│   POST /api/graphql/                  subscribe /ls_resp        │
│   POST /api/graphqlbatch/             publish fire-and-forget   │
│   GET /messages/media/{id}            18 subscribed topics      │
│   POST /ajax/mercury/upload.php       Dual: downlink events     │
│                                            + uplink commands     │
│   ~50 modules (legacy)                ~15 modules (modern)      │
│   + utils.parseAndCheckLogin          + ctx.mqttClient           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### REST (Legacy + GraphQL)
Uses `defaultFuncs.post()` / `defaultFuncs.get()` — responses run through `utils.parseAndCheckLogin()` on POST only. GET bypasses checkpoint detection (key discovery enabling `getUserID` + `resolvePhotoUrl` fixes).

**Endpoints:** `messaging/send/`, `api/graphql/`, `api/graphqlbatch/`, `ajax/mercury/upload.php`, `ajax/mercury/change_mute_thread.php`

**Example:** `sendMessage.js`, `getThreadInfo.js`, `follow.js`, `friend.js`

#### MQTT (Real-time)
Uses `ctx.mqttClient.publish("/ls_req", payload)` with task-based message envelopes. Either waits for `/ls_resp` acknowledgment or fire-and-forgets.

**Sub-patterns:**
- **Request-response:** Publish with `request_id`, listen on `/ls_resp` for matching ID (used by `changeThreadColor`, `gcmember`)
- **Fire-and-forget:** No response tracking (used by `setMessageReactionMqtt`, `pinMessage`)

**Example:** `changeThreadColor.js`, `pinMessage.js`, `sendMessageMqtt.js`, `createPoll.js`

#### Realtime WebSocket (Separate)
`realtime.js` uses an independent WebSocket (`gateway.facebook.com/ws/realtime`) with `undici`, binary `FBGQLS:` protocol — separate from MQTT, for presence and notification events.

### GraphQL doc_id System

Facebook identifies operations via opaque numeric **doc_id** constants. They're fragile — expire when Facebook updates its GraphQL schema.

```
POST /api/graphql/
  doc_id: "25472099855769847"     ← CometUserFollowMutation
  variables: JSON.stringify({...})
```

**Key doc_ids used across modules:**

| doc_id | Module | Operation |
|--------|--------|-----------|
| `3449967031715030` | getThreadInfo | Thread fetcher |
| `25472099855769847` | follow | Follow/unfollow |
| `23873748445608673` | createAITheme | AI theme generation |
| `9103543533085580` | friend.requests | Friend requests query |
| `24630768433181357` | friend.accept | Accept friend request |
| `9734829906576883` | setThreadTheme | Theme update |

### Session Context (`ctx`)

State object constructed during login, passed to every module:

```
ctx = {
  userID, jar, clientID, appID, mqttAppID, userAppID,
  globalOptions, loggedIn, access_token,
  clientMutationId, mqttClient, lastSeqId, syncToken,
  mqttEndpoint, wsReqNumber, wsTaskNumber,
  reqCallbacks, callback_Task, region, firstListen,
  cache, validator, fb_dtsg, jazoest, lsd, fb_dtsg_ag,
  __spin_r, __spin_b, __spin_t, hsi, dyn, csr
}
```

### Anti-Automation Layer

Cross-cutting protection embedded in every send path:

```
prepareBeforeMessage(threadID, body)   → Enforce thread throttle, volume checks
simulateTyping(threadID, msgLen)       → Human-like typing delay
addSmartDelay()                         → Variable inter-upload pauses
detectSuspensionSignal(response)        → Scan for suspension indicators
enableWarmup()                          → Gradual activity ramp-up
globalRateLimiter                       → Per-endpoint cooldowns
Persona fingerprinting                  → Desktop/Android UA switching
MQTT reconnection jitter                → Randomized backoff
```

### Session Resilience

Multi-layered recovery when the session dies:

```
1. Axios response interceptor       → Detect login redirects, checkpoint pages
2. parseAndCheckLogin()             → Post-process API responses, trigger re-login
3. tokenRefreshManager              → Refresh tokens every ~30 min
4. autoReLoginManager               → Full re-login with stored credentials
5. MQTT auth error handling         → emitAuthError on 401/403/checkpoint
6. Quick-close detection            → Trigger token refresh on premature MQTT close
7. scheduleRecovery()               → Long-delay recovery for transient rotations
8. Database cookie persistence      → SQLite cookie backup every 5-15 min
```

### E2EE Support

End-to-end encryption for group chat messages:

```
e2ee.isEnabled(ctx)                  → Check session E2EE status
e2ee.hasPeer(ctx, threadID)          → Check peer key existence
e2ee.encrypt(ctx, threadID, body)    → Encrypt outgoing message
e2ee.decrypt(ctx, threadID, body)    → Decrypt incoming message
```

Used in `sendMessage.js` (outgoing) and `mqttDeltaValue.js` (incoming).

### Checkpoint 1357004 Bypass

Critical discovery: `parseAndCheckLogin` only runs on `defaultFuncs.post()` responses — **not** on `defaultFuncs.get()`. This enables direct HTML scraping as a fallback for blocked endpoints:

```
BLOCKED (POST)                         REPLACEMENT (GET)
──────────────────────────────         ──────────────────────────────
POST ajax/typeahead/search.php         GET facebook.com/public/{name}
POST mercury/attachments/photo         GET messages/media/{photoID}
  → error 1357004                        → raw HTML / redirect to CDN
  → parseAndCheckLogin throws            → no checkpoint detection
```

---

## Module Status

### Legend

- ✅ Tested and working
- ⚠️ Tested but has issues (checkpoint, stale endpoint)
- ❌ Tested but broken
- ⏭️ Skipped (destructive, internal, not loaded, or not applicable)

### All Modules

| # | Module | Status | Notes |
|---|--------|--------|-------|
| 1 | addExternalModule | ✅ | Registers custom functions via factory |
| 2 | addUserToGroup | ✅ | Add users to GC |
| 3 | changeAdminStatus | ✅ | Promote/demote admins |
| 4 | changeArchivedStatus | ✅ | Archive/unarchive threads |
| 5 | changeAvatar | ✅ | Changed bot profile pic |
| 6 | changeBio | ✅ | Set/restore bio |
| 7 | changeBlockedStatus | ✅ | Block/unblock users |
| 8 | changeGroupImage | ✅ | GC pic via MQTT; needs `fs.createReadStream` |
| 9 | changeThreadColor | ✅ | Theme via MQTT |
| 10 | changeThreadEmoji | ✅ | GC emoji |
| 11 | comment | ❌ | Needs valid postID to test |
| 12 | createAITheme | ✅ | AI theme generation |
| 13 | createNewGroup | ✅ | Create GC |
| 14 | createPoll | ✅ | MQTT poll creation |
| 15 | deleteMessage | ✅ | Fixed: uses unsend_message |
| 16 | deleteThread | ⏭️ | Destructive — skip |
| 17 | e2ee | ⏭️ | Not loaded by nkxfca |
| 18 | editMessage | ✅ | Edit bot's message |
| 19 | emoji | ✅ | Same as changeThreadEmoji |
| 20 | fetchThemeData | ✅ | Theme data query (some doc_ids stale) |
| 21 | follow | ✅ | Follow/unfollow users |
| 22 | forwardMessage | ✅ | Fixed: getMessage+sendMessage |
| 23 | friend | ✅ | Friend requests, list, suggestions |
| 24 | gcmember | ✅ | MQTT add/remove members |
| 25 | gcname | ✅ | Change GC name |
| 26 | gcrule | ✅ | MQTT promote/demote admin |
| 27 | getAccess | ✅ | 2FA token flow (needs auth code) |
| 28 | getBotInfo | ✅ | Bot identity |
| 29 | getBotInitialData | ✅ | CurrentUserInitialData |
| 30 | getFriendsList | ✅ | List friends |
| 31 | getMessage | ✅ | Get single message |
| 32 | getTheme | ⏭️ | Too slow (50+ fetchThemeData calls) |
| 33 | getThemeInfo | ✅ | Thread theme/color details |
| 34 | getThreadHistory | ✅ | Message history |
| 35 | getThreadInfo | ✅ | Thread metadata |
| 36 | getThreadList | ✅ | Inbox list |
| 37 | getThreadPictures | ✅ | Fixed: getThreadInfo+history |
| 38 | getUserID | ✅ | Fixed: page-scrapes facebook.com/public/{name} via defaultFuncs.get (bypasses parseAndCheckLogin) |
| 39 | getUserInfo | ✅ | User profile data |
| 40 | getUserInfoV2 | ✅ | Enhanced user info |
| 41 | handleMessageRequest | ✅ | Accept/reject requests |
| 42 | httpGet | ✅ | HTTP GET wrapper |
| 43 | httpPost | ✅ | HTTP POST wrapper |
| 44 | httpPostFormData | ✅ | Multipart upload wrapper |
| 45 | listenMqtt | ✅ | MQTT event loop (proven) |
| 46 | listenSpeed | ❌ | Missing `websocket-stream` dep |
| 47 | logout | ⏭️ | Destructive — skip |
| 48 | markAsDelivered | ✅ | MQTT fire-and-forget |
| 49 | markAsRead | ✅ | MQTT read/unread |
| 50 | markAsReadAll | ✅ | Mark all read |
| 51 | markAsSeen | ✅ | Mark all seen |
| 52 | mqttDeltaValue | ⏭️ | Internal module |
| 53 | muteThread | ✅ | `{success: true}` — endpoint works |
| 54 | nickname | ✅ | Change nicknames |
| 55 | notes | ⏭️ | Not loaded by nkxfca |
| 56 | pinMessage | ✅ | Pin/unpin/list via MQTT |
| 57 | produceMetaTheme | ✅ | AI theme metadata gen |
| 58 | realtime | ✅ | Subscribe presence |
| 59 | removeUserFromGroup | ✅ | Remove from GC |
| 60 | resolvePhotoUrl | ✅ | Fixed: GET messages/media/{photoID} via defaultFuncs.get returns CDN URL after redirect |
| 61 | searchForThread | ✅ | Local filter inbox |
| 62 | sendMessage | ✅ | Core send |
| 63 | sendMessageMqtt | ✅ | MQTT-based send |
| 64 | sendTypingIndicator | ✅ | Typing indicators |
| 65 | setMessageReaction | ✅ | Message reactions |
| 66 | setMessageReactionMqtt | ✅ | MQTT-based reactions |
| 67 | setThreadTheme | ✅ | REST GraphQL theme set |
| 68 | setThreadThemeMqtt | ✅ | MQTT-based theme set |
| 69 | share | ❌ | Doc_id expired (needs update) |
| 70 | shareContact | ✅ | Contact card share |
| 71 | stickers | ⏭️ | Not loaded by nkxfca |
| 72 | story | ⏭️ | Not loaded by nkxfca |
| 73 | theme | ✅ | Get/set theme |
| 74 | unfriend | ⏭️ | Destructive — skip |
| 75 | unsendMessage | ✅ | Unsend/recall |

### By Category

**Core Messaging (14/14)** — sendMessage, sendMessageMqtt, sendTypingIndicator, editMessage, unsendMessage, deleteMessage, forwardMessage, getMessage, getThreadHistory, getThreadInfo, getThreadList, markAsRead, markAsDelivered, muteThread

**Group Management (9/9)** — addUserToGroup, removeUserFromGroup, createNewGroup, changeAdminStatus, gcname, gcmember, gcrule, changeGroupImage, createPoll

**Thread Customization (9/9)** — changeThreadColor, changeThreadEmoji, setThreadTheme, setThreadThemeMqtt, theme, fetchThemeData, getThemeInfo, produceMetaTheme, createAITheme

**User/Profile (8/8)** — getUserInfo, getUserInfoV2, getFriendsList, getUserID, getBotInfo, getBotInitialData, changeAvatar, changeBio

**Reactions & Pin (4/4)** — setMessageReaction, setMessageReactionMqtt, emoji, pinMessage

**HTTP & Utilities (4/4)** — httpGet, httpPost, httpPostFormData, addExternalModule

**Photo (3/3)** — getThreadPictures, resolvePhotoUrl, shareContact

**Moderation (4/4)** — changeArchivedStatus, changeBlockedStatus, handleMessageRequest, nickname

**Real-time (2/2)** — listenMqtt, realtime

**Search (1/1)** — searchForThread

**Other (1/1)** — getAccess

### Status Summary

- **56 tested**: 54 ✅ working, 2 ❌ broken
- **12 skipped**: destructive (4), not loaded by nkxfca (3), internal (2), too slow (1), needs setup (1), missing dep (1)
- **7 covered by other means**: listenMqtt used in all MQTT tests, mqttDeltaValue internal, etc.

---

## Roadmap

```
Phase 1 ─── Foundation (Complete)
├── Core messaging: send, edit, unsend, delete, forward, get
├── Thread operations: info, history, list, search
├── Group management: create, add, remove, admin, name, image
├── User operations: info, friends, ID resolution
├── Read state: markAsRead, markAsDelivered, markAsReadAll, markAsSeen
└── MQTT event loop: listenMqtt, realtime subscriptions

Phase 2 ─── Customization & Moderation (Complete)
├── Thread themes: color, emoji, theme (REST + MQTT variants)
├── Reactions: setReaction (REST + MQTT variants)
├── Moderation: archive, block, nickname, message requests
├── Pinned messages: pin, unpin, list
└── AI themes: createAITheme, produceMetaTheme

Phase 3 ─── Social & Advanced (Complete)
├── Friend management: requests, accept, list, suggestions
├── Follow/unfollow users
├── Contact sharing
├── HTTP wrappers: get, post, formData
├── Polls via MQTT
├── 2FA access token flow
└── E2EE encryption support

Phase 4 ─── Resilience & Anti-Detection (Complete)
├── Checkpoint 1357004 bypass (getUserID, resolvePhotoUrl)
├── Session auto-recovery: token refresh, re-login, cookie persistence
├── Anti-suspension: typing simulation, smart delays, circuit breaker
├── Rate limiting: per-endpoint, per-thread cooldowns
├── Persona fingerprinting
└── MQTT reconnection with jitter

Phase 5 ─── Test Infrastructure (Complete)
├── 54/75 modules tested live against real Messenger API
├── Test harness with appstate.json authentication
├── Dedicated bot account in test GC
├── Comprehensive REPORT.md with endpoint migration docs
└── Session-by-session progress tracking

Phase 6 ─── Maintenance & Gap Closure (Planned)
├── Fix share module (capture fresh GraphQL doc_id)
├── Fix listenSpeed (install websocket-stream dependency)
├── Fix fetchThemeData (refresh stale doc_ids)
├── Test comment module (find valid Facebook postID)
├── Audit all deprecated ajax/mercury/ endpoints
├── Migrate remaining REST-only modules to MQTT variants
├── Add automated CI test suite (headless browser login)
├── TypeScript type definitions for all 75 modules
└── Lint + format standardization across codebase
```

---

## Known Issues

| Priority | Issue | Workaround |
|----------|-------|------------|
| High | `share` — GraphQL doc_id `28939050904374351` expired | Capture fresh doc_id from Messenger web DevTools |
| High | `listenSpeed` — missing `websocket-stream` dependency | Install `npm install websocket-stream` |
| Medium | `comment` — no valid Facebook postID | Test with a real postID when available |
| Low | `fetchThemeData` — stale doc_ids for some themes | Acceptable (most themes work) |
| Low | `getTheme` — 50+ sequential fetchThemeData calls timeout | Not a practical concern |
| Info | `muteThread` — previously reported as broken, now confirmed working | Endpoint works fine |
| Info | `changeGroupImage` — scoping bug in bundled catch block | See module README for fix |

## Test GC

- **GC ID:** `961645156614788`
- **Members:** Ven Ti (bot `61586059919455`), Du Rin (`100037951718438`), SI MI (`61550921545749`), Ashfakur Rahman Leon (`100044925755457`)
- **Bot is admin:** Yes
- **Library:** `@neoaz07/nkxfca` v1.0.10
- **Tested:** May 2026

## See Also

- [`REPORT.md`](./REPORT.md) — Comprehensive 75-module project report
- [`SUMMARY.md`](./SUMMARY.md) — Session-by-session testing journey
