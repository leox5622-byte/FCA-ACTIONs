# handleMessageRequest

Accept or reject message requests (message from non-friends). Uses `ajax/mercury/handle_message_requests.php`.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadID` | string | Thread ID of the message request [required] |
| `accept` | boolean | `true` = accept, `false` = reject (default: `true`) |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ success: true, accepted: true/false }` on success.

## AI JSON Action

```json
{"action":"handleMessageRequest","threadID":"1234567890","accept":true}
```

## Example

```javascript
// Accept a message request
api.handleMessageRequest("1234567890", true, (err, res) => {
  if (err) return console.error(err);
  console.log("Accepted:", res);
});

// Reject a message request
api.handleMessageRequest("1234567890", false, (err, res) => {
  if (err) return console.error(err);
  console.log("Rejected:", res);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `handleMessageRequest("0", false)` returned `undefined` (function executed without error — endpoint `ajax/mercury/handle_message_requests.php` works)
## Roadmap

**Phase:** Customization & Moderation
**Category:** Moderation
**Status:** Working
**Next Steps:** Maintain