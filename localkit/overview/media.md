# Media & Object Storage

Petkit camera devices (e.g. Yumshare Dual, Yumshare Solo) request short-lived upload credentials and then upload their event images, highlights, time-lapses, and video clips via HTTP PUT/GET. Localkit emulates Petkit's cloud object storage and persists these uploads on a configurable Laravel filesystem disk — by default the bundled **Garage** S3 service from the `docker-compose.yml`.

## Quick Start: Default Docker Setup

If you use the bundled `docker-compose.yml`, the Garage S3 service is preconfigured and the defaults match. Usually you only need to adjust **one** setting:

```env
LOCALKIT_STORAGE_ENDPOINT=http://<LAN-IP-of-this-host>
```

::: warning The camera calls this URL, not your browser
`127.0.0.1` or `localhost` only works if camera and server are the same machine. In practice this must be the LAN IP of the Docker host (e.g. `http://10.0.0.5`) so the device can reach the storage emulation.
:::

Everything else can be copied unchanged from `.env.example`.

## Environment Variables

### Storage emulation

| Variable | Default | Purpose |
|---|---|---|
| `LOCALKIT_STORAGE_ENABLE` | `true` | Enables/disables the storage emulation. `false` = the device gets an empty response and uploads nothing. |
| `LOCALKIT_STORAGE_ENDPOINT` | `http://127.0.0.1` | Base URL the **device** uses for uploads/downloads — must be reachable from the camera's LAN. |
| `LOCALKIT_STORAGE_DECRYPT_ON_UPLOAD` | `true` | Decrypts uploaded media in place (see below). |
| `LOCALKIT_STORAGE_AES_KEY` | `ea8e77e149818f72` | AES-128 key (16 characters) the device uses to encrypt uploads. |
| `LOCALKIT_STORAGE_DISK` | `localkit_storage` | Laravel filesystem disk that actually stores the objects. |
| `LOCALKIT_STORAGE_TYPE` | `oci` | Backend type reported to the device (cosmetic). |
| `LOCALKIT_STORAGE_NAMESPACE` | `localkit` | OCI namespace in the response (cosmetic). |
| `LOCALKIT_STORAGE_BUCKET` | `localkit` | OCI bucket name in the response (cosmetic). |
| `LOCALKIT_STORAGE_DEVICE_TYPE` | `25` | Petkit product type code, used if the device does not report one. |
| `LOCALKIT_STORAGE_CYCLE_TTL` | `2592000` (30 days) | Validity of the storage credentials handed to the device. |
| `LOCALKIT_STORAGE_PAR_TTL` | `43200` (12 h) | Validity of the pre-authenticated upload URLs. |

### S3 backend

These configure the disk that Localkit writes objects to (container-to-container in Docker):

| Variable | Default | Purpose |
|---|---|---|
| `LOCALKIT_S3_ENDPOINT` | `http://localkit-storage:3900` | Where Laravel talks to the S3 backend. |
| `LOCALKIT_S3_REGION` | `garage` | S3 region. |
| `LOCALKIT_S3_BUCKET` | `localkit` | Bucket name. |
| `LOCALKIT_S3_KEY` | (bundled Garage key) | S3 access key. |
| `LOCALKIT_S3_SECRET` | (bundled Garage secret) | S3 secret key. |

::: info AWS variables are unused
`config/filesystems.php` also contains a stock Laravel `s3` disk fed by `AWS_*` variables. That is unused boilerplate — configure the camera storage exclusively via `LOCALKIT_S3_*` / `LOCALKIT_STORAGE_*`.
:::

## Using Your Own S3 Provider

Instead of the bundled Garage container you can use any S3-compatible provider (AWS S3, MinIO, Cloudflare R2, …) — just point `LOCALKIT_S3_*` at its credentials:

```env
LOCALKIT_S3_ENDPOINT=https://your-provider.example
LOCALKIT_S3_REGION=eu-central-1
LOCALKIT_S3_BUCKET=your-bucket
LOCALKIT_S3_KEY=...
LOCALKIT_S3_SECRET=...
```

The camera continues to talk only to `LOCALKIT_STORAGE_ENDPOINT` (Localkit itself) — Laravel forwards the objects to the configured disk in the background. The external S3 provider does not need to be reachable from the camera's LAN, only from the Localkit server.

## Media Decryption

The device encrypts every uploaded file with AES-128-CBC using the configured key and a per-file IV. When the device reports the upload (`dev_upload_file_info_v2`), Localkit decrypts the object **in place** on the storage disk and marks it as decrypted. Uploaded media is then served in plaintext via `/media/file/{fileId}` and shown in the Localkit Web UI. Decryption can be disabled with `LOCALKIT_STORAGE_DECRYPT_ON_UPLOAD=false` (objects then stay encrypted).

## Video Remuxing

Browsers cannot play raw MPEG-TS recordings, so Localkit converts uploaded `.ts` clips to MP4 automatically:

- **Single captures** (event previews, event videos) are losslessly remuxed to fragmented MP4 (`ffmpeg -c copy` with the `aac_adtstoasc` bitstream filter). The original `.ts` is deleted afterwards; the MP4 is the canonical file.
- **Continuous recordings** arrive as ~4-second segments. Segments are merged into a combined `.ts` via ffmpeg's concat demuxer as they arrive, and the merged clip is re-encoded to a single continuous MP4. The per-segment objects are deleted after being merged.

If remuxing fails, the original `.ts` is kept and can be retried later.

## Camera Thumbnails

Camera devices each run their own go2rtc server. Localkit grabs a still frame from go2rtc, converts it with ffmpeg, and shows it as a **camera tile** on the device cards in the Web UI. Thumbnails are cached briefly (`GO2RTC_THUMBNAIL_TTL`, default 10 s) so the device list stays fast. The live stream is available in the device's edit view under Media.

## Media Page

The **Media** page in the Web UI (System → Media) is a file browser over the object storage disk:

- Navigate directories with a breadcrumb trail
- Shows size and modified time for each file
- **Download** any file
- **Delete** single files, or **Delete all** to wipe the entire disk

If the S3 backend is unreachable, the page shows a notice instead of failing.

## Cleanup & Retention

A daily scheduled job (`app:cleanup-activity-log`) deletes old data:

| Variable | Default | Purpose |
|---|---|---|
| `LOCALKIT_MEDIA_RETENTION_DAYS` | 7 | Media files (and their MP4 remuxes) older than this are deleted. |
| `LOCALKIT_ACTIVITY_RETENTION_DAYS` | 30 | Activity log entries older than this are deleted. |

Recordings are intentionally shorter-lived than activity log entries because they take disk space.

Additional maintenance commands (both support `--dry-run`):

```bash
php artisan app:cleanup-activity-log --dry-run  # preview the daily cleanup
php artisan app:media-delete-unlinked --dry-run # find recordings with no matching activity
```

## Verifying It Works

1. Start the Docker stack — the `localkit-storage` (Garage) service must be running.
2. Enable `debug_mode` on a camera device (device form in the Web UI) and watch the storage responses and subsequent PUT/GET requests in the device log (see [Logs page](./web-ui#logs-page)).
3. Successful uploads appear as objects in the bucket and in the media/snapshot views in the device form.