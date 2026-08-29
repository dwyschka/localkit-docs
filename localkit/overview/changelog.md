# Changelog

## 1.1.0 — Unreleased (beta)

### Devices

- **Petkit Eversweet Ultra** — smart water fountain with camera, heater, automatic water change, and cube consumable tracking
- **Petkit Purobot Crystal** — self-cleaning crystal litter box with camera, deodorizing spray, and health monitoring
- **Petkit Yumshare Dual** — dual-hopper camera feeder with per-hopper feeding amounts and calibration factors
- **Petkit W5** — now fully controllable over BLE (power, mode, filter reset) and exposes all state values to Home Assistant
- Any WiFi device can now act as a **Bluetooth proxy** for BLE devices (previously Pura Max only)

### Features

- Full Home Assistant entity platform with **event entities**: every activity (eat, drink, detect, cleaning, error) fires an event in Home Assistant
- **Pet recognition (discern)**: pet photos are served to camera devices for identification; recognized pet names appear on activities and as "Last Used By"
- **Activity log**: per-device and per-pet activity timelines with attached camera recordings, plus dashboard widgets (Recent Activity, Pet Event Counts per day)
- **Object storage emulation** (S3/Garage): devices upload event images and videos locally; media is decrypted in place and `.ts` recordings are automatically converted to browser-playable MP4
- Camera thumbnails (go2rtc still frames) on the device cards and a live stream in the device edit view
- New **Media** page to browse, download, and delete uploaded media, and a new **Logs** page to view, download, clear, and delete log files
- Redesigned Web UI: top-bar navigation, card-based Devices & Pets pages, device actions on the cards, per-device debug mode, and a "Reset Config" action
- Feeding schedules are now stored in dedicated database tables and pushed reliably to the device (extensive wire-format fixes, per-hopper amounts `a1`/`a2` for the Yumshare Dual)
- Daily automatic cleanup of old activity entries and media, with configurable retention (`LOCALKIT_ACTIVITY_RETENTION_DAYS`, `LOCALKIT_MEDIA_RETENTION_DAYS`)
- Docker: bundled Garage S3 storage service in `docker-compose.yml`

### Technical

- Upgraded to Laravel 13 and Filament 5

## 1.0.0 — April 6, 2026

Initial release of Localkit.

### Devices

- **Petkit Pura Max** — automatic self-cleaning litter box with full Home Assistant integration
- **Petkit Fresh Element Solo** — automatic pet feeder with feeding schedules and food level monitoring
- **Petkit Yumshare Solo** — automatic pet feeder with built-in camera, live stream, and detection features

### Bluetooth Devices

- **Petkit W5** — water fountain support via Bluetooth proxy
- **Petkit K3** — odor spray device, linkable to the Pura Max for automatic post-clean triggers

### Features

- Full Home Assistant integration via MQTT for all supported devices
- Bluetooth Proxy support (Currently read-only).
- Feeding schedules for feeder devices
- Live stream and snapshot capture for the Yumshare Solo
- Motion, pet visit, and eating detection for the Yumshare Solo
- K3 odor spray link/unlink and manual trigger from the Pura Max
- Do-not-disturb scheduling, kitten protection mode, and litter monitoring for the Pura Max
- Desiccant and filter tracking with configurable durability reminders
