# addExternalModule

Load external/custom modules into the bot at runtime. Lets you extend the API with your own functions without modifying core files.

## API

### Method Signature
`api.addExternalModule(moduleObj)`

### Parameters
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `moduleObj` | Object | ✅ | Keys = API method names, Values = factory functions `(defaultFuncs, api, ctx) => yourFunc` |

### Example
```js
api.addExternalModule({
  ping: (defaultFuncs, api, ctx) => (callback) => {
    callback(null, "pong!");
  }
});
// Now api.ping() is available
```

### Notes
- Each factory function receives the same internals as built-in modules
- Methods are attached directly to the `api` object

## Test

```javascript
// Tested: added ping and echo functions via addExternalModule
// api.ping()   → "pong!"
// api.echo("hello world") → "hello world"
```
## Roadmap

**Phase:** Social & Advanced
**Category:** HTTP & Utilities
**Status:** Working
**Next Steps:** Factory pattern - maintain