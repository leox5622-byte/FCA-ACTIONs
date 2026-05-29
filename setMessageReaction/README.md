# setMessageReaction

React to a message with an emoji, or remove an existing reaction.

## API

### Method Signature
```js
api.setMessageReaction(reaction, messageID)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `reaction` | string | ✅ | Emoji character (e.g., `"👍"`, `"❤️"`, `"😆"`). Pass `""` to remove reaction |
| `messageID` | string | ✅ | ID of the message to react to |

### Example
```js
// Add reaction
await api.setMessageReaction("👍", "mid.$gAANqnHX1woSkbeYfDWePKDXTmKbe");

// Remove reaction
await api.setMessageReaction("", "mid.$gAANqnHX1woSkbeYfDWePKDXTmKbe");
```

## AI JSON Action
TID = Thread ID, UID = User ID
```json
{"action":"react","value":"👍","msgID":"mid.xxx"}
```

## Notes
- Uses Facebook GraphQL mutation endpoint (no TID needed, only messageID)
- Pass empty string `""` as reaction to remove the reaction
- Works on any message the bot can see
- For MQTT-based reaction, use `setMessageReactionMqtt`
## Roadmap

**Phase:** Customization & Moderation
**Category:** Reactions & Pin
**Status:** Working
**Next Steps:** REST variant