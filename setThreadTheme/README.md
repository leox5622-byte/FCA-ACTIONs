# setThreadTheme

Set a Messenger theme for a thread using REST/GraphQL. Supports both string theme IDs and theme data objects.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadID` | string | Target thread ID [required] |
| `themeData` | string/object | Theme ID string or theme object with `themeId`/`theme_id`/`id` [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` on success with: `threadID`, `themeId`, `customEmoji`, `timestamp`, `success`, `method`, `availableThemes`.

## AI JSON Action

```json
{"action":"setTheme","threadID":"961645156614788","themeID":"169463077092846"}
```

## Notes

- Works with string theme IDs (e.g., `"169463077092846"` for Hot Pink)
- First fetches bootloader data, then sends GraphQL mutation
- The `setThreadThemeMqtt` (MQTT version) is an alternative

## Example

```javascript
api.setThreadTheme("961645156614788", "169463077092846", (err, res) => {
  if (err) return console.error(err);
  console.log("Theme set:", res);
  // { threadID, themeId: "169463077092846", success: true, method: "legacy", ... }
});
```

## Test

**Tested:** 2026-05-19 — Success
- `setThreadTheme(gcID, "169463077092846")` returned full response with `success: true`, `method: "legacy"`, and list of available themes
- Hot Pink theme was applied to the test GC
## Roadmap

**Phase:** Customization & Moderation
**Category:** Thread Customization
**Status:** Working
**Next Steps:** REST GraphQL variant