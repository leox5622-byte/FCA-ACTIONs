# getAccess

Obtain a Business/Facebook access token via 2FA authentication code. Used when the session requires two-factor authentication.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `authCode` | string | (Optional) 6-digit 2FA code from authenticator app |
| `callback` | function | (Optional) `(err, token)` |

## Returns

`string` — Access token on success.

If no `authCode` is provided, the callback receives an error with `.continue(submitCode)` to submit the code interactively.

## AI JSON Action

Not available — requires interactive 2FA code input.

## Notes

- Requests access to `business.facebook.com/content_management`
- Token is cached in `ctx.access_token`
- If token already exists, returns it immediately without re-authentication
- The `submitCode` function can be called interactively if the auth code is not known upfront

## Example (Interactive)

```javascript
api.getAccess((err, token) => {
  if (err && err.continue) {
    // Prompt user for 2FA code and submit
    const code = "123456";
    err.continue(code).then(token => {
      console.log("Token:", token);
    });
  } else if (err) {
    console.error(err);
  } else {
    console.log("Token:", token);
  }
});
```

## Example (With Code)

```javascript
api.getAccess("123456", (err, token) => {
  if (err) return console.error(err);
  console.log("Token:", token);
});
```
## Roadmap

**Phase:** Social & Advanced
**Category:** Other
**Status:** Working
**Next Steps:** 2FA token flow - needs auth code input