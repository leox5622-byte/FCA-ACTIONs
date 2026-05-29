# logout

Log out from Facebook and invalidate the current session.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | function | (Optional) `(err)` |

## Returns

Calls callback with no data on success.

## AI JSON Action

```json
{"action":"logout"}
```

## Notes

- **Destructive** — invalidates the current session cookies/appstate
- After logout, you must re-login with fresh credentials
- Kills all active connections (MQTT, token refresh, etc.)
- Clears `ctx.loggedIn` flag

## Example

```javascript
api.logout((err) => {
  if (err) return console.error(err);
  console.log("Logged out successfully");
});
```
## Roadmap

**Phase:** Maintenance
**Category:** Skipped
**Status:** Skipped - Destructive
**Next Steps:** Destructive - invalidates session; add safety warnings