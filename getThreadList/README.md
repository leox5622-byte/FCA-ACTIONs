# getThreadList

Get list of threads for the current user.

Examples below use TID `961645156614788` (Dora Test GC) and UID `61586059919455` (bot/Ven Ti).

## API

### Method Signature
```js
api.getThreadList(limit, timestamp?, tags?)
```

### Parameters
| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `limit` | number | ✅ | | Number of threads to fetch |
| `timestamp` | number | | `null` | Start timestamp for pagination |
| `tags` | string[] | | `["INBOX"]` | Filter: `"INBOX"`, `"ARCHIVED"`, `"PENDING"` |

### Returns
```js
[
  {
    threadID: "961645156614788",
    threadName: "Dora Test GC",
    participantIDs: ["61550921545749", "61586059919455", "100037951718438", "100044925755457"],
    userInfo: [
      { id: "61550921545749", name: "SI MI", firstName: "SI", isFriend: false },
      { id: "61586059919455", name: "Ven Ti", firstName: "Ven" },
      { id: "100037951718438", name: "Du Rin", firstName: "Du" },
      { id: "100044925755457", name: "Ashfakur Rahman Leon", firstName: "Ashfakur" }
    ],
    unreadCount: 0,
    messageCount: 42,
    timestamp: "1779136604471",
    muteUntil: null,
    isGroup: true,
    isArchived: false,
    folder: "INBOX",
    emoji: "🎯",
    color: "0084FF",
    nicknames: { "100037951718438": "Dora Bot" },
    adminIDs: ["100044925755457"],
    approvalMode: false,
    snippet: "forward test",
    snippetSender: "61586059919455",
    canReply: true,
    inviteLink: { enable: false, link: null },
    threadType: 2
  }
]
```

### Example
```js
// Get inbox threads
const threads = await api.getThreadList(20);

// Get archived threads
const archived = await api.getThreadList(20, null, ["ARCHIVED"]);

// Paginate
const older = await api.getThreadList(20, 1779136604471);
```

## AI JSON Action
```json
{"action":"threadList","limit":20}
```

## Notes
- Uses GraphQL query `doc_id: 3336396659757871`
- Returns full thread objects with participant info, emoji, color, nicknames, admins
- Supports pagination via timestamp (pass the last thread's timestamp)
- Tags filter: `"INBOX"` (default), `"ARCHIVED"`, `"PENDING"`
- No MQTT required — uses HTTP to `facebook.com/api/graphqlbatch/`
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Maintain