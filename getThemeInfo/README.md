# getThemeInfo

Get current theme and color details for a thread. Supports both thread IDs and theme IDs.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `identifier` | string | Thread ID or theme ID [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — Theme info with:
| Field | Type | Description |
|-------|------|-------------|
| `threadID` | string | Target thread ID |
| `threadName` | string | Thread display name |
| `color` | string|null | Hex color code (e.g. `"0084FF"`) |
| `emoji` | string | Current thread emoji |
| `theme_id` | string|null | Theme ID if a theme is set |
| `theme_color` | string|null | Theme color |
| `gradient_colors` | array|null | Gradient color array |
| `is_default` | boolean | Whether default theme is used |

## AI JSON Action

```json
{"action":"themeInfo"}
```

## Example

```javascript
api.getThemeInfo("961645156614788", (err, info) => {
  if (err) return console.error(err);
  console.log("Theme:", info);
  // { threadID: "961645156614788", threadName: "Dora Test GC",
  //   color: "0084FF", emoji: "🎯", is_default: false }
});
```

## Test

**Tested:** 2026-05-19 — Success
- `getThemeInfo("961645156614788")` returned thread name, color (`"0084FF"`), emoji (`"🎯"`), and `is_default: false`
- Uses `api.getThreadInfo()` internally with additional formatting
## Roadmap

**Phase:** Customization & Moderation
**Category:** Thread Customization
**Status:** Working
**Next Steps:** Maintain