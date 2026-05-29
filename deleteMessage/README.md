# deleteMessage

Delete/unsend a message by ID.

## API

### Method Signature
```js
api.deleteMessage(messageID, callback?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `messageID` | string | ✅ | ID of the message to delete |
| `callback` | function | | `(err, result) => {}` |

### Returns
```js
{ success: true }
```

### Example
```js
await api.deleteMessage("mid.$gAANqnHX1woSk...");
```

## AI JSON Action
```json
{"action":"delete","msgID":"mid.xxx"}
```

## Notes
- Removes the message for everyone (same as `unsendMessage` internally)
- Uses `messaging/unsend_message/` endpoint (the old `ajax/mercury/delete_messages.php` is deprecated by Facebook)
- Bot must have sent the message or be admin
- No MQTT required
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Monitor unsend_message endpoint stability