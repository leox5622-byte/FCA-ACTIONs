# getThreadPictures

Get group chat profile pictures (current and historical). The original `ajax/mercury/thread_images.php` endpoint is dead, so this module now uses `getThreadInfo` for the current picture and `getThreadHistory` for historical image changes.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadID` | string | Target thread ID |
| `offset` | number | (Optional) Start offset (default: 0) |
| `limit` | number | (Optional) Max results (default: 50) |
| `callback` | function | (Optional) `(err, pictures)` |

## Returns

`Array` — Array of picture objects with `type` ("current" or "historical"), `url`, and optional metadata.

## AI JSON Action

```json
{"action":"threadPics","limit":10}
```

## Example

```javascript
api.getThreadPictures("961645156614788", 0, 10, (err, pics) => {
  if (err) return console.error(err);
  pics.forEach(p => console.log(p.type, p.url));
});
```

## Test

```javascript
// Tested against GC 961645156614788 (no profile picture)
// Result: [] (empty array — no pics exist for this GC)
// Historical images are retrieved from ThreadImageMessage events in thread history
```
## Roadmap

**Phase:** Social & Advanced
**Category:** Photo
**Status:** Working
**Next Steps:** Fallback - getThreadInfo+history for deprecated endpoint