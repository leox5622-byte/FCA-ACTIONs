# changeAvatar

Change the bot's Facebook profile picture. Uploads the image, then uses GraphQL `doc_id: 5066134240065849` to set it.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `image` | ReadableStream | Image file stream [required] |
| `caption` | string | (Optional) Photo caption |
| `timestamp` | number | (Optional) Expiration timestamp |
| `callback` | function | (Optional) `(err, data)` |

## Returns

`Object` — Profile picture mutation result.

## AI JSON Action

```json
{"action":"changeAvatar","value":"path/to/image.jpg","caption":"My new avatar"}
```

## Example

```javascript
const fs = require("fs");
const stream = fs.createReadStream("/path/to/image.jpg");
api.changeAvatar(stream, "My new avatar", (err, data) => {
  if (err) return console.error(err);
  console.log("Avatar changed:", data);
});
```

## Test

```javascript
// Tested with Venti image from URL (downloaded to stream)
// Result: Full profile photo mutation response with new photo URLs
// Uses GraphQL doc_id: 5066134240065849
// Image must be a ReadableStream, caption is optional
```
## Roadmap

**Phase:** Social & Advanced
**Category:** User/Profile
**Status:** Working
**Next Steps:** GraphQL mutation - maintain