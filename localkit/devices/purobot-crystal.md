# Petkit Purobot Crystal

::: warning No OTA Support
The Purobot Crystal (T7) runs on an Ingenic embedded Linux platform and does **not** support OTA firmware updates. To enable local control, you can access the device over telnet — no soldering or opening the device required (see [How to Access](#how-to-access)).
:::

The Petkit Purobot Crystal is a self-cleaning litter box for **crystal litter** with a built-in camera, a deodorizing spray unit, and health monitoring features. Localkit exposes its full feature set as Home Assistant entities via MQTT.

::: info No speaker
The device has no speaker — voice and volume settings exist in the firmware but are not exposed.
:::

## Supported Features

- ✅ Automatic and manual cleaning cycles
- ✅ Deodorizing spray (auto, deep, manual)
- ✅ Lightning (UV) cleaning
- ✅ Litter leveling
- ✅ N60 deodorant crystal and cardboard tray consumable tracking
- ✅ Kitten protection mode
- ✅ Delayed cleaning and cleaning interval configuration
- ✅ Camera control (enable/disable)
- ✅ Snapshots and pet visit detection
- ✅ Health monitoring (urine pH detection, occult blood detection, loose stool recognition)
- ✅ Toilet video recording
- ✅ Bluetooth Proxy

## Actions (Buttons)

These appear as **Button** entities in Home Assistant.

| Name | Technical Name | Description |
|------|-----------------|-------------|
| Start Cleaning | `action_cleaning_start` | Starts a cleaning cycle (only available when the device is idle) |
| Deodorize | `action_deodorize` | Triggers the deodorizing spray |
| Level | `action_level` | Levels the litter |
| Start Lightning | `action_start_lightning` | Starts the lightning (UV) unit |
| Stop Lightning | `action_stop_lightning` | Stops the lightning (UV) unit |
| Reset N60 | `action_reset_n60` | Resets the N60 deodorant crystal counter after replacement |
| Reset Cardboard | `action_reset_cardboard` | Resets the cardboard tray counter after replacement |

## Sensors (Read-only)

These appear as **Sensor** entities in Home Assistant under the `diagnostic` category.

| Name | Technical Name | Unit | Description |
|------|---------------|------|-------------|
| Device Status | `device_status` | — | Current working state: `IDLE`, `CLEANING` |
| Error | `error` | — | Active error (e.g. `door_closed`) or `Ok` |
| IP Address | `ip_address` | — | The device's local IP address |
| Last Used By | `last_used_by` | — | Pet detected at the litter box, if known |
| Hertz | `hertz` | — | Camera frequency setting |
| Scheduled Cleaning | `fixed_time_clear` | — | Scheduled cleaning state |
| Next N60 Change in Days | `n60_durability_in_days` | d | Days remaining until the N60 crystal should be replaced |
| Next Cardboard Change in Days | `cardboard_durability_in_days` | d | Days remaining until the cardboard tray should be replaced |

## Binary Sensors (Read-only)

These appear as **Binary Sensor** entities in Home Assistant under the `diagnostic` category.

| Name | Technical Name | Device Class | Description |
|------|-----------------|--------------|-------------|
| Light | `lightning` | light | `true` while the lightning (UV) unit is running |
| Share Open | `share_open` | — | Firmware share flag |
| Multi Config | `multi_config` | — | Firmware multi-config flag |
| Auto Upgrade | `auto_upgrade` | — | Firmware auto-upgrade flag |

## Snapshot

The most recent snapshot appears as an **Image** entity in Home Assistant.

| Name | Technical Name | Description |
|------|-----------------|-------------|
| Snapshot | `last_snapshot` | The latest image captured from the camera |

## Switches

These appear as **Switch** entities in Home Assistant under the `config` category.

| Name | Technical Name | Default | Description |
|------|---------------|---------|-------------|
| Auto Cleaning | `auto_work` | On | Enables automatic cleaning after each toilet visit |
| Avoid Repeated Cleaning | `avoid_repeat` | On | Skips cleaning if the litter was barely disturbed |
| Kitten Protection | `kitten` | Off | Prevents cleaning while a kitten is inside |
| Tumbling | `tumbling` | — | Tumbling action during cleaning |
| Camera Switch | `camera` | On | Enables or disables the camera module |
| Microphone | `microphone` | On | Enables or disables the built-in microphone |
| Night Vision | `night` | Off | Switches the camera to infrared night vision mode |
| Timestamp Display | `time_display` | Off | Overlays the current time on the camera image |
| Camera Light | `camera_light` | — | Camera indicator light |
| Microphone Indicator Light | `microlight` | — | Microphone indicator light |
| Indicator Light | `wifi_light_assist` | — | Status indicator light |
| Light Assist for Cleaning | `light_assist` | — | Illuminates the box during cleaning |
| Light Assist for Toileting | `toilet_light_assist` | — | Illuminates the box during toilet visits |
| Child Lock | `manual_lock` | Off | Locks the physical buttons on the device |
| Auto Deodorizing | `auto_spray` | On | Sprays automatically after toilet visits |
| Deep Deodorizing | `deep_spray` | — | More thorough deodorizing cycle |
| Urine pH Detection | `urine` | — | Detects the urine pH of the litter |
| Occult Blood Detection | `occult` | — | Detects occult blood in the litter |
| Loose Stool Recognition | `soft_mode` | — | Recognizes loose stool consistency |
| Soft Mode Clean | `soft_mode_clean` | — | Adjusts the cleaning behavior for soft stool |
| Toilet Video Recording | `toilet_detection` | — | Records video of toilet visits |
| Move Detection | `move_detection` | On | Enables motion detection |
| Pet Appearance Detection | `pet_detection` | On | Enables pet detection at the litter box |

## Number Controls

These appear as **Number** entities in Home Assistant under the `config` category.

| Name | Technical Name | Range | Step | Default | Description |
|------|---------------|-------|------|---------|-------------|
| Litter Replacement Cycle | `sand_tray_standard_day` | 0–90 | 1 | 45 | Days after which the crystal litter should be replaced |
| N60 Durability | `n60_durability` | 0–90 | 1 | — | Expected lifespan of the N60 crystal in days |
| Cardboard Durability | `cardboard_durability` | 0–90 | 1 | — | Expected lifespan of the cardboard tray in days |
| Move Sensitivity | `move_sensitivity` | 0–9 | 1 | — | Sensitivity of the motion detection |
| Pet Appearance Sensitivity | `pet_sensitivity` | 0–9 | 1 | — | Sensitivity of the pet detection |
| Detection Interval | `detect_interval` | 0–300 | 1 | — | Minimum seconds between detections |

## Select Controls

These appear as **Select** entities in Home Assistant under the `config` category.

| Name | Technical Name | Options (seconds) | Default | Description |
|------|-----------------|-------------------|---------|-------------|
| Time Interval Of Each Cleaning | `auto_interval_min` | 0, 30, 60, 300, 600, 900, 1800, 3600 | — | How often a cleaning cycle runs |
| Delayed Cleaning | `still_time` | 0, 30, 60, 300, 600, 900, 1800, 3600 | 1200 | Wait time after a visit before cleaning starts |

## How to Access

::: info No soldering required
The Purobot Crystal does **not** support OTA firmware updates, but it is accessible over telnet — no need to open the device or solder a serial connection.
:::

To access the device:

1. Connect to the device via telnet: `telnet <device-ip>`
2. Log in with user `root` and password `while(&P`.

### Change Boot Process

To decloude the device, with a simple script, you only need to use this command:

```shell
wget -qO- http://tool.localkit.io/scripts/t7/1.0.0/install | sh
```

it downloads all neccessary files, set it to right directory, and edit the app-run-script.

execute `reboot` afterwards, and you are good to go.