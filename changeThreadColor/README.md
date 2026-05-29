# changeThreadColor

Change the group chat color theme. Requires MQTT connection (`api.listenMqtt`).

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `color` | string | Theme FBID (see table below) |
| `threadID` | string | Target thread ID |
| `callback` | function | (Optional) `(err, result)` |

## Returns

`Object` — `{ messageID: [ seq, threadID ] }` on success.

## AI JSON Action

```json
{"action":"color","value":"169463077092846"}
```

## Available Theme Colors

| Color | Theme ID |
|-------|----------|
| Default Blue | `196241301102133` |
| Hot Pink | `169463077092846` |
| Shadow | `271607034185782` |
| Maple | `2533652183614000` |
| Tulip | `2873642949430623` |
| Grape | `193497045377796` |
| Dune | `1455149831518874` |
| Honey | `672058580051520` |
| Yellow | `174636906462322` |
| Teal Blue | `1928399724138152` |
| Bright Purple | `234137870477637` |
| Peach | `3022526817824329` |
| Berry | `724096885023603` |
| Candy | `624266884847972` |
| Red | `2129984390566328` |
| Green | `2136751179887052` |
| Orange | `175615189761153` |
| Monochrome | `788274591712841` |

## Example

```javascript
const colorID = "169463077092846"; // Hot Pink
api.changeThreadColor(colorID, "961645156614788", (err, result) => {
  if (err) return console.error(err);
  console.log("Color changed:", result);
});
```

## Test

```javascript
// Tested against GC 961645156614788 with Hot Pink (169463077092846)
// Result: { messageID: [ 19, "961645156614788" ] }
// Requires MQTT: api.listenMqtt() first, wait ~3s
```
## Roadmap

**Phase:** Customization & Moderation
**Category:** Thread Customization
**Status:** Working
**Next Steps:** MQTT pattern - maintain