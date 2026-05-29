# dora-actions — Roadmap

> 75 Facebook Chat API modules for `@neoaz07/nkxfca`  
> Status: **54/56 tested working**, 2 broken, 12 skipped  
> Last updated: May 20, 2026

---

## Phase 1 — Foundation

**Status: Complete**

Core plumbing — messaging, thread operations, groups, users, read state, and MQTT event loop. Everything needed for a basic functioning bot.

### Modules

| Module | File | Tested |
|--------|------|--------|
| sendMessage | `sendMessage/sendMessage.js` | ✅ |
| sendMessageMqtt | `sendMessageMqtt/sendMessageMqtt.js` | ✅ |
| sendTypingIndicator | `sendTypingIndicator/sendTypingIndicator.js` | ✅ |
| editMessage | `editMessage/editMessage.js` | ✅ |
| unsendMessage | `unsendMessage/unsendMessage.js` | ✅ |
| deleteMessage | `deleteMessage/deleteMessage.js` | ✅ |
| forwardMessage | `forwardMessage/forwardMessage.js` | ✅ |
| getMessage | `getMessage/getMessage.js` | ✅ |
| getThreadHistory | `getThreadHistory/getThreadHistory.js` | ✅ |
| getThreadInfo | `getThreadInfo/getThreadInfo.js` | ✅ |
| getThreadList | `getThreadList/getThreadList.js` | ✅ |
| markAsRead | `markAsRead/markAsRead.js` | ✅ |
| markAsDelivered | `markAsDelivered/markAsDelivered.js` | ✅ |
| muteThread | `muteThread/muteThread.js` | ✅ |
| markAsReadAll | `markAsReadAll/markAsReadAll.js` | ✅ |
| markAsSeen | `markAsSeen/markAsSeen.js` | ✅ |
| searchForThread | `searchForThread/searchForThread.js` | ✅ |

### Architecture Notes

- **Paradigm:** Primarily REST (`defaultFuncs.post` → `messaging/send/`, `api/graphqlbatch/`)
- **MQTT dependency:** `sendMessageMqtt`, `markAsRead`, `markAsDelivered` require `listenMqtt` to be running
- **Cross-calls:** `sendMessage` falls back to `api.sendMessageMqtt` when REST fails; calls `api.getThreadInfo` to detect group vs single; calls `api.sendTypingIndicator` for typing simulation
- **Anti-suspension:** All sends route through `globalAntiSuspension.prepareBeforeMessage()`, `simulateTyping()`, `addSmartDelay()`

---

## Phase 2 — Customization & Moderation

**Status: Complete**

Thread themes, reactions, moderation actions, pinned messages, and AI theme generation. Adds visual and behavioral control over conversations.

### Modules

| Module | File | Tested |
|--------|------|--------|
| changeThreadColor | `changeThreadColor/changeThreadColor.js` | ✅ |
| changeThreadEmoji | `changeThreadEmoji/changeThreadEmoji.js` | ✅ |
| setThreadTheme | `setThreadTheme/setThreadTheme.js` | ✅ |
| setThreadThemeMqtt | `setThreadThemeMqtt/setThreadThemeMqtt.js` | ✅ |
| theme | `theme/theme.js` | ✅ |
| fetchThemeData | `fetchThemeData/fetchThemeData.js` | ✅ |
| getThemeInfo | `getThemeInfo/getThemeInfo.js` | ✅ |
| produceMetaTheme | `produceMetaTheme/produceMetaTheme.js` | ✅ |
| createAITheme | `createAITheme/createAITheme.js` | ✅ |
| emoji | `emoji/emoji.js` | ✅ |
| setMessageReaction | `setMessageReaction/setMessageReaction.js` | ✅ |
| setMessageReactionMqtt | `setMessageReactionMqtt/setMessageReactionMqtt.js` | ✅ |
| pinMessage | `pinMessage/pinMessage.js` | ✅ |
| changeArchivedStatus | `changeArchivedStatus/changeArchivedStatus.js` | ✅ |
| changeBlockedStatus | `changeBlockedStatus/changeBlockedStatus.js` | ✅ |
| handleMessageRequest | `handleMessageRequest/handleMessageRequest.js` | ✅ |
| nickname | `nickname/nickname.js` | ✅ |

### Architecture Notes

- **Dual paradigm:** Most operations have both REST (`setThreadTheme`, `setMessageReaction`) and MQTT (`setThreadThemeMqtt`, `setMessageReactionMqtt`) implementations
- **MQTT pattern:** `changeThreadColor`, `createAITheme`, `pinMessage` use the publish-to-`/ls_req` / listen-on-`/ls_resp` request-response pattern
- **MQTT prerequisite:** All MQTT variants require `api.listenMqtt()` to be called first with a ~3-second wait
- **GraphQL doc_ids used for theme:** `9734829906576883` (set thread theme), `23873748445608673` (create AI theme)

---

## Phase 3 — Social & Advanced

**Status: Complete**

Friend management, user operations, HTTP wrappers, polls, 2FA access, E2EE, and contact sharing.

