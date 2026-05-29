# forwardMessage

Forward a message to another thread by fetching and re-sending it.

## API

### Method Signature
```js
api.forwardMessage(messageID, threadIDs, sourceThreadID?, callback?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `messageID` | string | ✅ | ID of the message to forward |
| `threadIDs` | string \| string[] | ✅ | Target thread ID or array of IDs |
| `sourceThreadID` | string | | Thread where the message originated (required for actual forwarding; without it falls back to legacy HTTP endpoint) |
| `callback` | function | | `(err, result) => {}` |

### Returns
```js
{ success: true, forwardedTo: ["TID"], method: "resend" }
```

### Example
```js
// Forward a message from GC to another thread
const msg = await api.forwardMessage(
  "mid.$gAANqnHX1woSkbgf4LmePMKvQ19bO",
  "961645156614788",
  "961645156614788"
);

// Forward to multiple threads
await api.forwardMessage(mid, ["TID1", "TID2"], sourceTID);
```

## AI JSON Action
TID = Thread ID
```json
{"action":"forward","msgID":"mid.xxx","source":"TID","target":"TID"}
```

## Notes
- Uses `getMessage` (GraphQL) to fetch the original message body, then `sendMessage` to re-send it
- Requires `sourceThreadID` to know which thread the message came from
- Without `sourceThreadID`, falls back to the legacy `ajax/mercury/forward_message.php` endpoint which returns success but does nothing (Facebook deprecated it)
- Only forwards text body; attachments are not supported
- The forwarded message appears as a new message from the bot, not as a "forwarded" label
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Composite - relies on getMessage + sendMessage