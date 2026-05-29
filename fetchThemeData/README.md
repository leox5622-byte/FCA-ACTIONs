# fetchThemeData

Fetch detailed data for a specific Messenger theme by its ID.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `themeID` | string | Numeric theme ID [required] |
| `callback` | function | (Optional) `(err, data)` |

## Returns

`Object` — Theme details including:
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Theme ID |
| `name` | string | Theme accessibility label / name |
| `description` | string | Theme description |
| `gradient_colors` | string[] | Gradient color hex codes |
| `message_text_color` | string | Text color hex |
| `composer_input_background_color` | string | Input background color |
| `background_asset` | object|null | Background image data |
| `alternative_themes` | array | Nested alternative theme IDs |
| `primary_color` | string | Primary gradient color |

## AI JSON Action

```json
{"action":"fetchThemeData","themeID":"169463077092846"}
```

## Notes

- Uses GraphQL `doc_id: "9734829906576883"` (may be stale)
- Alternative themes are fetched recursively (first only)
- Known issue: GraphQL doc_id may return query errors for many themes

## Example

```javascript
api.fetchThemeData("169463077092846", (err, data) => {
  if (err) return console.error(err);
  console.log("Theme:", data.name);
  console.log("Colors:", data.gradient_colors);
});
```
## Roadmap

**Phase:** Customization & Moderation
**Category:** Thread Customization
**Status:** Working
**Next Steps:** Refresh stale GraphQL doc_ids