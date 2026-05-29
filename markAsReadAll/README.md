# markAsReadAll

Mark all threads as read in the Messenger inbox.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | function | (Optional) `(err)` |

## Returns

`undefined` on success.

## AI JSON Action

```json
{"action":"markReadAll"}
```

## Example

```javascript
api.markAsReadAll((err) => {
  if (err) return console.error(err);
  console.log("All threads marked as read");
});
```

## Test

**Tested:** 2026-05-19 — Success
- `markAsReadAll()` returned `undefined` (success)
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Maintain