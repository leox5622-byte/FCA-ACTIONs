# nickname

Set or change a participant's nickname in a group chat via MQTT.

## API

### Method Signature
```js
api.nickname(nickname, threadID, participantID, callback?, initiatorID?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `nickname` | string | ✅ | New nickname text |
| `threadID` | string | ✅ | Target thread ID |
| `participantID` | string | ✅ | User ID to set nickname for |
| `callback` | function | | `(err, result) => {}` |
| `initiatorID` | string | | Sender ID (defaults to bot's user ID) |

### Returns
```js
{
  type: "thread_nickname_update",
  threadID: "961645156614788",
  participantID: "100037951718438",
  newNickname: "Dora Bot",
  senderID: "61586059919455",
  BotID: "61586059919455",
  timestamp: 1779134818333
}
```

### Example
```js
const result = await api.nickname("My Nickname", "961645156614788", "100037951718438");
```

## AI JSON Action
TID = Thread ID (e.g., `"961645156614788"`), UID = User ID (e.g., `"100037951718438"`)
```json
{"action":"nick","value":"New Name","target":"UID","thread":"TID"}
```

## Notes
- Requires MQTT connection — must call `api.listenMqtt()` first
- Also available as `api.changeNickname` (alias)
- Pass empty string `""` to remove a nickname

## Viewing Nicknames
To read/show nicknames, use **`getThreadInfo`**:
```js
const info = await api.getThreadInfo("961645156614788");
console.log(info.nicknames);
// { "100037951718438": "Dora Bot" }
```
There is no separate "get nickname" module — nicknames are part of `getThreadInfo`.
## Roadmap

**Phase:** Customization & Moderation
**Category:** Moderation
**Status:** Working
**Next Steps:** Maintain