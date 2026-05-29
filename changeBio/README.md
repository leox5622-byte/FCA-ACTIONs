# changeBio

Change the bot's Facebook profile bio. Uses GraphQL `doc_id: 2725043627607610`.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `bio` | string | New bio text |
| `publish` | boolean | (Optional) Publish to timeline (default: false) |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ success: true }` on success.

## AI JSON Action

```json
{"action":"changeBio","value":"New bio text"}
```

## Example

```javascript
api.changeBio("Your everyday bot.", false, (err, res) => {
  if (err) return console.error(err);
  console.log("Bio updated:", res);
});
```

## Test

```javascript
// Tested: set bio to "Test bio - please ignore" (publish=false), then restored
// Both calls completed without error
```
## Roadmap

**Phase:** Social & Advanced
**Category:** User/Profile
**Status:** Working
**Next Steps:** Set/restore - maintain