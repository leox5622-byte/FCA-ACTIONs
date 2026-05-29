# unfriend

Unfriend (remove) a user from your friends list.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID` | string | User ID to unfriend [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

Result from GraphQL unfriend mutation.

## AI JSON Action

```json
{"action":"unfriend","target":"100037951718438"}
```

## Notes

- **Destructive** — removes the user from your friends list
- Cannot be undone without re-sending a friend request

## Example

```javascript
api.unfriend("100037951718438", (err, res) => {
  if (err) return console.error(err);
  console.log("Unfriended:", res);
});
```
## Roadmap

**Phase:** Maintenance
**Category:** Skipped
**Status:** Skipped - Destructive
**Next Steps:** Destructive - document behavior; add confirmation guard