# Getting Started with Bluetooth Devices


Localkit supports Petkit devices that communicate via Bluetooth Low Energy (BLE). Depending on the device, Localkit can both receive data and send commands.

## How BLE Integration Works

Petkit BLE devices (K3, W5) do not connect to Wi-Fi directly. Instead, they broadcast BLE advertisements that are picked up by a nearby Petkit device acting as a **BLE proxy**.

The proxy device forwards the BLE data to Localkit over MQTT. Localkit decodes the payload and publishes the device state as Home Assistant entities. Commands (where supported) travel the same route in reverse: Localkit sends a BLE frame to the proxy, which writes it to the device.

## Requirements

- At least one WiFi-capable Petkit device configured in Localkit acting as the BLE proxy. Any supported WiFi device can act as a proxy: Pura Max, Purobot Crystal, Fresh Element 3, Fresh Element Solo, Yumshare Dual, Yumshare Solo, or Eversweet Ultra.
- The BLE device must be **within Bluetooth range** of the proxy device.
- The BLE device must be **linked** to the proxy in Localkit (set via the device's Link With setting).
- The proxy polls the BLE device for status at a configurable **interval** (minutes, minimum 10, default 240). For the W5 you can also press **Refresh Device Data** to request an immediate update.

## Supported Bluetooth Devices

| Device | Description |
|--------|-------------|
| [Petkit K3](./k3) | Odor spray, pairs with and is triggered by the Pura Max (read-only) |
| [Petkit W5](./w5) | Smart water fountain — full control (power, mode, filter reset) via any proxy |

## Limitations

- If the proxy device goes offline, BLE device state will no longer update.
- Multiple BLE devices can be linked to the same proxy.
- The K3 is read-only and can only be linked to a Pura Max; the W5 supports commands and can be linked to any proxy-capable device.