# getThreadHistory

Get message history for a thread.

Examples below use TID `961645156614788` (Dora Test GC) and UID `61586059919455` (bot/Ven Ti).

## API

### Method Signature
```js
api.getThreadHistory(threadID, amount, timestamp?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `threadID` | string | ✅ | Thread ID |
| `amount` | number | ✅ | Number of messages to fetch |
| `timestamp` | number | | Start from this timestamp (optional, for pagination) |

### Returns
Array of message objects.

#### Text message
```js
{
  type: "message",
  attachments: [],
  body: "Hello everyone",
  isGroup: true,
  messageID: "mid.$gAANqnHX1woSkbhNxN2ePM4qCVEn2",
  senderID: "61586059919455",
  threadID: "961645156614788",
  timestamp: "1779136604471",
  mentions: {},
  isUnread: false,
  messageReactions: []
}
```

#### Message with reaction
```js
{
  type: "message",
  attachments: [],
  body: "Check this out",
  isGroup: true,
  messageID: "mid.$gAANqnHX1woSk...",
  senderID: "100037951718438",
  threadID: "961645156614788",
  timestamp: "1779136604471",
  mentions: {},
  isUnread: false,
  messageReactions: [
    { "61586059919455": "😍" }
  ]
}
```

#### Event (deleted message, name change, etc.)
```js
{
  type: "message",
  attachments: [
    {
      type: "share",
      ID: "ee.mid.$gAANqnHX1woSk...",
      url: null,
      title: "",
      description: "You deleted a message",
      source: null,
      subattachments: [],
      properties: {}
    }
  ],
  body: "",
  isGroup: true,
  messageID: "mid.$gAANqnHX1woSkbhreNmePNWWuEI30",
  senderID: "61586059919455",
  threadID: "961645156614788",
  timestamp: "1779137091126",
  mentions: {},
  isUnread: false,
  messageReactions: []
}
```

### Example
```js
// Get last 20 messages
const history = await api.getThreadHistory("961645156614788", 20);

// Get messages before a timestamp (pagination)
const older = await api.getThreadHistory("961645156614788", 20, 1779136604471);
```

## AI JSON Action
TID = Thread ID
```json
{"action":"threadHistory","tid":"TID","amount":20}
```

## Notes
- Uses GraphQL query `doc_id: 1498317363570230`
- Returns array of formatted message objects
- Supports pagination via `timestamp` parameter (pass the oldest message's timestamp)
- Includes text messages, attachments (photos, videos, files, shares, stickers), reactions, mentions
- Also returns event messages (name changes, emoji changes, deleted message notices, etc.)
- No MQTT required — uses HTTP to `facebook.com/api/graphqlbatch/`
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Review pagination stability