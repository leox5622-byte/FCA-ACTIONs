# getBotInfo

Internal module: extracts bot account info from login page HTML data. Not a user-facing API — called during login to parse `CurrentUserInitialData` and `DTSGInitialData` from the page's embedded JSON.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `netData` | Array | Array of parsed JSON objects from Facebook login HTML [required] |

## Returns

`Object|null` — Bot info with `name`, `firstName`, `uid`, `appID`, `dtsgToken`, `lsdToken`, `getCtx()`, `getOptions()`, `getRegion()`.

## Notes

- Not callable after appstate login — `netData` is only available during initial HTML page parse
- Equivalent info at runtime: `api.getCurrentUserID()`, `api.ctx.fb_dtsg`, `api.ctx.region`

## Example

```javascript
// Only works during login page parsing with raw HTML data
const netData = extractJSONFromHTML(htmlString);
const info = api.getBotInfo(netData);
console.log(info.name, info.uid);
```

## Test

```javascript
// Cannot be tested post-login (netData not available in ctx)
// Bot info available directly: api.getCurrentUserID() = "61586059919455"
```
## Roadmap

**Phase:** Social & Advanced
**Category:** User/Profile
**Status:** Working
**Next Steps:** Maintain