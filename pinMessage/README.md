# pinMessage

Pin, unpin, or list pinned messages in a group chat. Requires MQTT connection (`api.listenMqtt`).

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `action` | string | `"pin"`, `"unpin"`, or `"list"` [required] |
| `threadID` | string | Target group thread ID [required for pin/unpin/list] |
| `messageID` | string | Message ID to pin/unpin [required for pin/unpin] |

## Returns

- **pin**: Array of `[{ success: true, request_id }]` (2 MQTT requests sent)
- **unpin**: `{ success: true, request_id }`
- **list**: Array of pinned message objects (or `[]` if none)

## AI JSON Action

```json
{"action":"pin","value":"pin","msgID":"mid.xxx"}
{"action":"pin","value":"unpin","msgID":"mid.xxx"}
```

## Notes

- Requires MQTT connection
- Uses MQTT queues: `pin_msg_v2_{threadID}`, `unpin_msg_v2_{threadID}`, `set_pinned_message_search`
- Pin sends 2 parallel MQTT requests
- List fetches the full thread page HTML and extracts `lightspeed_web_request`
- Function signature is `pin(action, threadID, messageID)` — NOT `pin(threadID, messageID, pin)`

## Example

```javascript
// Pin a message
const res = await api.pinMessage("pin", "961645156614788", "mid.$gAANqnHX1woSkbizQDWePOeGuioHj");
console.log("Pinned:", res);

// Unpin
const res = await api.pinMessage("unpin", "961645156614788", "mid.$gAANqnHX1woSkbizQDWePOeGuioHj");
console.log("Unpinned:", res);

// List pinned messages
const pinned = await api.pinMessage("list", "961645156614788");
console.log("Pinned messages:", pinned);
```

## Test

**Tested:** 2026-05-19 — Success
- `pinMessage("pin", gcID, msgID)` returned `[{success:true}, {success:true}]`
- `pinMessage("unpin", gcID, msgID)` returned `{success:true}`
- `pinMessage("list", gcID)` returned `[]` (no pinned messages)
## Roadmap

**Phase:** Customization & Moderation
**Category:** Reactions & Pin
**Status:** Working
**Next Steps:** MQTT pin/unpin/list - maintain