# 🔨 Petkit Fresh Element 3

![Petkit Fresh Element 3](../public/fresh-element-3.png)

::: info ESP32 Device
The Fresh Element Solo runs on an ESP32 chip and supports firmware updates over the air (OTA).
:::

::: warning BETA
The Integration of this device is currently in BETA, please report any issues you encounter on Github
:::

The Petkit Fresh Element 3 is an automatic pet feeder. Localkit exposes its full feature set as Home Assistant entities via MQTT and supports scheduled feeding.

## Supported Features

- ✅ Manual feed trigger
- ✅ Feeding schedules
- ✅ Food level warning
- ✅ Desiccant tracking
- ✅ Child lock
- ✅ Feed sound prompt

## Actions (Buttons)

These appear as **Button** entities in Home Assistant.

| Name | Description |
|------|-------------|
| Feed | Dispenses one portion of food immediately |

## Sensors (Read-only)

These appear as **Sensor** entities in Home Assistant under the `diagnostic` category.

| Name | Technical Name | Unit | Description |
|------|---------------|------|-------------|
| Device Status | `device_status` | — | Current working state: `IDLE`, `WORKING` |
| Error | `error` | — | Active error: `food_empty`, `door_closed`, or `null` |
| Next Desiccant Change in Days | `durability_in_days` | d | Days remaining until the desiccant packet should be replaced |

## Switches

These appear as **Switch** entities in Home Assistant under the `config` category.

| Name | Technical Name | Default | Description |
|------|---------------|---------|-------------|
| Refill Alarm | `food_warn` | On | Sends a notification when the food hopper is running low |
| Food Dispense Prompt Tone | `feed_sound` | Off | Plays a sound when food is dispensed |
| Indicator Light | `light_mode` | Off | Turns the status LED on or off |
| Child Lock | `manual_lock` | Off | Locks the physical buttons on the device |

## Select Controls

These appear as **Select** entities in Home Assistant under the `config` category.

| Name | Technical Name | Options | Description |
|------|---------------|---------|-------------|
| Amount | `amount` | 10, 15, 20, 25, 30, 35, 40, 45, 50 | Portion size per dispense in grams |

## Number Controls

These appear as **Number** entities in Home Assistant under the `config` category.

| Name | Technical Name | Range | Step | Default | Description |
|------|---------------|-------|------|---------|-------------|
| Desiccant Durability | `desiccant_durability` | 0–90 | 1 | 30 | Expected lifespan of the desiccant packet in days. Used to calculate the next change reminder. |

## How to Flash Modified Firmware

1. Open the device detail page in the Localkit Web UI.
2. Start Action **Check OTA**.
3. Reboot the device — Localkit will automatically serve the modified firmware and the device will install it.

The firmware is loaded directly from Localkit, no manual file transfer is needed.

::: warning Flash twice
The ESP32 has a fallback partition. You need to repeat the OTA process twice to ensure the modified firmware is written to both partitions — otherwise the device may boot back into the original firmware after a reboot.
:::

::: info Reverting to stock firmware
Reverting to the original stock firmware is currently not implemented.
:::

## Feeding Schedules

The feeder supports time-based feeding schedules. Each schedule entry defines a time of day and a portion amount. Schedules are stored as a JSON array and processed by Localkit to trigger feed actions at the configured times.
