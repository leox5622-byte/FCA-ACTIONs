# changeArchivedStatus

Archive or unarchive a thread. Uses `ajax/mercury/change_archived_status.php` (still working).

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadIDs` | string \| string[] | Thread ID(s) to archive/unarchive |
| `archive` | boolean | `true` = archive, `false` = unarchive |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ success: true }` on success.

## AI JSON Action

```json
{"action":"archive","value":true}
{"action":"archive","value":false}
```

## Example

```javascript
// Archive
api.changeArchivedStatus("961645156614788", true, (err, res) => {
  if (err) return console.error(err);
  console.log("Archived:", res);
});

// Unarchive
api.changeArchivedStatus("961645156614788", false, (err, res) => {
  if (err) return console.error(err);
  console.log("Unarchived:", res);
});
```

## Test

```javascript
// Tested: archive GC 961645156614788 → { success: true }
// Tested: unarchive same GC → { success: true }
```
## Roadmap

**Phase:** Customization & Moderation
**Category:** Moderation
**Status:** Working
**Next Steps:** Maintain