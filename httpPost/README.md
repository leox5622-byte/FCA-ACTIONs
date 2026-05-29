# httpPost

Perform HTTP POST requests through the Facebook API wrapper.

## AI JSON Action
{"action":"httpPost","url":"https://api.example.com","form":{"key":"value"}}

## Fields
| Field | Type | Description |
|-------|------|-------------|
| `url` | string | Target URL [required] |
| `form` | object | POST body data |
| `headers` | object | Custom HTTP headers

## Notes
- Returns response body as string
- Sends form-encoded data by default
- Handles cookies from session automatically

## Example

```javascript
api.httpPost("https://www.facebook.com/api/graphql/", {
  doc_id: "0",
  variables: "{}",
  fb_api_req_friendly_name: "test",
  fb_api_caller_class: "RelayModern"
}, (err, body) => {
  if (err) return console.error(err);
  console.log("Response:", body.substring(0, 100));
});
```

## Test

**Tested:** 2026-05-19 — Success
- `httpPost()` sent POST to GraphQL API and returned raw response body
- Works with both `defaultFuncs.post` and `utils.post` (controlled by `notAPI` flag)
## Roadmap

**Phase:** Social & Advanced
**Category:** HTTP & Utilities
**Status:** Working
**Next Steps:** POST wrapper with auth - maintain