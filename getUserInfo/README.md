# getUserInfo

Get detailed profile info for one or more Facebook users.

## API

### Method Signature
```js
api.getUserInfo(id, usePayload?, callback?, groupFields?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string \| string[] | ✅ | Single UID or array of UIDs |
| `usePayload` | boolean | | `true` (default) = GraphQL path, `false` = profile page scrape |
| `callback` | function | | `(err, data) => {}` |

### Returns (object)
Key is user ID, value contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | User ID |
| `name` | string | Full name |
| `firstName` | string | First name |
| `lastName` | string | Last name |
| `vanity` | string | Username (e.g., `"mind.ur.own.business.113"`) |
| `profilePicUrl` | string | Profile picture URL |
| `profileUrl` | string | Profile URL |
| `gender` | string | `"MALE"`, `"FEMALE"`, or `"no specific gender"` |
| `type` | string | `"User"` |
| `isFriend` | boolean | Whether bot is friends with this user |
| `isBirthday` | boolean | Whether it's their birthday |
| `isMessengerUser` | boolean | Whether they use Messenger |

### Example
```js
const info = await api.getUserInfo("100037951718438");
console.log(info.name);      // "Du Rin"
console.log(info.vanity);    // "mind.ur.own.business.113"
console.log(info.gender);    // "MALE"

// Multiple users
const users = await api.getUserInfo(["100037951718438", "61586059919455"]);
```

## AI JSON Action
UID = User ID (e.g., `"100037951718438"`)
```json
{"action":"getUser","target":"UID"}
```

## Notes
- Uses 3-tier fallback: GraphQL batch → V2 hovercard → legacy endpoint
- Results are cached per user ID
- Pass an array of IDs to batch-fetch multiple users at once
- Default `usePayload: true` uses GraphQL; set to `false` for full profile scrape (bio, followers, cover photo, etc.)
## Roadmap

**Phase:** Social & Advanced
**Category:** User/Profile
**Status:** Working
**Next Steps:** Maintain