# markAsSeen

Mark all threads as seen (opens the Messenger app indicator).

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | function | (Optional) `(err)` |

## Returns

`undefined` on success.

## AI JSON Action

```json
{"action":"markSeen"}
```

## Example

```javascript
api.markAsSeen((err) => {
  if (err) return console.error(err);
  console.log("All threads marked as seen");
});
```

## Test

**Tested:** 2026-05-19 — Success
- `markAsSeen()` returned `undefined` (success)
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Maintain