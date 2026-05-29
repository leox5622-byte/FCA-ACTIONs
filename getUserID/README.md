# getUserID

Look up a Facebook user ID by name or profile URL. Also known as `getUID`.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `link` | string | Name, username, or profile URL to look up [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

If input is a profile URL: returns a single user ID `string`.

If input is a name (not URL): returns an `Array` of user objects with:
| Field | Type | Description |
|-------|------|-------------|
| `userID` | string | Facebook user ID |
| `photoUrl` | string | Profile photo URL |
| `indexRank` | number | Search rank |
| `name` | string | Display name |
| `isVerified` | boolean | Verified account |
| `profileUrl` | string | Profile URL path |

## AI JSON Action

```json
{"action":"getUserID","name":"Ashfakur Rahman Leon"}
```

## Example

```javascript
// Search by name
api.getUserID("Ashfakur Rahman Leon", (err, users) => {
  if (err) return console.error(err);
  console.log("Found:", users[0].userID, users[0].name);
});

// Lookup by profile URL
api.getUserID("https://facebook.com/profile.php?id=100044925755457", (err, uid) => {
  if (err) return console.error(err);
  console.log("UID:", uid);
});
```

## How It Works

**Profile URL path:** Fetches the profile page HTML and extracts `userID` from the page content. Uses `defaultFuncs.get` which bypasses `parseAndCheckLogin`, avoiding checkpoint 1357004.

**Name search path:** Scrapes `https://www.facebook.com/public/{name}` instead of the blocked `ajax/typeahead/search.php`. Extracts user data from HTML using regex. Facebook's public directory may return few or no results for many names; this is a platform limitation, not a bug.

## Fix History

| Date | Issue | Fix |
|------|-------|-----|
| 2026-05-20 | Checkpoint 1357004 on `ajax/typeahead/search.php` | Replaced with `facebook.com/public/{name}` HTML scrape (name search) + direct profile URL ID extraction + both using `defaultFuncs.get` to bypass `parseAndCheckLogin` |
## Roadmap

**Phase:** Social & Advanced
**Category:** User/Profile
**Status:** Working
**Next Steps:** Fixed - HTML scrape bypasses checkpoint 1357004