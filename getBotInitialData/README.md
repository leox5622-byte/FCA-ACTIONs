# getBotInitialData

Fetch the bot's own profile initial data from Facebook by scraping the profile page HTML.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | function | (Optional) `(err, data)` |

## Returns

`Object` — Account info including `uid`, `name`, `SHORT_NAME`, `ACCOUNT_ID`, `APP_ID`, and account type flags.

## AI JSON Action

```json
{"action":"getBotInitialData"}
```

## Example

```javascript
api.getBotInitialData((err, data) => {
  if (err) return console.error(err);
  console.log("Bot name:", data.name);
  console.log("Bot UID:", data.uid);
});
```

## Test

```javascript
// Tested against bot UID 61586059919455
// Result: { ACCOUNT_ID: "61586059919455", SHORT_NAME: "Ven", name: "Ven Ti", uid: "61586059919455", APP_ID: "2220391788200892", ... }
```
## Roadmap

**Phase:** Social & Advanced
**Category:** User/Profile
**Status:** Working
**Next Steps:** Maintain