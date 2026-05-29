# getThreadInfo

Get detailed information about a group chat (name, members, admins, emoji, message count, etc).

## API

### Method Signature
```js
api.getThreadInfo(threadID)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `threadID` | string \| string[] | ✅ | Single thread ID or array of IDs |

### Returns
An object with thread details:

| Field | Type | Description |
|-------|------|-------------|
| `threadID` | string | Unique thread identifier |
| `threadName` | string | Group chat name |
| `participantIDs` | string[] | All member user IDs |
| `userInfo` | object[] | Detailed info per member (id, name, firstName, vanity, gender, isFriend, isBirthday, thumbSrc) |
| `unreadCount` | number | Unread messages |
| `messageCount` | number | Total messages in thread |
| `isGroup` | boolean | `true` = group, `false` = DM |
| `isArchived` | boolean | Whether thread is archived |
| `folder` | string | Folder (e.g., `"INBOX"`) |
| `emoji` | string | Thread emoji (e.g., `"😆"`) |
| `color` | string | Thread color hex |
| `threadTheme` | string | Theme ID |
| `nicknames` | object | `{ userID: nickname }` map |
| `adminIDs` | object[] | Admin objects `{ id }` |
| `approvalMode` | boolean | Group approval on/off |
| `muteUntil` | number | Timestamp mute expires, null if not muted |
| `inviteLink` | object | `{ enable: boolean, link: string }` |
| `threadType` | number | `2` = group, `1` = DM |
| `canReply` | boolean | Whether bot can reply |
| `lastReadTimestamp` | string | Timestamp of last read |

### Example
```js
const info = await api.getThreadInfo("961645156614788");
console.log(info.threadName);      // "hola"
console.log(info.participantIDs);  // ["61550921545749", "61586059919455", ...]
console.log(info.nicknames);       // {"100037951718438": "my name 😄"}
console.log(info.unreadCount);     // 7
```

## AI JSON Action
TID = Thread ID (e.g., `"961645156614788"`)
```json
{"action":"info","target":"TID"}
{"action":"users","target":"TID"}
```

## Notes
- Fetches data via Facebook GraphQL batch endpoint
- Results are cached per thread
- Pass an array of IDs to fetch multiple threads at once
- `userInfo` includes each member's ID, display name, vanity username, gender, profile URL
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Maintain - batch GraphQL queries