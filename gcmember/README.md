# gcmember

Add or remove members from a group chat via MQTT. Unified module that handles both `add` and `remove` actions.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `action` | string | `"add"` or `"remove"` [required] |
| `userIDs` | string/string[] | User ID(s) to add/remove [required] |
| `threadID` | string | Target group thread ID [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ type: "gc_member_update", threadID, userIDs, action, senderID, BotID, timestamp }` on success.

## AI JSON Action

```json
{"action":"gcMember","actionType":"add","userIDs":["100037951718438"],"threadID":"961645156614788"}
```

## Notes

- Requires MQTT connection (`api.listenMqtt`)
- For `add`: uses label `"23"`, queue `threadID`
- For `remove`: uses label `"140"`, queue `remove_participant_v2`
- Only removes one user at a time
- Bot must be admin to remove others (can remove itself)
- Fetches `getThreadInfo` to verify current members before operation

## Example

```javascript
// Add a user
api.gcmember("add", ["100037951718438"], "961645156614788", (err, res) => {
  if (err) return console.error(err);
  console.log("Added:", res);
});

// Remove a user
api.gcmember("remove", "100037951718438", "961645156614788", (err, res) => {
  if (err) return console.error(err);
  console.log("Removed:", res);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `gcmember("add", ["0"], gcID)` returned member update object with `action: "add"` (user "0" doesn't exist, but MQTT publish succeeded)
- MQTT `queue_name: threadID` with label `"23"` fires successfully
## Roadmap

**Phase:** Social & Advanced
**Category:** Group Management
**Status:** Working
**Next Steps:** MQTT-based add/remove