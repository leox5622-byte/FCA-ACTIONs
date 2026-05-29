# removeUserFromGroup

Remove (kick) a user from a group chat. Works via MQTT if connected, otherwise falls back to HTTP. The bot must be an admin to remove others, or can remove itself from any group it belongs to.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID` | string | UID of user to remove |
| `threadID` | string | Target group thread ID |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ success: true }` on success.

## AI JSON Action

```json
{"action":"kick","targets":["100037951718438"]}
```

## Example

```javascript
api.removeUserFromGroup("100037951718438", "961645156614788", (err, result) => {
  if (err) return console.error(err);
  console.log("Removed:", result);
});
```

## Test

```javascript
// Tested by removing bot (61586059919455) from newly created GC 2450824478729454
// Result: { success: true }
// Used HTTP fallback (MQTT not connected)
```
## Roadmap

**Phase:** Social & Advanced
**Category:** Group Management
**Status:** Working
**Next Steps:** Maintain