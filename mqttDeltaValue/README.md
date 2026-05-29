# mqttDeltaValue

Internal MQTT delta parser module. Parses incoming MQTT delta messages and converts them into structured event objects.

## Notes

- **Internal module** — not directly callable as `api.mqttDeltaValue()`
- Used by `listenMqtt` to process `/t_ms` topic deltas
- Handles delta types: `NewMessage`, `Typing`, `Presence`, `ReadReceipt`, `DeliveryReceipt`, `AdminTextMessage`, `ThreadName`, `ThreadImage`, `ThreadTheme`, etc.
- Not intended for direct use
## Roadmap

**Phase:** Resilience & Anti-Detection
**Category:** Real-time
**Status:** Working
**Next Steps:** Internal delta parser for listenMqtt - not user-facing