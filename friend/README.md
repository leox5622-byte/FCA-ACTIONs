# friend

Friend management module with multiple sub-methods for handling friend requests, listing friends, and viewing suggestions.

## API

The module returns an object with:

| Method | Description |
|--------|-------------|
| `requests()` | List pending friend requests |
| `accept(identifier)` | Accept friend request by userID or name string |
| `list(userID?)` | List friends of a user (defaults to self) |
| `suggest.list(limit?)` | List friend suggestions (default 30) |
| `suggest.request(userID)` | Send friend request to a user |

### Parameter Details

| Parameter | Type | Description |
|-----------|------|-------------|
| `identifier` | string | User ID or name to accept [required] |
| `userID` | string | User ID for list/request [optional for list] |
| `limit` | number | Max suggestions (default 30) |

## Returns

Each method returns formatted user objects with: `userID`, `name`, `profilePicture`, `socialContext`, `url`.

## AI JSON Action

Not available as a direct action — use via code.

## Notes

- Uses GraphQL mutations and queries
- `accept()` can match by name (case-insensitive partial match)
- `suggest.list()` uses PYMK (People You May Know) query
- Error 1431004 = cannot accept right now (account issue)

## Example

```javascript
// List friend requests
const requests = await api.friend.requests();
console.log("Requests:", requests);

// Accept by ID
await api.friend.accept("100037951718438");

// Accept by name
await api.friend.accept("Du Rin");

// List friends
const friends = await api.friend.list();
console.log("Friends:", friends);

// Get suggestions
const suggestions = await api.friend.suggest.list(10);
console.log("Suggestions:", suggestions);

// Send friend request
await api.friend.suggest.request("100037951718438");
```
## Roadmap

**Phase:** Social & Advanced
**Category:** Social
**Status:** Working
**Next Steps:** Multi-method sub-module - maintain