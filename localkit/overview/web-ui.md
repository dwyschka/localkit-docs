# Web UI

The Localkit Web UI is built around a **top-bar navigation** (instead of a sidebar) to leave more room for content, with the navigation centered between the logo and the user menu.

## Devices

Devices are shown as a **card grid** (without pagination), which refreshes every 10 seconds. Each card shows:

- The device type and custom name
- The working-state badge and error badge (if any)
- An MQTT-connected indicator and any linked Bluetooth device
- An OTA-available icon when a firmware update is pending
- For camera devices: a live **camera tile** — a cached still frame grabbed from the device's go2rtc stream

Every device action (**Start Feeding**, **Start Cleaning**, **Take Snapshot**, **Deep Clean**, **Reboot**, …) is available directly on the card, and the **Activities** button opens the device's [activity timeline](./activity-log).

The device edit page groups common fields into **Device** and **OTA** sections, followed by the device-specific configuration form. The header holds a **Reset Config** action (danger, with confirmation) that resets the device's schedule and settings back to defaults.

::: info Debug mode
Each device has a `debug_mode` toggle in its edit form. When enabled, all HTTP requests from that device are logged to a per-device log file — useful for troubleshooting (see [Logs page](#logs-page)).
:::

## Pets

Pets are shown as cards with the pet's first photo, species, weight, and gender. Pet photos are uploaded in the edit form with a square crop enforced by the image editor — they double as the reference photos for [pet recognition](./activity-log#pet-recognition-discern).

## Dashboard

The dashboard shows two widgets:

- **Recent Activity** — the 8 latest activity entries across all devices, each linking to the owning pet's or device's activity page
- **Pet Event Counts** — per pet, per day, how many events of each type occurred over the last 3 days

## Logs Page

The **Logs** page (System → Logs) is a viewer over the application logs in `storage/logs/`:

- Pick any log file from a dropdown (most recently modified first)
- Shows the last 300 lines, newest first, with a refresh button
- **Download** a log file
- **Clear** a file (empties it, the file is kept) or **Delete** it entirely

## Media Page

The **Media** page (System → Media) browses the object storage that camera devices upload to — see [Media & Object Storage](./media#media-page) for details.

## Feeding Schedules

Feeding schedules are edited in each feeder's device form. Each schedule item defines a time of day and a portion amount; dual-hopper feeders (Yumshare Dual) set an amount **per hopper**. Changes are sent to the device immediately when saved.