# httpPostFormData

Perform multipart/form-data HTTP POST requests through the Facebook API wrapper. Used for file uploads.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string | Target URL [required] |
| `form` | object | Form data (can include ReadableStream for file fields) |
| `customHeader` | object | (Optional) Custom HTTP headers |
| `callback` | function | (Optional) `(err, data)` |
| `notAPI` | boolean | (Optional) Use `utils.postFormData` instead of `defaultFuncs.postFormData` |

## Returns

Response body as `string`.

## AI JSON Action

Not available as a direct action — use via code.

## Notes

- Sends multipart/form-data (used for file uploads to Facebook)
- `attachment[]` field can accept a ReadableStream for file data
- Handles cookies from session automatically
- Supports an optional `notAPI` boolean flag (can be passed as 4th argument)

## Example

```javascript
const fs = require("fs");
const stream = fs.createReadStream("/path/to/image.jpg");

api.httpPostFormData("https://upload.facebook.com/ajax/mercury/upload.php", {
  images_only: "true",
  "attachment[]": stream
}, (err, body) => {
  if (err) return console.error(err);
  console.log("Upload response:", body);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `httpPostFormData("https://upload.facebook.com/ajax/mercury/upload.php", { images_only: "true" })` returned raw Facebook response with `metadata: {}`
- Endpoint is functional; returns valid JSON response
## Roadmap

**Phase:** Social & Advanced
**Category:** HTTP & Utilities
**Status:** Working
**Next Steps:** Multipart upload - maintain