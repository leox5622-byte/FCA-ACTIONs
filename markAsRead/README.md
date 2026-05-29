# markAsRead

Mark a thread as read (seen) or unread. Requires MQTT connection (`api.listenMqtt`).

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadID` | string | Target thread ID |
| `read` | boolean | (Optional) `true` = mark read/seen (default), `false` = mark unread |
| `callback` | function | (Optional) `(err)` |

## Returns

`undefined` on success (resolves with `null`). No response payload — MQTT publish is fire-and-forget.

## AI JSON Action

```json
{"action":"markRead"}
{"action":"markUnread"}
```

## Mark Seen Only on Mention (Usage Pattern)

To auto-mark a GC as seen only when the bot is mentioned:

```javascript
api.listenMqtt((err, event) => {
  if (err) return;
  if (event.type === "message" && event.threadID === gcID) {
    const isMentioned = event.mentions &&
      Object.values(event.mentions).some(m => m.id === api.getCurrentUserID());
    if (isMentioned) {
      api.markAsRead(event.threadID, true); // mark seen
    } else {
      api.markAsRead(event.threadID, false); // keep unread
    }
  }
});
```

## Example

```javascript
// Mark as read/seen
api.markAsRead("961645156614788", true, (err) => {
  if (err) return console.error(err);
  console.log("Marked as seen");
});

// Mark as unread
api.markAsRead("961645156614788", false, (err) => {
  if (err) return console.error(err);
  console.log("Marked as unread");
});
```

## Test

```javascript
// Tested against GC 961645156614788 via MQTT /mark_thread
// markAsRead(id, true)  → undefined (success)
// markAsRead(id, false) → undefined (success)
// markAsRead(id)        → undefined (defaults to true)
```
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** MQTT-based - requires listenMqtt