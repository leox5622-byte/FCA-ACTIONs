# setMessageReactionMqtt

React to a message using MQTT protocol (alternative to REST-based `setMessageReaction`). Requires MQTT connection.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `messageID` | string | Message ID to react to [required] |
| `reaction` | string | Reaction emoji (e.g. `"😍"`, `"👍"`, `"😂"`) or empty string to remove |
| `callback` | function | (Optional) `(err, result)` |

## Returns

Reaction result data on success.

## AI JSON Action

```json
{"action":"react","msgID":"mid.xxx","reaction":"😍"}
```

## Notes

- Use empty string `""` to remove reaction
- MQTT-based alternative to `setMessageReaction`
- Requires `listenMqtt` to be active

## Example

```javascript
// React to a message
api.setMessageReactionMqtt("mid.$gAANqnHX1woSkcqwvi2eQWbxCbTGQ", "😍", (err, res) => {
  if (err) return console.error(err);
  console.log("Reacted:", res);
});

// Remove reaction
api.setMessageReactionMqtt("mid.$gAANqnHX1woSkcqwvi2eQWbxCbTGQ", "", (err, res) => {
  if (err) return console.error(err);
  console.log("Reaction removed:", res);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `setMessageReactionMqtt(recentMsgId, "👍")` returned `undefined` (success)
- Reaction appeared on the message in GC
## Roadmap

**Phase:** Customization & Moderation
**Category:** Reactions & Pin
**Status:** Working
**Next Steps:** MQTT variant