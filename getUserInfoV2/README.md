# getUserInfoV2

Get detailed user profile info via GraphQL hovercard query. Includes extra fields like verification and memorialization status.

## API

### Method Signature
```js
api.getUserInfoV2(id, callback?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string \| string[] | ✅ | Single UID or array of UIDs |

### Returns (object)
Key is user ID, value contains:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Full name |
| `firstName` | string | First name |
| `vanity` | string | Username (e.g., `"mind.ur.own.business.113"`) |
| `thumbSrc` | string | Profile thumbnail URL |
| `profileUrl` | string | Profile URL |
| `gender` | string | Gender |
| `type` | string | `"User"` |
| `isFriend` | boolean | Whether bot is friends with user |
| `isVerified` | boolean | Whether account is verified |
| `isMemorialized` | boolean | Whether account is memorialized |

### Example
```js
const info = await api.getUserInfoV2("100037951718438");
console.log(info.name);         // "Du Rin"
console.log(info.isVerified);   // false
```

## AI JSON Action
UID = User ID (e.g., `"100037951718438"`)
```json
{"action":"getUserV2","target":"UID"}
```

## Notes
- Uses Facebook's CometHovercard GraphQL query
- Supports batch fetching with array of UIDs
- More detailed than `getUserInfo` — includes `isVerified` and `isMemorialized`
## Roadmap

**Phase:** Social & Advanced
**Category:** User/Profile
**Status:** Working
**Next Steps:** Enhanced data - maintain