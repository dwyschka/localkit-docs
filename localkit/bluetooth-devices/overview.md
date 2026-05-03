# Getting Started with Bluetooth Devices


Localkit supports a set of Petkit devices that communicate via Bluetooth Low Energy (BLE). These devices are **read-only** — Localkit receives data from them but cannot send commands.

## How BLE Integration Works

Petkit BLE devices (K3, W5) do not connect to Wi-Fi directly. Instead, they broadcast BLE advertisements that are picked up by a nearby Petkit device acting as a **BLE proxy**.

The proxy device (e.g. a Pura Max) forwards the BLE data to Localkit over MQTT. Localkit then decodes the payload and publishes the device state as Home Assistant entities.

## Requirements

- At least one [Petkit Pura Max](../devices/pura-max) configured in Localkit — this acts as the BLE proxy.
- The BLE device must be **within Bluetooth range** of the proxy device.
- The BLE device must be **linked** to the proxy in Localkit (set via the device's Link With setting).

## Supported Bluetooth Devices

| Device | Description |
|--------|-------------|
| [Petkit K3](./k3) | Odor spray, pairs with and is triggered by the Pura Max |
| [Petkit W5](./w5) | Smart water fountain, monitored via the Pura Max proxy |

## Limitations

- No commands can be sent to BLE devices — all entities are read-only.
- If the proxy device goes offline, BLE device state will no longer update.
- Multiple BLE devices can be linked to the same proxy.
