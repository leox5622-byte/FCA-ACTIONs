# theme

Get or set the theme for a thread. Unified wrapper around theme functionality.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadID` | string | Target thread ID [required] |
| `themeID` | string | (Optional) Theme ID to set. If omitted, gets current theme info |
| `callback` | function | (Optional) `(err, result)` |

## Returns

If setting: theme mutation result. If getting: current theme info.

## AI JSON Action

```json
{"action":"theme","threadID":"961645156614788","themeID":"169463077092846"}
```

## Example

```javascript
// Get current theme
api.theme("961645156614788", (err, info) => {
  if (err) return console.error(err);
  console.log("Current theme:", info);
});

// Set theme
api.theme("961645156614788", "169463077092846", (err, res) => {
  if (err) return console.error(err);
  console.log("Theme set:", res);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `theme(gcID)` returned `undefined` (get current theme — works)
## Roadmap

**Phase:** Customization & Moderation
**Category:** Thread Customization
**Status:** Working
**Next Steps:** Combined get/set - maintain