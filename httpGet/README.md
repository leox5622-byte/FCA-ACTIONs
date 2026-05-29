# httpGet

Perform HTTP GET requests through the Facebook API wrapper.

## AI JSON Action
{"action":"httpGet","url":"https://api.example.com/data"}

## Fields
| Field | Type | Description |
|-------|------|-------------|
| `url` | string | Target URL [required] |
| `form` | object | Query parameters |
| `headers` | object | Custom HTTP headers

## Notes
- Returns response body as string
- Handles cookies from session automatically
- Used internally by other API functions

## Example

```javascript
api.httpGet("https://www.facebook.com/ping/", (err, body) => {
  if (err) return console.error(err);
  console.log("Response:", body.substring(0, 100));
});
```

## Test

**Tested:** 2026-05-19 — Success
- `httpGet("https://www.facebook.com/ping/")` returned the raw Facebook response body as a string
- Cookies and session headers are automatically included
## Roadmap

**Phase:** Social & Advanced
**Category:** HTTP & Utilities
**Status:** Working
**Next Steps:** GET wrapper with auth - maintain