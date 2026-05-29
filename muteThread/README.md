# muteThread

Mute or unmute group notifications. Requires MQTT connection (`api.listenMqtt`).

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadID` | string | Target thread ID [required] |
| `seconds` | number | Duration in seconds (`0` = unmute, default: `3600`) |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ success: true }` on success.

## AI JSON Action

```json
{"action":"mute","seconds":3600}
{"action":"mute","seconds":0}
```

## Notes

- Requires MQTT. Uses `ajax/mercury/change_mute_thread.php` endpoint.
- `seconds=0` unmutes the thread.
- Default mute duration is 3600 seconds (1 hour).

## Example

```javascript
// Mute for 1 hour
api.muteThread("961645156614788", 3600, (err, res) => {
  if (err) return console.error(err);
  console.log("Muted:", res); // { success: true }
});

// Unmute
api.muteThread("961645156614788", 0, (err, res) => {
  if (err) return console.error(err);
  console.log("Unmuted:", res);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `muteThread("961645156614788", 3600)` returned `{ success: true }`
- Endpoint `ajax/mercury/change_mute_thread.php` is still functional
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** REST endpoint confirmed functional