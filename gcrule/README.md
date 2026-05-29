# gcrule

Promote or demote group chat admins via MQTT. Uses queue `admin_status` with label `"25"`.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `action` | string | `"admin"` or `"unadmin"` [required] |
| `userID` | string | User ID to promote/demote [required] |
| `threadID` | string | Target group thread ID [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ type: "gc_rule_update", threadID, userID, action, senderID, BotID, timestamp }` on success.

## AI JSON Action

```json
{"action":"gcRule","actionType":"admin","userID":"100037951718438","threadID":"961645156614788"}
```

## Notes

- Requires MQTT connection (`api.listenMqtt`)
- Bot must be an admin to promote/demote others
- Validates current admin status before making changes (prevents redundant operations)
- Result is optimistic (no MQTT response confirmation)

## Example

```javascript
// Promote to admin
api.gcrule("admin", "100037951718438", "961645156614788", (err, res) => {
  if (err) return console.error(err);
  console.log("Promoted:", res);
});

// Demote from admin
api.gcrule("unadmin", "100037951718438", "961645156614788", (err, res) => {
  if (err) return console.error(err);
  console.log("Demoted:", res);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `gcrule("admin", "0", gcID)` returned rule update object with `action: "admin"` (user "0" doesn't exist, but MQTT publish succeeded)
- MQTT `queue_name: "admin_status"` with label `"25"` fires successfully
## Roadmap

**Phase:** Social & Advanced
**Category:** Group Management
**Status:** Working
**Next Steps:** MQTT-based admin promotion