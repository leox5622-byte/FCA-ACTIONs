# getTheme

Fetch all available Messenger themes with detailed data. Internally calls `fetchThemeData` for each theme.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadID` | string | Thread ID for referer header [required] |
| `callback` | function | (Optional) `(err, themes)` |

## Returns

`Array` — Array of theme objects with fields: `id`, `name`, `theme_idx`, `accessibility_label`, plus detailed fields from `fetchThemeData`.

## AI JSON Action

```json
{"action":"getTheme"}
```

## Example

```javascript
api.getTheme("961645156614788", (err, themes) => {
  if (err) return console.error(err);
  console.log("Available themes:", themes.length);
  themes.forEach(t => console.log(t.name, t.id));
});
```

## Notes

- Uses GraphQL `doc_id: "24474714052117636"` to list themes
- Calls `fetchThemeData` for each theme (slow — 50+ individual API calls)
- Known issue: `fetchThemeData` GraphQL query may fail for many themes (error 1675030)
- Some themes may return minimal data if `fetchThemeData` fails
## Roadmap

**Phase:** Maintenance
**Category:** Skipped
**Status:** Skipped - Performance
**Next Steps:** Too slow (50+ sequential calls) - optimize or cache