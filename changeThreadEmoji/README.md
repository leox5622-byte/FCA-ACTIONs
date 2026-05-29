# changeThreadEmoji

Change the group chat emoji via HTTP (more reliable than MQTT emoji module).

## API

### Method Signature
```js
api.changeThreadEmoji(emoji, threadID, callback?)
```

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `emoji` | string | ✅ | Emoji character (e.g., `"🎯"`, `"🔥"`, `"😆"`) |
| `threadID` | string | ✅ | Target thread ID |
| `callback` | function | | `(err) => {}` |

### Example
```js
await api.changeThreadEmoji("🎯", "961645156614788");
```

## AI JSON Action
TID = Thread ID (e.g., `"961645156614788"`)
```json
{"action":"emoji","value":"🔥","target":"TID"}
```

## Notes
- Uses HTTP POST to Facebook's `save_thread_emoji` endpoint
- More reliable than the MQTT `emoji()` module
- Works even without admin permissions in most groups
- Requires at least one message in the thread (error 1357031 if empty)
## Roadmap

**Phase:** Customization & Moderation
**Category:** Thread Customization
**Status:** Working
**Next Steps:** Maintain