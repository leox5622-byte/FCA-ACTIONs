# searchForThread

Search for threads by name, thread ID, or participant name. Uses GraphQL-based `getThreadList` to avoid Facebook checkpoints. Falls back to legacy AJAX endpoint if GraphQL fails.

## API

| Parameter | Type | Description |
|-----------|------|-------------|
| `searchQuery` | string | Search term [required] |
| `callback` | function | (Optional) `(err, threads)` |

## Returns

`Array` — Array of matching thread objects with full participant info, thread metadata, and unread counts.

## AI JSON Action

```json
{"action":"searchThread","value":"Dora Test GC"}
```

## Example

```javascript
api.searchForThread("Dora", (err, threads) => {
  if (err) return console.error(err);
  console.log(`Found ${threads.length} thread(s)`);
  threads.forEach(t => {
    console.log(`${t.name} (${t.threadID}) - ${t.messageCount} messages`);
  });
});
```

## Test

```javascript
// Tested with query "Dora"
// Found 2 threads:
//   "Dora Test GC" (961645156614788) — 392 messages
//   "Dora Test Group - Will Delete" (1518480996521815) — 2 messages
// Used GraphQL getThreadList method (bypasses checkpoints)
```
## Roadmap

**Phase:** Foundation
**Category:** Core Messaging
**Status:** Working
**Next Steps:** Local inbox filter - maintain