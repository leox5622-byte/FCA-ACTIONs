# sendMessageMqtt

Send a message via MQTT protocol (alternative to REST). Requires MQTT connection (`api.listenMqtt`).

## API

Same signature as `sendMessage`:
| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string/object | Message body string or message object [required] |
| `threadID` | string | Target thread ID [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ messageID, threadID }` on success.

## AI JSON Action

```json
{"action":"send","body":"text","mqtt":true}
```

## Example

```javascript
api.sendMessageMqtt({ body: "Hello via MQTT!" }, "961645156614788", (err, res) => {
  if (err) return console.error(err);
  console.log("Sent:", res.messageID);
});
```

## Notes
- Sends message via MQTT instead of REST API
- Same return format as `sendMessage`
- Requires MQTT connection to be active

## Test

**Tested:** 2026-05-19 — Success
- `sendMessageMqtt({ body: "Test MQTT message" }, gcID)` returned valid `{ messageID: "mid.$...", threadID: "961645156614788" }`
- Message appeared in GC immediately
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Maintain - MQTT fallback for sendMessage