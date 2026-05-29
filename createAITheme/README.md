# createAITheme

Generate AI-powered chat themes from a text description using GraphQL `doc_id: 23873748445608673`.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `prompt` | string | Theme description [required] |
| `numThemes` | number | (Optional) Number of themes (1-10, default: 3) |
| `callback` | function | (Optional) `(err, themes)` |

## Returns

`Array` — Array of theme objects with `id`, `preview_image_urls` (light/dark), `background_asset`, `icon_asset`, color configs, and `alternative_themes` (dark mode variant).

## AI JSON Action

```json
{"action":"aiTheme","value":"ocean sunset with dolphins"}
```

## Example

```javascript
api.createAITheme("ocean sunset with dolphins", 2, (err, themes) => {
  if (err) return console.error(err);
  themes.forEach(t => {
    console.log("Theme ID:", t.id);
    console.log("Preview (light):", t.preview_image_urls.light_mode);
  });
});
```

## Test

```javascript
// Tested with prompt "ocean sunset with dolphins", numThemes=2
// Result: 2 themes generated with light/dark mode, background & icon assets, full color configs
```
## Roadmap

**Phase:** Customization & Moderation
**Category:** Thread Customization
**Status:** Working
**Next Steps:** Full AI theme creation flow