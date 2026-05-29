# realtime

Subscribe or unsubscribe from Facebook realtime presence and event updates.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `action` | string | `"subscribe"` or `"unsubscribe"` [required] |
| `event` | string | Event type to subscribe to (e.g. `"presence"`) [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — Result from the realtime subscription.

## AI JSON Action

Not available as a direct action — use via code.

## Example

```javascript
// Subscribe to presence updates
api.realtime("subscribe", "presence", (err, res) => {
  if (err) return console.error(err);
  console.log("Subscribed:", res);
});

// Unsubscribe
api.realtime("unsubscribe", "presence", (err, res) => {
  if (err) return console.error(err);
  console.log("Unsubscribed:", res);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `realtime("subscribe", "presence")` returned subscriber object
- nkxfca logs: "Realtime connected"
## Roadmap

**Phase:** Social & Advanced
**Category:** Other
**Status:** Working
**Next Steps:** WebSocket presence - independent of MQTT