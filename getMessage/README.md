# getMessage

Fetch a specific message by thread ID and message ID.

Examples below use TID `961645156614788` (Dora Test GC) and UIDs `61586059919455` (bot/Ven Ti), `100037951718438` (Du Rin).

## API

### Method Signature
```js
api.getMessage(threadID, messageID, callback?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `threadID` | string | ✅ | Thread containing the message |
| `messageID` | string | ✅ | Message ID to fetch |
| `callback` | function | | `(err, msg) => {}` |

### Returns
```js
{
  type: "message" | "message_reply" | "event",
  senderID: "61586059919455",
  body: "Hello",
  threadID: "961645156614788",
  messageID: "mid.$gAANqnHX1woSk...",
  reactions: [{ "100037951718438": "😍" }],
  attachments: [],
  mentions: {},
  timestamp: "1779136604471"
}
```

### Event types also supported
- `log:thread-name` — group name changes
- `log:thread-icon` — emoji changes
- `log:user-nickname` — nickname changes
- `log:thread-color` — theme color changes
- `log:thread-poll` — polls
- `log:thread-admins` — admin changes
- `log:thread-pinned` — pinned messages
- `log:thread-call` — call logs

### Example
```js
const msg = await api.getMessage("961645156614788", "mid.$gAANqnHX1woSk...");
console.log(msg.body); // "Hello"
```

## AI JSON Action
(utility - used internally by other actions)

## Notes
- Uses GraphQL query `doc_id: 1768656253222505`
- Returns formatted message object with attachments, reactions, mentions
- Covers admin messages (name changes, emoji, nickname, theme, polls, etc.)
- No MQTT required — uses HTTP to `facebook.com/api/graphqlbatch/`
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Maintain