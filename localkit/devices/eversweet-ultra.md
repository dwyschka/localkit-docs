# Petkit Eversweet Ultra

::: warning No OTA Support
The Eversweet Ultra (W7H) runs on an Ingenic embedded Linux platform and does **not** support OTA firmware updates. To enable local control, you can access the device over telnet — no soldering or opening the device required (see [How to Access](#how-to-access)).
:::

The Petkit Eversweet Ultra is a smart water fountain with a built-in camera, automatic water change (drain & refill), a heater, separate clean and waste water tanks, and a replaceable filter **cube**. Localkit exposes its full feature set as Home Assistant entities via MQTT.

## Supported Features

- ✅ Fountain flow modes (off, continuous, interval, sensor)
- ✅ Heater with configurable target temperature
- ✅ Automatic drain & refill and drain & flush cycles
- ✅ Deep clean and disinfect cycles
- ✅ Cube (filter) consumable tracking
- ✅ Camera control (enable/disable), live stream, snapshots
- ✅ Pet appearance detection with pet recognition (discern)
- ✅ Drinking detection (start/over)
- ✅ Clean/waste water tank monitoring with alerts
- ✅ Do-not-disturb schedules for fountain, prompt tone, and alerts
- ✅ Bluetooth Proxy

## Actions (Buttons)

These appear as **Button** entities in Home Assistant.

| Name | Technical Name | Description |
|------|-----------------|-------------|
| Reset Add Water | `action_add_water_reset` | Clears the add-water reminder |
| Drain and Flush | `action_drain_and_flush` | Drains the tray and flushes it |
| Refill | `action_refill` | Starts a refill cycle |
| Drain | `action_drain` | Drains the water |
| Deep Clean | `action_deep_clean` | Starts a deep cleaning cycle |
| Reset Cube | `action_reset_cube` | Resets the cube consumable counter after replacement |

## Sensors (Read-only)

These appear as **Sensor** entities in Home Assistant under the `diagnostic` category.

| Name | Technical Name | Unit | Description |
|------|---------------|------|-------------|
| Device Status | `device_status` | — | Current working state: `IDLE`, `WORKING` |
| Error | `error` | — | Active error (see below) or `Ok` |
| IP Address | `ip_address` | — | The device's local IP address |
| Last Used By | `last_used_by` | — | Name of the pet most recently recognized at the fountain |
| Camera Status | `camera_status` | — | Camera status code |
| Heater Run State | `heat_state` | — | Current heater state |
| Measured Heater Temperature | `heat_real_temp` | °C | Temperature measured at the heater |
| Heater Remaining Run Time | `heat_left_time` | s | Time left in the current heating cycle |
| Time In Current Heat State | `heat_status_time` | s | Time spent in the current heat state |
| Water Pump Run State | `water_pump_state` | — | Current water pump state |
| Lift Valve Run State | `lift_valve_state` | — | Current lift valve state |
| Lift Valve Reset State | `lift_reset_state` | — | Lift valve reset state |
| Clean Water Tank State | `cwt_state` | — | Clean water tank state |
| Waste Tank State | `wt_state` | — | Waste water tank state |
| Add Water State | `add_water_state` | — | Add water (refill) state |
| Flush State | `flush_state` | — | Flush cycle state |
| Disinfect State | `disinfect_state` | — | Disinfect cycle state |
| Disinfect Time | `disinfect_time` | s | Disinfect cycle duration |
| Next Cube Change in Days | `cube_durability_in_days` | d | Days remaining until the cube should be replaced |

### Error Codes

The `error` sensor reports the most severe active error:

| Code | Meaning |
|------|---------|
| `water_tank_empty` | The clean water tank is empty |
| `wastebin_full` | The waste water tank is full |
| `valve_error` | Lift valve fault |
| `pump_malfunction` | Water pump fault |
| `heater_malfunction` | Heater fault |
| `heater_low_water` | Heater active with low water level |

## Binary Sensors (Read-only)

These appear as **Binary Sensor** entities in Home Assistant under the `diagnostic` category.

| Name | Technical Name | Device Class | Description |
|------|-----------------|--------------|-------------|
| Clean Water Tank Installed | `clean_water_tank_installed` | — | `true` when the clean water tank is inserted |
| Add Water Too Frequent | `add_water_frequent` | problem | `true` when refill cycles happen too frequently |
| Clean Water Tank Low | `clean_water_lack_light` | problem | `true` when the clean water level is low |
| Clean Water Tank Empty | `clean_water_empty_light` | problem | `true` when the clean water tank is empty |
| Waste Water Tank Full | `waste_water_full_light` | problem | `true` when the waste water tank is full |

## Switches

These appear as **Switch** entities in Home Assistant under the `config` category.

| Name | Technical Name | Default | Description |
|------|---------------|---------|-------------|
| Refill | `add_water_switch` | Off | Manually triggers a refill cycle |
| Auto Drain & Refill | `auto_water_change` | Off | Drains the tray during the scheduled period, then refills |
| Auto Drain & Flush | `auto_flush` | Off | Automatic drain & flush cycles |
| Heater | `heater_switch` | Off | Enables the water heater |
| Camera Switch | `camera` | On | Enables or disables the camera module |
| Microphone | `microphone` | On | Enables or disables the built-in microphone |
| Night Vision | `night` | Off | Switches the camera to infrared night vision mode |
| Camera Indicator Light | `camera_light` | — | Camera indicator light |
| Microphone Indicator Light | `micro_light` | — | Microphone indicator light |
| Light Mode | `light_mode` | — | Indicator light active during the configured light period |
| Child Lock | `manual_lock` | Off | Locks the control panel on the device |
| Pet Appearance Detection | `pet_detection` | On | Enables AI-based pet recognition |
| Drinking Detection | `drink_detection` | On | Enables detection of drinking behavior |
| Pet Tracking | `smart_frame` | Off | Automatically frames and follows the pet in the camera view |
| System Sound | `system_sound_enable` | On | Enables system voice guidance |
| Do Not Disturb | `disturb_mode` | Off | Turns the fountain off during the quiet period |
| Prompt Tone Do Not Disturb | `tone_mode` | Off | Suppresses prompt tones in the quiet period |
| Water Level Alert Do Not Disturb | `wl_disturb_mode` | Off | Indicator light stays off for water-level alerts in the quiet period |
| Add Water Alert Do Not Disturb | `aw_disturb_mode` | Off | Auto-refill disabled in the quiet period |

## Number Controls

These appear as **Number** entities in Home Assistant under the `config` category.

| Name | Technical Name | Range | Step | Default | Description |
|------|---------------|-------|------|---------|-------------|
| Add Water Mode | `add_water_mode` | 0–5 | 1 | — | Refill mode |
| Drain & Refill Cycle | `water_change_cycle` | 1–30 | 1 | — | Days between automatic water changes |
| Drain & Refill Time | `water_change_time` | 0–86399 | 60 | — | Time of day for the water change (seconds since midnight) |
| Drain & Flush Time | `flush_time` | 0–86399 | 60 | — | Time of day for the flush cycle (seconds since midnight) |
| Drain & Flush Cycle | `flush_cycle` | 1–24 | 1 | — | Hours between automatic flush cycles |
| Flow Run Time Preset | `fountain_time` | 1–10 | 1 | — | Flow run time preset |
| Sleep Time Preset | `sleep_time` | 1–10 | 1 | — | Sleep time preset |
| Heater Target Temperature | `heater_temp` | 15.0–40.0 | 1.0 | — | Target water temperature in °C |
| Volume | `volume` | 0–100 | 1 | — | Speaker volume |
| Cube Durability | `cube_durability` | 0–90 | 1 | 30 | Expected lifespan of the cube in days |

## Select Controls

These appear as **Select** entities in Home Assistant under the `config` category.

| Name | Technical Name | Options | Description |
|------|-----------------|---------|-------------|
| Flushing Intensity | `flush_intensity` | 1, 2, 3 | Intensity of the flush cycle |
| Flow Mode | `fountain_mode` | Off, Continuous, Interval, Sensor | Fountain flow mode |

## Drinking & Pet Detection

The camera detects pets and drinking behavior. Each detection is published as a Home Assistant **Event** entity (see [Activity Events](../overview/homeassistant#activity-events)) and recorded in the [Activity Log](../overview/activity-log), including the recognized pet's name. The `drink_start`/`drink_over` events share one activity entry and record the drinking duration.

## How to Access

::: info No soldering required
The Eversweet Ultra does **not** support OTA firmware updates, but it is accessible over telnet — no need to open the device or solder a serial connection.
:::

To access the device:

1. Connect to the device via telnet: `telnet <device-ip>`
2. Log in with user `root` and password `while(&P`.

### Change Boot Process

To decloude the device, with a simple script, you only need to use this command:

```shell
wget -qO- http://tool.localkit.io/scripts/w7h/1.0.0/install | sh
```

it downloads all neccessary files, set it to right directory, and edit the app-run-script.

execute `reboot` afterwards, and you are good to go.