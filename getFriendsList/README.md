# getFriendsList

Get the bot's full friends list.

## API

### Method Signature
```js
api.getFriendsList(callback?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `callback` | function | | `(err, friends) => {}` |

### Returns (array)
Each friend object:

| Field | Type | Description |
|-------|------|-------------|
| `userID` | string | User ID (e.g., `"100037951718438"`) |
| `fullName` | string | Full name |
| `firstName` | string | First name |
| `vanity` | string | Username |
| `profileUrl` | string | Profile URL |
| `profilePicture` | string | Profile picture URL |
| `gender` | string | Gender category |
| `isFriend` | boolean | Friendship status |
| `isBirthday` | boolean | Whether it's their birthday |

### Example
```js
const friends = await api.getFriendsList();
console.log(friends.length);                        // 2
console.log(friends[0].fullName);                   // "Du Rin"
console.log(friends[0].userID);                     // "100037951718438"
```

## AI JSON Action
```json
{"action":"friendsList"}
```

## Notes
- Uses HTTP POST to Facebook's `chat/user_info_all` endpoint
- No parameters needed — returns all friends of the logged-in bot
- No MQTT required — works with basic HTTP session
## Roadmap

**Phase:** Social & Advanced
**Category:** User/Profile
**Status:** Working
**Next Steps:** Maintain