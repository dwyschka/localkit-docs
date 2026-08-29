# Petkit Yumshare Dual

::: warning Serial Access Required
The Yumshare Dual runs on an Ingenic embedded Linux platform and does **not** support OTA firmware updates. To enable local control, you need to open the device and gain access via serial connection — the same procedure as for the [Yumshare Solo](./yumshare-solo#how-to-access).
:::

The Petkit Yumshare Dual is an automatic pet feeder with **two food hoppers** and a built-in camera. Each feeding — manual or scheduled — can mix food from both hoppers independently. In addition to scheduled feeding, it provides live video streaming, motion detection, pet recognition, and eating detection. Localkit exposes all these features as Home Assistant entities via MQTT.

## Supported Features

- ✅ Manual feed trigger with per-hopper amounts
- ✅ Feeding schedules with per-hopper amounts
- ✅ Per-hopper calibration factors
- ✅ Camera control (enable/disable)
- ✅ Live stream
- ✅ Motion detection
- ✅ Pet visit detection with pet recognition (discern)
- ✅ Eating detection
- ✅ Night vision
- ✅ Microphone
- ✅ Food level warning
- ✅ Desiccant tracking
- ✅ Volume control
- ✅ Sensitivity tuning
- ✅ Bluetooth Proxy

## Actions (Buttons)

These appear as **Button** entities in Home Assistant.

| Name | Technical Name | Description |
|------|-----------------|-------------|
| Feed | `action_feed` | Dispenses the configured amounts from both hoppers immediately |

## Sensors (Read-only)

These appear as **Sensor** entities in Home Assistant under the `diagnostic` category.

| Name | Technical Name | Unit | Description |
|------|---------------|------|-------------|
| Device Status | `device_status` | — | Current working state: `IDLE`, `WORKING` |
| Error | `error` | — | Active error: `food_empty`, `door_closed`, or `Ok` |
| IP Address | `ip_address` | — | The device's local IP address |
| Last Used By | `last_used_by` | — | Name of the pet most recently recognized at the feeder |
| Bowl | `bowl` | — | Current bowl status as a numeric code |
| Hertz | `hertz` | — | Camera frequency setting (50 or 60 Hz) |
| Surplus Food Control | `surplus_control` | — | Surplus food control state |
| Schedule Change Time | `c_time` | — | Last time the feeding schedule was changed |
| Next Desiccant Change in Days | `durability_in_days` | d | Days remaining until the desiccant packet should be replaced |

## Switches

These appear as **Switch** entities in Home Assistant under the `config` category.

| Name | Technical Name | Default | Description |
|------|---------------|---------|-------------|
| Refill Alarm | `food_warn` | On | Sends a notification when a hopper is running low |
| Child Lock | `manual_lock` | Off | Locks the physical buttons on the device |
| Indicator Light | `light_mode` | Off | Turns the status LED on or off |
| Camera Switch | `camera` | On | Enables or disables the camera module |
| Microphone | `microphone` | On | Enables or disables the built-in microphone |
| Night Vision | `night` | Off | Switches the camera to infrared night vision mode |
| Timestamp Display | `timeDisplay` | Off | Overlays the current time on the camera image |
| Move Detection | `move_detection` | On | Enables motion-triggered detection and alerts |
| Pet Visit Detection | `pet_detection` | On | Enables AI-based pet recognition |
| Pet Eat Detection | `eat_detection` | On | Enables detection of eating behavior |
| Do Not Disturb | `tone_mode` | Off | Suppresses sounds during the quiet period |
| Voice for Food Dispensing | `sound_enable` | On | Plays a voice prompt when food is dispensed |
| Voice Prompt | `system_sound_enable` | On | Enables system voice guidance and status announcements |
| Feed Completion Sound | `feed_sound` | On | Plays a sound when a feeding finishes |
| Pet Tracking | `smart_frame` | Off | Automatically frames and follows the pet in the camera view |
| Feeding Photo | `feed_picture` | Off | Captures a photo when food is dispensed |

## Number Controls

These appear as **Number** entities in Home Assistant under the `config` category.

| Name | Technical Name | Range | Step | Default | Description |
|------|---------------|-------|------|---------|-------------|
| Feed Amount Hopper 1 | `amount1` | 0–50 | 1 | 1 | Portion size per dispense from hopper 1 |
| Feed Amount Hopper 2 | `amount2` | 0–50 | 1 | 1 | Portion size per dispense from hopper 2 |
| Hopper 1 Calibration Factor | `factor1` | 1–100 | 1 | — | Calibrates the dispensed amount of hopper 1 |
| Hopper 2 Calibration Factor | `factor2` | 1–100 | 1 | — | Calibrates the dispensed amount of hopper 2 |
| Move Sensitivity | `move_sensitivity` | 1–9 | 1 | 1 | Sensitivity of the motion detection |
| Pet Visit Sensitivity | `pet_sensitivity` | 1–9 | 1 | 3 | Sensitivity of the pet recognition AI |
| Pet Eat Sensitivity | `eat_sensitivity` | 1–9 | 1 | 3 | Sensitivity of the eating detection AI |
| Detection Interval | `detect_interval` | 0–300 | 1 | — | Minimum seconds between detections |
| Volume | `volume` | 0–9 | 1 | 4 | Speaker volume for voice prompts |
| Surplus Food Standard | `surplus_standard` | 0–100 | 1 | — | Threshold for leftover food detection |
| Desiccant Durability | `desiccant_durability` | 0–90 | 1 | 30 | Expected lifespan of the desiccant packet in days |

## Feeding Schedules

The feeder supports time-based feeding schedules. Each schedule entry defines a time of day and a **per-hopper portion amount** (`Hopper 1` and `Hopper 2`), so you can mix food from both hoppers at any feeding time. Schedules are stored in dedicated schedule tables and processed by Localkit to trigger feed actions at the configured times.

A feeding triggered by the device's own schedule reports only a `feed_over` event — Localkit records the activity from that event, including the dispensed amounts.

## How to Access

See [How to Access — Yumshare Solo](./yumshare-solo#how-to-access) for the serial access procedure. The Yumshare Dual uses the same Ingenic platform and requires the same physical serial connection to decloud the device.