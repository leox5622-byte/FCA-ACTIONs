# resolvePhotoUrl

Resolve a Facebook photo ID to a full CDN URL.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `photoID` | string | Facebook photo/fbid ID [required] |
| `callback` | function | (Optional) `(err, url)` |

## Returns

`string` — Full CDN URL to the photo.

## AI JSON Action

```json
{"action":"resolvePhotoUrl","photoID":"1234567890"}
```

## How It Works

Uses `GET https://www.facebook.com/messages/media/{photoID}` instead of the blocked `POST mercury/attachments/photo` endpoint. Facebook's CDN serves the image after a redirect chain; the final URL is returned. `defaultFuncs.get` bypasses `parseAndCheckLogin`, so checkpoint 1357004 is never triggered.

## Example

```javascript
api.resolvePhotoUrl("1234567890", (err, url) => {
  if (err) return console.error(err);
  console.log("Photo URL:", url);
});
```

## Fix History

| Date | Issue | Fix |
|------|-------|-----|
| 2026-05-20 | Checkpoint 1357004 on `mercury/attachments/photo` | Replaced with `GET messages/media/{photoID}` redirect-to-CDN approach |
## Roadmap

**Phase:** Resilience & Anti-Detection
**Category:** Photo
**Status:** Working
**Next Steps:** Fixed - GET bypasses checkpoint 1357004