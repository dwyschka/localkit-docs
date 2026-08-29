# Activity Log & Pet Recognition

Localkit records everything your devices observe — feeding, drinking, cleaning cycles, pet visits, errors — in an **activity log**, links the camera recordings to each event, and publishes the events to Home Assistant.

## Activity Types

| Type | Meaning |
|------|---------|
| `EAT` | A pet ate at a feeder (`eat_start` / `eat_over`) |
| `DRINK` | A pet drank at a water fountain (`drink_start` / `drink_over`) |
| `DETECT` | A pet was detected by a camera |
| `IN_USE` | A pet entered a litter box |
| `CLEANING` | A litter box ran a cleaning cycle |
| `MAINTENANCE` | A maintenance cycle ran (e.g. flush, deep clean) |
| `ERROR` | A device reported an error (`error_start` / `error_over`) |

Start/over pairs share one entry, so a single activity records the full duration. Every event carries the device's `event_id`, which is used as the deduplication key — a redelivered event never creates a duplicate entry.

## Pet Recognition (Discern)

Camera devices with pet recognition periodically fetch a **reference photo list** from Localkit (`dev_discern_pic`). To make recognition work:

1. Open a pet in the Web UI and upload one or more photos of your pet. Photos are cropped to a square in the image editor and stored per pet.
2. Localkit serves the photos to the device, center-cropped and rescaled to the 224×224 input size the recognition model expects.
3. When the camera sees a pet, it sends a `pet_discern` event with the matched `pet_id`. Localkit attaches the pet's name to the activity entry and to the device's **Last Used By** state in Home Assistant.

Whenever you add a new pet photo, Localkit tells all recognition-capable devices to refresh their reference photos immediately.

::: tip
Recognition works best with clear, well-lit photos of the pet's face and body from a similar angle to the camera's view.
:::

## Camera Recordings

Recordings uploaded by camera devices are linked to their activity via the shared `event_id`: each activity entry shows its preview image and video (see [Media & Object Storage](./media)). Continuous recordings are merged into a single clip per event and re-encoded so they play as one continuous video.

## Activity Pages in the Web UI

- **Per device:** open a device card and press **Activities** — a timeline grouped by day, showing each event with its type, recognized pet, and at most one preview image and one video per activity.
- **Per pet:** open a pet card and press **Activities** — the same timeline, scoped to one pet across every device that recognized it.
- **Dashboard:** the Recent Activity widget shows the 8 latest entries across all devices, and the Pet Event Counts widget shows how many events each pet had per day over the last 3 days.

## Home Assistant Events

Every activity is also published to Home Assistant as an **Event** entity — see [Activity Events](./homeassistant#activity-events).

## Retention & Maintenance

- Activity entries older than `LOCALKIT_ACTIVITY_RETENTION_DAYS` (default 30) and media files older than `LOCALKIT_MEDIA_RETENTION_DAYS` (default 7) are deleted by a daily scheduled job.
- `php artisan app:media-delete-unlinked --dry-run` — lists recordings whose event never arrived (e.g. an MQTT message was lost) so they can be cleaned up.
- `php artisan history:backfill-pets --dry-run` — assigns pets to older activity entries that were never matched, by comparing the recorded pet weight against your pet profiles.