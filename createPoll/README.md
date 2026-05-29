# createPoll

Create a poll in a group chat. Requires MQTT connection (`api.listenMqtt`). Uses MQTT queue `poll_creation` with label `"163"`.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `threadID` | string | Target group thread ID [required] |
| `questionText` | string | Poll question/title [required] |
| `options` | string[] | Array of poll options (min 2) [required] |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ success: true }` on success (fire-and-forget MQTT publish, no response confirmation).

## AI JSON Action

```json
{"action":"createPoll","title":"Best option?","options":["A","B","C"]}
```

## Notes

- Requires MQTT connection
- Minimum 2 options required
- No callback response from server — result is optimistic
- Uses `poll_creation` queue with label `"163"`
- `task_id` is random (Math.floor(Math.random() * 1001))

## Example

```javascript
api.createPoll("961645156614788", "Best framework?", ["React", "Vue", "Svelte"], (err, res) => {
  if (err) return console.error(err);
  console.log("Poll created:", res);
});
```

## Test

**Tested:** 2026-05-19 — Success
- `createPoll(gcID, "Test?", ["A", "B"])` returned `{ success: true }`
- Poll appears in group chat immediately
## Roadmap

**Phase:** Social & Advanced
**Category:** Group Management
**Status:** Working
**Next Steps:** MQTT-based poll creation