# sendTypingIndicator

Show or hide the "typing..." indicator in a thread via MQTT.

## API

### Method Signature
```js
api.sendTypingIndicator(isTyping, threadID, callback?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `isTyping` | boolean | ✅ | `true` to show typing, `false` to hide |
| `threadID` | string | ✅ | Target thread ID |
| `callback` | function | | `(err) => {}` |

### Example
```js
// Show typing
await api.sendTypingIndicator(true, "961645156614788");

// Hide typing after 4 seconds
await new Promise(r => setTimeout(r, 4000));
await api.sendTypingIndicator(false, "961645156614788");
```

## AI JSON Action
TID = Thread ID (e.g., `"961645156614788"`)
```json
{"action":"typing","value":true,"target":"TID"}
{"action":"typing","value":false,"target":"TID"}
```

## Notes
- Requires MQTT connection — must call `api.listenMqtt()` first
- Typing indicator auto-hides after ~5 seconds if not turned off
- Has 8-second MQTT publish timeout built in
- Used internally by `sendMessage` for simulated typing
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Maintain