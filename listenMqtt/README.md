# listenMqtt

Start listening for incoming events via MQTT (WebSocket) connection. This is the core event loop for receiving messages, typing indicators, presence updates, and other real-time events.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | function | (Required) `(err, event)` — receives all incoming events |
| `opts` | object | (Optional) MQTT configuration overrides |

### Event Types

| Type | Description |
|------|-------------|
| `message` | New message received |
| `typ` | Typing indicator |
| `presence` | User presence (online/offline) |
| `read_receipt` | Read receipt |
| `delivery_receipt` | Delivery receipt |
| `friend_request_received` | Friend request received |
| `friend_request_cancel` | Friend request cancelled |
| `ready` | MQTT fully connected and ready |

## AI JSON Action

Not directly invocable — internal event loop.

## Notes

- Must be called before MQTT-dependent modules (`changeGroupImage`, `createPoll`, `gcmember`, etc.)
- Auto-reconnect with exponential backoff (max 15s) built in
- Auto-cycle reconnects every 30-60 minutes
- Supports proxy via `ctx.globalOptions.proxy`
- Uses `/ls_req` and `/ls_resp` topics for request/response pattern
- Subscribes to 19+ topics including `/t_ms`, `/thread_typing`, `/orca_presence`
- Returns `{ type: "stop_listen" }` on unrecoverable errors

## Example

```javascript
api.listenMqtt((err, event) => {
  if (err) return console.error("MQTT error:", err);
  
  if (event.type === "message") {
    console.log(`Message from ${event.senderID}: ${event.body}`);
  } else if (event.type === "typ") {
    console.log(`${event.from} is typing...`);
  } else if (event.type === "presence") {
    console.log(`${event.userID} status:`, event.statuses);
  } else if (event.type === "ready") {
    console.log("MQTT ready!");
  }
});
```
## Roadmap

**Phase:** Resilience & Anti-Detection
**Category:** Real-time
**Status:** Working
**Next Steps:** Core MQTT event loop - maintain; monitor auth recovery