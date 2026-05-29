# story

Post a story (Facebook Story) with optional image, text, and background color.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `image` | ReadableStream/Buffer | Image for the story (optional) |
| `text` | string | Text overlay for the story (optional) |
| `backgroundColor` | string | Background color hex (optional) |
| `callback` | function | (Optional) `(err, result)` |

## Returns

Story creation result data.

## AI JSON Action

Not available as a direct action — use via code.

## Notes

- Stories are posted to the user's own Facebook story
- If no image is provided, creates a text-only story with background color
- Default background color may be used if not specified

## Example

```javascript
api.story({ text: "Hello world!", backgroundColor: "#FF0000" }, (err, res) => {
  if (err) return console.error(err);
  console.log("Story posted:", res);
});
```
## Roadmap

**Phase:** Maintenance
**Category:** Skipped
**Status:** Skipped - Not loaded
**Next Steps:** Not loaded by nkxfca - verify module loading