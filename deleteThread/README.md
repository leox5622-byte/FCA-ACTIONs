# deleteThread

Delete one or more threads from the inbox. Destructive — cannot be undone.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadOrThreads` | string/string[] | Single thread ID or array of thread IDs [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ success: true }` on success.

## AI JSON Action

```json
{"action":"deleteThread","threadIDs":["1234567890"]}
```

## Notes

- **Destructive** — permanently removes thread from inbox
- Uses `ajax/mercury/delete_thread.php` endpoint
- Accepts single ID string or array of IDs

## Example

```javascript
api.deleteThread("1234567890", (err, res) => {
  if (err) return console.error(err);
  console.log("Deleted:", res);
});

// Delete multiple threads
api.deleteThread(["id1", "id2", "id3"], (err, res) => {
  if (err) return console.error(err);
  console.log("Deleted:", res);
});
```
## Roadmap

**Phase:** Maintenance
**Category:** Skipped
**Status:** Skipped - Destructive
**Next Steps:** Destructive - document impact; add confirmation guard