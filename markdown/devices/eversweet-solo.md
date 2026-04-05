# Petkit W5 Water Fountain

::: info BLE Device — Read-only
The W5 water fountain communicates via Bluetooth Low Energy (BLE). It is **read-only** — Localkit receives state updates from the device but cannot send commands to it. A Petkit device capable of acting as a BLE proxy (e.g. a Pura Max or similar) must be present on the network and within Bluetooth range of the fountain.
:::

The Petkit W5 is a smart pet water fountain. Localkit decodes BLE advertisements from the device and exposes its status as Home Assistant entities via MQTT. Supported variants include W5, W5C, W4X, and CTW3.

## How it Works

The fountain broadcasts BLE packets that are picked up by a nearby Petkit device acting as a BLE proxy. Localkit decodes the binary BLE payload and maps it to the properties below. Because communication is one-way (BLE advertisement only), no control commands can be sent to the fountain.

## Binary Sensors (Read-only)

These appear as **Binary Sensor** entities in Home Assistant under the `diagnostic` category.

| Name | Technical Name | Device Class | Description |
|------|---------------|-------------|-------------|
| Power | `power_status` | power | `on` when the fountain is powered on, `off` when off |
| Running | `running_status` | power | `on` when the pump is actively running |
| Warning: Breakdown | `warning_breakdown` | problem | `on` when a hardware fault is detected |
| Warning: Water Missing | `warning_water_missing` | problem | `on` when the water level is too low |
| Warning: Filter | `warning_filter` | problem | `on` when the filter needs attention |

## Sensors (Read-only)

These appear as **Sensor** entities in Home Assistant under the `diagnostic` category.

| Name | Technical Name | Unit | Description |
|------|---------------|------|-------------|
| Filter % | `filter_percentage` | % | Remaining filter capacity (0–100) |
| Link With | `link_with` | — | Name of the Petkit BLE proxy device this fountain is linked to |

## Additional State (not exposed to Home Assistant)

The following fields are parsed from the BLE payload and stored internally but are not directly exposed as Home Assistant entities:

| Field | Description |
|-------|-------------|
| Mode | Operating mode (1 = normal flow, other values = smart mode) |
| Do Not Disturb State | Whether the DND schedule is currently active |
| Do Not Disturb Switch | Whether the DND schedule is enabled |
| Do Not Disturb On | Start time of the quiet period (minutes since midnight) |
| Do Not Disturb Off | End time of the quiet period (minutes since midnight) |
| Pump Runtime | Total pump runtime in seconds (lifetime) |
| Pump Runtime Today | Pump runtime today in seconds |
| Filter Time Left (Days) | Estimated days until filter replacement |
| Smart Time On | Smart mode on-duration in minutes |
| Smart Time Off | Smart mode off-duration in minutes |
| LED Switch | Whether the LED is enabled |
| LED Brightness | LED brightness level |
| LED Light Time On | LED on-time (minutes since midnight) |
| LED Light Time Off | LED off-time (minutes since midnight) |
| Purified Water (Total) | Total liters of water purified (lifetime) |
| Purified Water (Today) | Liters purified today |
| Energy Consumed | Total energy used in kWh |

## Supported Device Variants

| Alias | Flow Rate | Pump Divisor | Power Draw |
|-------|-----------|-------------|-----------|
| W5 | 1.5 L/min | 2.0 | 0.75 W |
| W5C | 1.3 L/min | 1.0 | 0.182 W |
| W4X | 1.5 L/min | 1.8 | 0.75 W |
| CTW3 | 1.5 L/min | 3.0 | 0.75 W |

The variant affects how pump runtime is translated into purified water volume and energy consumption figures.

## Requirements

- A supported Petkit device acting as a **BLE proxy** must be within Bluetooth range of the fountain.
- The proxy device must be configured in Localkit and linked to the fountain via the **Link With** setting.
