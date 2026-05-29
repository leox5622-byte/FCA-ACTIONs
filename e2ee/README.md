# e2ee

End-to-end encryption manager for the nkxfca client. Provides a set of methods to enable, disable, and manage E2EE keys and operations.

## API

The module returns an object with the following methods:

| Method | Description |
|--------|-------------|
| `enable()` | Enable E2EE for the client session |
| `disable()` | Disable E2EE |
| `isEnabled()` | Returns `boolean` — whether E2EE is currently enabled |
| `getPublicKey()` | Returns the client's public key for E2EE |
| `setPeerKey(threadID, peerPublicKeyB64)` | Set a peer's public key for a specific thread |
| `clearPeerKey(threadID)` | Clear a peer's public key for a thread |
| `hasPeer(threadID)` | Returns `boolean` — whether a peer key exists for the thread |
| `encrypt(threadID, text)` | Encrypt text for a thread (returns armored ciphertext) |
| `decrypt(threadID, armored)` | Decrypt armored ciphertext for a thread |

## AI JSON Action

Not available as a direct action — use via code.

## Notes

- Uses `../security/e2ee` internal module
- Thread-level per-peer key management
- Encrypt/decrypt operations use ASCII-armored format
## Roadmap

**Phase:** Maintenance
**Category:** Skipped
**Status:** Skipped - Not loaded
**Next Steps:** Not loaded by nkxfca loginHelper - investigate integration