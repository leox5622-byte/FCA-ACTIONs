# notes

Create notes on Facebook (status updates / notes feature).

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string/object | Note content (string or message object with body, mentions, attachments) [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — Note creation result data.

## AI JSON Action

Not available as a direct action — use via code.

## Notes

- Creates a Facebook Note post (different from timeline status)
- Supports mentions and attachments
- Internal implementation may vary

## Example

```javascript
api.notes({ body: "My note content" }, (err, res) => {
  if (err) return console.error(err);
  console.log("Note created:", res);
});
```
## Roadmap

**Phase:** Maintenance
**Category:** Skipped
**Status:** Skipped - Not loaded
**Next Steps:** Not loaded by nkxfca - verify module loading