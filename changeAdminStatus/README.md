# changeAdminStatus

Promote or demote users as group admins. Requires the bot to be an admin in the group. Works via MQTT if connected, otherwise falls back to GraphQL HTTP.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadID` | string | Target group thread ID |
| `adminID` | string \| string[] | UID(s) to promote/demote |
| `adminStatus` | boolean | `true` = promote, `false` = demote |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ success: true }` on success.

## AI JSON Action

```json
{"action":"promote","targets":["100037951718438"]}
{"action":"demote","targets":["100037951718438"]}
```

## Example

```javascript
// Promote
api.changeAdminStatus("961645156614788", "100037951718438", true, (err, result) => {
  if (err) return console.error(err);
  console.log("Promoted:", result);
});

// Demote
api.changeAdminStatus("961645156614788", "100037951718438", false, (err, result) => {
  if (err) return console.error(err);
  console.log("Demoted:", result);
});
```

## Test

```javascript
// Tested by creating GC 1329050469180604 (bot as admin), promoting UID 100037951718438
// then demoting same UID. Both returned { success: true } via GraphQL HTTP fallback.
```
## Roadmap

**Phase:** Social & Advanced
**Category:** Group Management
**Status:** Working
**Next Steps:** Promote/demote - maintain