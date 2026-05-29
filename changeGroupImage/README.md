# changeGroupImage

Set a new group profile picture. Requires MQTT connection (`api.listenMqtt`). Uploads the image, then sends MQTT `queue_name: "thread_image"` update.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `image` | ReadableStream | Image file stream [required] |
| `threadID` | string | Target group thread ID |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ success: true, response: ... }` on success.

## AI JSON Action

```json
{"action":"groupImage","value":"/path/to/image.jpg"}
```

## Example

```javascript
const fs = require("fs");
const stream = fs.createReadStream("/path/to/image.jpg");
api.changeGroupImage(stream, "961645156614788", (err, res) => {
  if (err) return console.error(err);
  console.log("Group image updated:", res);
});
```

## Test

```javascript
// Requires MQTT: api.listenMqtt() first, wait ~3s
// Requires image as ReadableStream from fs (Readable.from(buffer) fails upload)
// Bot must be group admin
```

**Tested:** 2026-05-19 — Success
- Used `fs.createReadStream(tempFilePath)` to read downloaded PNG of Venti
- Upload succeeded → MQTT `/ls_req` sent → response received with `taskExists` + `setGroupImageGradientsAndEmoji` + `removeTask`
- Response: `{ success: true, response: { step: [...] } }`
- GC profile picture changed successfully in Messenger
- **Caveat:** `Readable.from(Buffer)` does NOT upload correctly — metadata returns empty `{}`. Must use `fs.createReadStream`.

## Scoping Bug in Bundled Module

The bundled `changeGroupImage.js` at `node_modules/@neoaz07/nkxfca/src/apis/changeGroupImage.js` declares `responseHandled`, `onResponse`, and `timeout` inside the `try` block but references them in the `catch` block, causing `ReferenceError` on upload/MQTT failures. The happy path works fine. To fix:

```javascript
// Move these declarations before the try block:
let responseHandled = false;
let timeout = null;
let onResponse = null;
try {
  // ... rest of code
} catch (err) {
  // Now responseHandled, timeout, onResponse are accessible
}
```
## Roadmap

**Phase:** Social & Advanced
**Category:** Group Management
**Status:** Working
**Next Steps:** Requires fs.createReadStream