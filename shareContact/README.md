# shareContact

Share a user contact card in a thread.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID` | string | User ID to share [required] |
| `threadID` | string | Target thread ID [required] |
| `callback` | function | (Optional) `(err)` |

## Returns

`undefined` on success (fire-and-forget).

## AI JSON Action

```json
{"action":"shareContact","target":"UID"}
```

## Example

```javascript
api.shareContact("61586059919455", "961645156614788", (err) => {
  if (err) return console.error(err);
  console.log("Contact shared");
});
```

## Notes
- Shares a user profile as a contact card in chat
- Recipient can tap to view/add the user
- Requires MQTT connection

## Test

**Tested:** 2026-05-19 — Success
- `shareContact("61586059919455", "961645156614788")` returned `undefined` (success)
- Contact card appeared in the group chat
## Roadmap

**Phase:** Social & Advanced
**Category:** Photo
**Status:** Working
**Next Steps:** VCF contact card - maintain