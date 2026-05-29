# gcname

Change the group chat name via MQTT.

## API

### Method Signature
```js
api.gcname(newName, threadID, callback?, initiatorID?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `newName` | string | ✅ | New group name |
| `threadID` | string | ✅ | Target thread ID |
| `callback` | function | | `(err, result) => {}` |
| `initiatorID` | string | | Sender ID (defaults to bot's user ID) |

### Returns
```js
{
  type: "thread_name_update",
  threadID: "961645156614788",
  newName: "Dora Test GC",
  senderID: "61586059919455",
  BotID: "61586059919455",
  timestamp: 1779134045212
}
```

### Example
```js
const result = await api.gcname("My Group", "961645156614788");
```

## AI JSON Action
TID = Thread ID (e.g., `"961645156614788"`)
```json
{"action":"gcname","value":"New Group Name","target":"TID"}
```

## Notes
- Requires MQTT connection — must call `api.listenMqtt()` first
- Returns immediately after MQTT publish (no server confirmation)
- If group has no MQTT-connected bot, the name may not update client-side
## Roadmap

**Phase:** Social & Advanced
**Category:** Group Management
**Status:** Working
**Next Steps:** Maintain