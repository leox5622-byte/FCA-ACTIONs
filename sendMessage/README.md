# sendMessage

Send text, images, mentions, emoji, URLs, stickers, or location to a thread.

## API

### Method Signature
```js
api.sendMessage(msg, threadID, callback?, replyToMessage?, isGroup?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `msg` | string \| object | ✅ | Text string or object with message properties |
| `threadID` | string \| string[] | ✅ | Target thread ID or array of user IDs |
| `callback` | function | | `(err, result) => {}` — result has `messageID`, `threadID`, `timestamp` |
| `replyToMessage` | string | | Message ID to reply to |
| `isGroup` | boolean | | Explicitly mark as group or DM |

### msg Object Properties
| Field | Type | Description |
|-------|------|-------------|
| `body` | string | Text message content |
| `attachment` | stream \| stream[] | Readable stream(s) for file upload |
| `url` | string | Shareable URL link |
| `sticker` | string | Sticker ID |
| `emoji` | string | Single emoji character |
| `emojiSize` | string | `"small"`, `"medium"`, or `"large"` |
| `mentions` | object[] | `[{tag: "@name", id: "UID", fromIndex: 0}]` |
| `location` | object | `{latitude: num, longitude: num, current: bool}` |

### Returns
```js
{ messageID: "mid.$gA...", threadID: "961645156614788", timestamp: 177913... }
```

### Examples
TID = `"961645156614788"`, UID = `"100037951718438"`
```js
// Plain text to a group
api.sendMessage("Hello!", "961645156614788");

// Object with body + mentions
api.sendMessage({
  body: "Hey @Du Rin",
  mentions: [{ tag: "@Du Rin", id: "100037951718438" }]
}, "961645156614788");

// With emoji
api.sendMessage({ emoji: "🔥", emojiSize: "large" }, "961645156614788");

// Reply to a message
api.sendMessage("Reply text", "961645156614788", (err, res) => {}, "mid.$gAANqnHX1woSkbe...");
```

## AI JSON Action
TID = Thread ID (e.g., `"961645156614788"`), UID = User ID (e.g., `"100037951718438"`)
```json
{"action":"send","body":"Hello world","target":"TID"}
{"action":"send","body":"Hey @user","mentions":[{"tag":"@user","id":"UID"}],"target":"TID"}
{"action":"send","emoji":"🔥","emojiSize":"large","target":"TID"}
{"action":"send","body":"Check this","url":"https://link","target":"TID"}
```

## Notes
- Supports auto-fallback to MQTT if HTTP send fails
- Attachments require readable streams (use `fs.createReadStream` for local files)
- Mention `tag` text must exist in the `body` string
- The `isGroup` flag is auto-detected via `getThreadInfo` cache if not provided
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Maintain - monitor for endpoint deprecation