# follow

Follow or unfollow a user on Facebook.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `senderID` | string | User ID to follow/unfollow [required] |
| `boolean` | boolean | `true` = follow, `false` = unfollow [required] |
| `callback` | function | (Optional) `(err, data)` |

## Returns

Response data from GraphQL mutation on success.

## AI JSON Action

```json
{"action":"follow","target":"100037951718438","follow":true}
```

## Notes

- Uses GraphQL `doc_id: "25472099855769847"` for both follow and unfollow
- Internal mutation name differs: `CometUserFollowMutation` vs `CometUserUnfollowMutation`

## Example

```javascript
// Follow a user
api.follow("100037951718438", true, (err, data) => {
  if (err) return console.error(err);
  console.log("Followed:", data);
});

// Unfollow
api.follow("100037951718438", false, (err, data) => {
  if (err) return console.error(err);
  console.log("Unfollowed:", data);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `follow("100037951718438", true)` returned `undefined` (success — user was already followed, no error)
## Roadmap

**Phase:** Social & Advanced
**Category:** Social
**Status:** Working
**Next Steps:** GraphQL follow/unfollow - maintain