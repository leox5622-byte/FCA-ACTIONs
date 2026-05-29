# share

Get a link preview for a Facebook post (post preview). NOTE: This module is actually named `getPostPreview` internally — it does NOT share URLs to threads.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `postID` | string | Facebook post ID to generate preview for [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` on success:
| Field | Type | Description |
|-------|------|-------------|
| `postID` | string | Resolved post ID |
| `header` | string | Header title |
| `subtitle` | string | Subtitle text |
| `title` | string | Preview title |
| `previewImage` | string | Preview image URL |
| `favicon` | string | Favicon URL |
| `headerImage` | string | Header image URL |

## AI JSON Action

```json
{"action":"share","url":"https://github.com"}
```

## Known Issues

- **GraphQL doc_id expired**: Default doc_id `28939050904374351` is no longer valid
- To fix: capture current doc_id from Messenger web traffic (look for `CometXMAProxyShareablePreviewQuery` requests) and set via `ctx.options.sharePreviewDocId` at login

## Example

```javascript
api.share("100044925755457_100044925755457", (err, preview) => {
  if (err) return console.error(err);
  console.log("Preview:", preview);
});
```

## Test

**Tested:** 2026-05-19 — Error (expected)
- Default GraphQL doc_id `28939050904374351` expired — returns "The GraphQL document with ID 28939050904374351 was not found"
- Needs updated doc_id from current Messenger traffic to work
## Roadmap

**Phase:** Maintenance
**Category:** Broken
**Status:** Broken
**Next Steps:** Expired GraphQL doc_id - capture fresh from Messenger DevTools