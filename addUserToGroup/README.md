# addUserToGroup

Add one or more users to a group chat via MQTT.

## API

### Method Signature
```js
api.addUserToGroup(userID, threadID, callback?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `userID` | string \| string[] | ✅ | Single UID or array of UIDs to add |
| `threadID` | string | ✅ | Target thread ID |
| `callback` | function | | `(err, result) => {}` |

### Returns
```js
{ success: true, response: { ... } }
```

### Example
```js
// Add single user
await api.addUserToGroup("100037951718438", "961645156614788");

// Add multiple users
await api.addUserToGroup(["100037951718438", "61550921545749"], "961645156614788");
```

## AI JSON Action
TID = Thread ID, UID = User ID
```json
{"action":"add","targets":["UID1","UID2"],"thread":"TID"}
```

## Notes
- Requires MQTT connection — must call `api.listenMqtt()` first
- Waits for MQTT response with 30-second timeout
- Supports single user or array of users
- Bot does not need to be admin in some groups
## Roadmap

**Phase:** Social & Advanced
**Category:** Group Management
**Status:** Working
**Next Steps:** Maintain