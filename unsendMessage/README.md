# unsendMessage

Unsend/recall a message that was sent by the bot.

## API

### Method Signature
```js
api.unsendMessage(messageID)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `messageID` | string | ✅ | ID of the message to unsend |

### Returns
```json
{ "__ar": 1, "rid": "...", "payload": null, "lid": "..." }
```

### Example
```js
const result = await api.unsendMessage("mid.$gAANqnHX1woSkbe...");
```

## AI JSON Action
TID = Thread ID (e.g., `"961645156614788"`)
```json
{"action":"unsend","msgID":"mid.xxx","target":"TID"}
```

## Notes
- Uses HTTP POST to Facebook's `messaging/unsend_message/` endpoint
- Only works on messages sent by the bot
- No MQTT required — works with basic HTTP session
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Maintain