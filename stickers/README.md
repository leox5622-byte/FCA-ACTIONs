# stickers

Send a sticker in a group chat or private message.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `stickerID` | string/number | Sticker ID to send [required] |
| `threadID` | string | Target thread ID [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

Message send result (same format as `sendMessage`).

## AI JSON Action

```json
{"action":"sticker","stickerID":1234567890}
```

## Notes

- Sticker IDs are numeric
- To find sticker IDs, examine sticker messages received via MQTT events

## Example

```javascript
api.stickers(1234567890, "961645156614788", (err, res) => {
  if (err) return console.error(err);
  console.log("Sticker sent:", res);
});
```
## Roadmap

**Phase:** Maintenance
**Category:** Skipped
**Status:** Skipped - Not loaded
**Next Steps:** Not loaded by nkxfca - verify module loading