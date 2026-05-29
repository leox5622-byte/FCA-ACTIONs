# setThreadThemeMqtt

Set a Messenger theme for a thread via MQTT protocol. Requires MQTT connection (`api.listenMqtt`).

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadID` | string | Target thread ID [required] |
| `themeID` | string | Numeric theme ID [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

Result data from MQTT response.

## AI JSON Action

```json
{"action":"setTheme","threadID":"961645156614788","themeID":"169463077092846"}
```

## Notes

- MQTT-based alternative to REST `setThreadTheme`
- Theme IDs are numeric fbid strings

## Example

```javascript
api.setThreadThemeMqtt("961645156614788", "169463077092846", (err, res) => {
  if (err) return console.error(err);
  console.log("Theme set via MQTT:", res);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `setThreadThemeMqtt(gcID, "169463077092846")` returned `undefined` (Fire-and-forget MQTT publish — theme applied)
## Roadmap

**Phase:** Customization & Moderation
**Category:** Thread Customization
**Status:** Working
**Next Steps:** MQTT variant