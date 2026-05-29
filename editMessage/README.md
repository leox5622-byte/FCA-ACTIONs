# editMessage

Edit a bot's previously sent message via MQTT.

## API

### Method Signature
```js
api.editMessage(text, messageID, callback?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | ✅ | New text content |
| `messageID` | string | ✅ | ID of the message to edit |
| `callback` | function | | `(err) => {}` |

### Example
```js
api.editMessage("[edited] Hello!", "mid.$gAANqnHX1woSkbeYfDWePKDXTmKbe");
```

## AI JSON Action
TID = Thread ID (e.g., `"961645156614788"`)
```json
{"action":"edit","value":"New text","msgID":"mid.xxx","target":"TID"}
```

## Notes
- Requires MQTT connection — must call `api.listenMqtt()` first
- Only works on messages sent by the bot
- No confirmation callback — publishes to MQTT and returns immediately
- Does NOT return a promise (no async/await support)

## Limits
- **Edit window:** Can only edit messages within **15 minutes** of sending
- **Edit count:** Tested up to **15 edits** — first ~6 edits apply, later edits may be silently dropped by Facebook
- **Practical limit:** ~5-6 edits per message within a short window; additional edits publish via MQTT but don't take effect
- After 15 minutes, the edit will publish to MQTT but Facebook will silently ignore it
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Maintain