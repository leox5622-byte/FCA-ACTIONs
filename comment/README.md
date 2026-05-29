# comment

Comment on a Facebook post or reply to an existing comment. Uses GraphQL `doc_id: 6993516810709754`.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `msg` | string \| object | Comment text or object with `body`, `attachments`, `mentions`, `url`, `sticker` |
| `postID` | string | Post ID to comment on |
| `replyCommentID` | string | (Optional) Comment ID to reply to |
| `callback` | function | (Optional) `(err, info)` |

## Returns

`Object` — `{ id, url, count }` with comment ID, feedback URL, and total comment count.

## AI JSON Action

```json
{"action":"comment","value":"Nice post!","postID":"post_id_here"}
```

## Example

```javascript
api.comment("Great photo!", "post_id_here", (err, info) => {
  if (err) return console.error(err);
  console.log("Comment ID:", info.id);
});
```

## Test

```javascript
// Not tested (requires a valid postID from a Facebook post or group post)
// Uses GraphQL doc_id: 6993516810709754
```
## Roadmap

**Phase:** Maintenance
**Category:** Broken
**Status:** Broken
**Next Steps:** Needs valid Facebook postID to test - capture fresh endpoint