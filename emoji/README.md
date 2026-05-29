# emoji

Set the custom emoji (quick reaction emoji) for a group chat via MQTT.

## API

### Method Signature
```js
api.emoji(emoji, threadID, callback?, initiatorID?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `emoji` | string | ✅ | Emoji character (e.g., `"🎯"`, `"🔥"`, `"😆"`) |
| `threadID` | string | ✅ | Target thread ID |
| `callback` | function | | `(err, result) => {}` |
| `initiatorID` | string | | Sender ID (defaults to bot's user ID) |

### Returns
```js
{
  type: "thread_emoji_update",
  threadID: "961645156614788",
  newEmoji: "🎯",
  senderID: "61586059919455",
  BotID: "61586059919455",
  timestamp: 177913...
}
```

### Example
```js
const result = await api.emoji("🔥", "961645156614788");
```

## AI JSON Action
TID = Thread ID (e.g., `"961645156614788"`)
```json
{"action":"emoji","value":"🔥","target":"TID"}
```

## Notes
- Requires MQTT connection (must call `listenMqtt` first)
- Returns immediately after MQTT publish — does NOT wait for server confirmation
- May silently fail if bot lacks admin permissions in the group
- For a more reliable HTTP-based alternative, use **`changeThreadEmoji`**
- Quick, low-latency MQTT publish (no HTTP request)
## Roadmap

**Phase:** Customization & Moderation
**Category:** Thread Customization
**Status:** Working
**Next Steps:** Deprecated alias for changeThreadEmoji