### Modules

| Module | File | Tested |
|--------|------|--------|
| addUserToGroup | `addUserToGroup/addUserToGroup.js` | ✅ |
| removeUserFromGroup | `removeUserFromGroup/removeUserFromGroup.js` | ✅ |
| createNewGroup | `createNewGroup/createNewGroup.js` | ✅ |
| changeAdminStatus | `changeAdminStatus/changeAdminStatus.js` | ✅ |
| gcname | `gcname/gcname.js` | ✅ |
| gcmember | `gcmember/gcmember.js` | ✅ |
| gcrule | `gcrule/gcrule.js` | ✅ |
| changeGroupImage | `changeGroupImage/changeGroupImage.js` | ✅ |
| createPoll | `createPoll/createPoll.js` | ✅ |
| getUserInfo | `getUserInfo/getUserInfo.js` | ✅ |
| getUserInfoV2 | `getUserInfoV2/getUserInfoV2.js` | ✅ |
| getFriendsList | `getFriendsList/getFriendsList.js` | ✅ |
| getUserID | `getUserID/getUserID.js` | ✅ |
| getBotInfo | `getBotInfo/getBotInfo.js` | ✅ |
| getBotInitialData | `getBotInitialData/getBotInitialData.js` | ✅ |
| changeAvatar | `changeAvatar/changeAvatar.js` | ✅ |
| changeBio | `changeBio/changeBio.js` | ✅ |
| follow | `follow/follow.js` | ✅ |
| friend | `friend/friend.js` | ✅ |
| shareContact | `shareContact/shareContact.js` | ✅ |
| httpGet | `httpGet/httpGet.js` | ✅ |
| httpPost | `httpPost/httpPost.js` | ✅ |
| httpPostFormData | `httpPostFormData/httpPostFormData.js` | ✅ |
| addExternalModule | `addExternalModule/addExternalModule.js` | ✅ |
| getAccess | `getAccess/getAccess.js` | ✅ |
| realtime | `realtime/realtime.js` | ✅ |

### Architecture Notes

- **`friend` module** returns an object with sub-methods: `api.friend.requests()`, `api.friend.accept()`, `api.friend.list()`, `api.friend.suggest.list()`, `api.friend.suggest.request()`
- **`getUserID`** (fixed) uses GET HTML scraping instead of blocked POST endpoint → bypasses checkpoint 1357004
- **`changeGroupImage`** requires `fs.createReadStream()` because FormData upload needs `path` property for MIME detection
- **`createPoll`** uses MQTT publish — requires `listenMqtt`
- **`realtime`** uses a separate WebSocket (`gateway.facebook.com/ws/realtime`) via `undici`, independent of MQTT

---

## Phase 4 — Resilience & Anti-Detection

**Status: Complete**

Checkpoint bypasses, session auto-recovery, anti-suspension, rate limiting, fingerprinting, and MQTT reconnection.

### Modules

| Module | File | Tested |
|--------|------|--------|
| listenMqtt | `listenMqtt/listenMqtt.js` | ✅ |
| mqttDeltaValue | `mqttDeltaValue/mqttDeltaValue.js` | ⏭️ (internal) |
| resolvePhotoUrl | `resolvePhotoUrl/resolvePhotoUrl.js` | ✅ |

### Dispatches / Cross-cutting

| Component | File | Role |
|-----------|------|------|
| Anti-suspension | `nkxfca/src/utils/antiSuspension.js` | Typing simulation, smart delays, circuit breaker, warmup |
| Rate limiter | `nkxfca/src/utils/rateLimiter.js` | Per-endpoint, per-thread cooldowns |
| Token refresh | `nkxfca/src/utils/tokenRefresh.js` | Periodic token refresh every ~30 min |
| Auto re-login | `nkxfca/src/utils/autoReLogin.js` | Full re-login with stored credentials |
| MQTT auth error | `listenMqtt/listenMqtt.js` | `emitAuthError` on 401/403/checkpoint |
| Cookie persistence | `nkxfca/src/database/` | SQLite cookie backup every 5-15 min |

### Key Technical Details

- **Checkpoint 1357004 bypass:** `defaultFuncs.get()` avoids `parseAndCheckLogin` (only `defaultFuncs.post()` triggers it). Used by `getUserID` and `resolvePhotoUrl`
- **Checkpoint is endpoint-level, not session-level** — other endpoints continue working
- **MQTT recovery flow:** quick-close → token refresh → re-login → `scheduleRecovery()` (10-15 min delay)
- **Persona fingerprinting:** Desktop vs Android UA strings with cached `sec-ch-ua` / `platform` headers
- **MQTT reconnection jitter:** Randomized backoff to avoid pattern detection

---

## Phase 5 — Test Infrastructure

**Status: Complete**

Live testing against real Messenger API endpoints, dedicated test bot, comprehensive reporting.

### Components

