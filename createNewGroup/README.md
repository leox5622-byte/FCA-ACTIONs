# createNewGroup

Create a new group chat. The bot is automatically added as a participant.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `participantIDs` | string[] | Array of UIDs to add [required, min 2] |
| `groupTitle` | string | (Optional) Group name |
| `callback` | function | (Optional) `(err, threadID)` |

## Returns

`string` — The new thread ID.

## AI JSON Action

```json
{"action":"createGroup","targets":["100037951718438","61550921545749"],"value":"Group Name"}
```

## Example

```javascript
const pids = ["100037951718438", "61550921545749"];
api.createNewGroup(pids, "My New Group", (err, threadID) => {
  if (err) return console.error(err);
  console.log("Created group:", threadID);
});
```

## Test

```javascript
// Tested with UIDs ["100037951718438", "61550921545749"] and title "Dora Test Group"
// Result: threadID "2450824478729454"
```
## Roadmap

**Phase:** Social & Advanced
**Category:** Group Management
**Status:** Working
**Next Steps:** Returns threadID - maintain