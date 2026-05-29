# changeBlockedStatus

Block or unblock a user. Uses `ajax/profile/manage_blocking.php`.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID` | string | UID of user to block/unblock |
| `block` | boolean | `true` = block, `false` = unblock |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ success: true, blocked: boolean }` on success.

## AI JSON Action

```json
{"action":"block","targets":["100037951718438"]}
{"action":"unblock","targets":["100037951718438"]}
```

## Example

```javascript
// Block
api.changeBlockedStatus("100037951718438", true, (err, res) => {
  if (err) return console.error(err);
  console.log("Blocked:", res);
});

// Unblock
api.changeBlockedStatus("100037951718438", false, (err, res) => {
  if (err) return console.error(err);
  console.log("Unblocked:", res);
});
```

## Test

```javascript
// Tested: blocked UID 100037951718438, then unblocked
// Both calls completed without error
```
## Roadmap

**Phase:** Customization & Moderation
**Category:** Moderation
**Status:** Working
**Next Steps:** Maintain