| Component | Details |
|-----------|---------|
| Test harness | `test-harness/` — Node.js v22, depends on `@neoaz07/nkxfca` |
| Authentication | `appstate.json` (cookies from browser login) |
| Bot account | Ven Ti (`61586059919455`) |
| Test GC | `961645156614788` (bot is admin) |
| Test scripts | `test-checkpoint.js` — modular test runner |
| Reporting | `REPORT.md` (545 lines), `SUMMARY.md` (113 lines) |

### Testing Protocol

1. Copy module(s) into `nkxfca/src/apis/`
2. Run test script via `node test-harness/test-checkpoint.js`
3. Verify output in console + check messages in test GC
4. Document results in module README + main README

### Test Results Summary

```
Session 1:   19 tested → 15 ✅, 1 ⚠️, 3 ❌
Session 2:   14 tested → 13 ✅, 1 ❌
Session 3:   25+ tested + fixes → 54 ✅, 2 ❌
Final:       56 tested → 54 ✅ (96.4%), 2 ❌ (3.6%)
```

---

## Phase 6 — Maintenance & Gap Closure

**Status: Planned**

Remaining issues, tech debt, and future improvements.

### High Priority

| Item | Module | Issue | Effort |
|------|--------|-------|--------|
| Fix share | `share/share.js` | GraphQL doc_id `28939050904374351` expired — capture fresh from Messenger DevTools | Medium |
| Fix listenSpeed | `listenSpeed/listenSpeed.js` | Missing `websocket-stream` npm dependency — install package | Low |
| Verify comment | `comment/comment.js` | Needs a valid Facebook postID to test | Low |
| Refresh doc_ids | `fetchThemeData/fetchThemeData.js` | Some doc_ids return errors for certain themes | Medium |

### Medium Priority

| Item | Description | Effort |
|------|-------------|--------|
| CI test suite | Automated headless browser login + module regression tests | High |
| TypeScript types | `.d.ts` definitions for all 75 modules | High |
| Lint + format | ESLint + Prettier across all JS files | Medium |
| Deprecation audit | Review all `ajax/mercury/` endpoints for replacement | Medium |

### Low Priority

| Item | Description | Effort |
|------|-------------|--------|
| getTheme optimization | Avoid 50+ sequential fetchThemeData calls | Medium |
| Story module | `story/story.js` — test Facebook story posting | Low |
| Notes module | `notes/notes.js` — test notes feature | Low |
| Stickers module | `stickers/stickkers.js` — test sticker search | Low |
| E2EE coverage | `e2ee/e2ee.js` — test end-to-end encryption flow | Low |
| deleteThread | `deleteThread/deleteThread.js` — document destructive impact | Low |
| logout | `logout/logout.js` — document session invalidation | Low |
| unfriend | `unfriend/unfriend.js` — document destructive behavior | Low |

### Maintenance Cadence

- Facebook GraphQL `doc_id` values expire periodically — capture fresh ones from Messenger Web DevTools (Network tab → filter `graphql`)
- REST endpoints get deprecated — migrate to MQTT equivalents when available
- Anti-detection heuristics should be reviewed every 3-6 months
- Session recovery logic may need updates if Facebook changes login flow

---

## Dependency Graph

```
listenMqtt (MQTT event loop)
├── Required by: sendMessageMqtt, markAsRead, markAsDelivered
├── Required by: changeThreadColor, setThreadThemeMqtt,
│               setMessageReactionMqtt, pinMessage, gcmember,
│               gcrule, changeGroupImage, createPoll
└── Uses: mqttDeltaValue (internal delta parser)

sendMessage (core send)
├── Calls: getThreadInfo (for group detection)
├── Calls: sendTypingIndicator (for typing simulation)
├── Falls back to: sendMessageMqtt (on REST failure)
└── Uses: e2ee (for encrypted group messages)

getUserID, resolvePhotoUrl
└── Uses: defaultFuncs.get (bypasses parseAndCheckLogin)
    → Avoids checkpoint 1357004

friend, follow, getThreadInfo
└── Uses: GraphQL POST via defaultFuncs.post
    → doc_id identifies the operation

pinMessage
├── MQTT request to /ls_req (pin/unpin via task labels 430/431)
└── HTTP GET to /messages/t/{threadID}/ (list via utils.json)
```

## Module Pattern Reference

Every module follows this exact skeleton:

```
"use strict";
const utils = require('../utils');

module.exports = (defaultFuncs, api, ctx) => {
  return async function moduleName(args, callback) {
    // Promise/callback duality boilerplate
    let resolveFunc = () => {};
    let rejectFunc = () => {};
    const returnPromise = new Promise((resolve, reject) => {
      resolveFunc = resolve;
      rejectFunc = reject;
    });
    if (!callback) {
      callback = (err, data) => {
        if (err) return rejectFunc(err);
        resolveFunc(data);
      };
    }
    // ... implementation ...
    return returnPromise;
  };
};
```

Variants:
- **Object return:** `friend`, `pinMessage` → `{ requests(), accept(), list(), suggest: {...} }`
- **Sync return:** `addExternalModule`, `setMessageReactionMqtt` — fire-and-forget
- **Async return:** most modules — `async function`
