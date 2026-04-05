# Supported Devices

Currently, only a limited set of Petkit devices is supported. Each device requires a separate implementation.

::: info
ESP32-based devices support firmware updates over the air (OTA). Ingenic/embedded Linux devices require physical serial access to install modified firmware.
:::

## Petkit Pura Max (ESP32)

![Petkit Pura Max](../assets/petkit-pura-max.webp)

Automatic self-cleaning litter box with odor control and K3 spray integration.

Supported:
- [x] Auto and manual cleaning cycles
- [x] Maintenance mode
- [x] K3 odor spray (link/unlink, manual trigger)
- [x] Litter weight, fill level, and usage monitoring
- [x] N50 deodorizer filter tracking
- [x] Do-not-disturb scheduling
- [x] Kitten protection mode
- [x] Error reporting

[Full documentation →](./devices/pura-max)

---

## Petkit Fresh Element Solo (ESP32)

![Petkit Fresh Element Solo](../assets/petkit-elements-solo.png)

Automatic pet feeder with portion control and feeding schedules.

Supported:
- [x] Manual feed trigger
- [x] Feeding schedules
- [x] Food level warning
- [x] Desiccant tracking
- [x] Feed sound, indicator light, and child lock

[Full documentation →](./devices/fresh-element-solo)

---

## Petkit Yumshare Solo (Ingenic / Embedded Linux)

![Petkit Yumshare Solo](../assets/yumshare-solo.png)

::: warning
No OTA support. To enable local control, you need to open the device and connect via serial.
:::

Automatic pet feeder with a built-in camera, motion detection, and AI-based pet and eating detection.

Supported:
- [x] Manual feed trigger
- [x] Feeding schedules
- [x] Camera, microphone, night vision
- [x] Snapshot capture
- [x] Motion, pet visit, and eating detection
- [x] Adjustable detection sensitivity
- [x] Volume control
- [x] Desiccant tracking

[Full documentation →](./devices/yumshare-solo)

---

## Petkit W5 — Water Fountain (BLE, Read-only)

Smart pet water fountain. Received via Bluetooth Low Energy through a Petkit BLE proxy device. Read-only — no control commands supported.

Supported:
- [x] Power and running status
- [x] Filter percentage monitoring
- [x] Breakdown, water missing, and filter warnings
- [x] Pump runtime and water purification statistics
- [x] Energy consumption tracking

[Full documentation →](./devices/eversweet-solo)

---

## Petkit K3 — Odor Spray (BLE, Read-only)

Bluetooth odor spray that pairs with the Pura Max litter box. Triggered automatically after each cleaning cycle. Read-only — controlled via the linked Pura Max.

Supported:
- [x] Liquid level monitoring
- [x] Battery level monitoring
- [x] Link status (paired Pura Max)

[Full documentation →](./devices/k3)
