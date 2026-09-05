# Installation

### Overview

Three containers need to be deployed:

| Container | Image |
|---|---|
| [Localkit](https://github.com/dwyschka/localkit) | `ghcr.io/dwyschka/localkit:main` |
| [Localkit Broker](https://github.com/dwyschka/localkit-broker) | `ghcr.io/dwyschka/localkit-broker:main` |
| Object Storage (Garage S3) | `dxflrs/garage:v2.3.0` |

The Localkit and Broker containers each require their own IP address. The example below uses a macvlan network configuration. Make sure to create the `eth0` macvlan network before starting the containers. The Garage storage container only needs to be reachable by Localkit itself and stays on the internal network.

::: info Why separate IPs?
Since the devices connect on fixed, well-known ports (e.g. 443 for MQTT), port rewriting is not possible. Each container must be reachable on its own IP so that multiple hosts can be served without port conflicts.
:::

### Pull Images

```bash
docker pull ghcr.io/dwyschka/localkit:main
docker pull ghcr.io/dwyschka/localkit-broker:main
docker pull dxflrs/garage:v2.3.0
```

### Docker Compose

```yaml
services:
  localkit:
    container_name: localkit
    image: ghcr.io/dwyschka/localkit:main
    cap_add:
      - NET_BIND_SERVICE
    networks:
      localkit:
      eth0:
        ipv4_address: 10.10.46.105
    volumes:
        - localkit-storage:/var/www/html/storage/app
        - localkit-logs:/var/www/html/storage/logs
        - localkit-database:/var/www/html/storage/database
    environment:
        - APP_TIMEZONE=Europe/Berlin
        - DB_CONNECTION=sqlite
        - DB_DATABASE=/var/www/html/storage/database/localkit.sqlite
        - LOCALKIT_GO2RTC_ENABLE=true
        - PETKIT_LOCAL_IP=10.10.46.105
        - LOCALKIT_BROKER_HOST=localkit-broker
        - LOCALKIT_BROKER_PORT=443
        - HOMEASSISTANT_PORT=1883
        - HOMEASSISTANT_HOST=10.10.50.10
        - HOMEASSISTANT_CLIENT_ID=localkit
        - BYPASS_AUTH=true
        - BYPASS_AUTH_ID=1
        # Device object storage (see "Media & Object Storage")
        - LOCALKIT_STORAGE_ENABLE=true
        - LOCALKIT_STORAGE_ENDPOINT=http://10.10.46.105
        - LOCALKIT_S3_ENDPOINT=http://localkit-storage:3900
        - LOCALKIT_S3_REGION=garage
        - LOCALKIT_S3_BUCKET=localkit
        - LOCALKIT_S3_KEY=GKe1fd06e4975f7148c6f4359fa9d50163
        - LOCALKIT_S3_SECRET=b2ebda94643d392065f5381599e6db2a1a87367786742dfce9aac56e4904d9ab
    depends_on:
      - localkit-storage
    restart: always

  localkit-broker:
    image: ghcr.io/dwyschka/localkit-broker:main
    container_name: localkit-broker
    networks:
      localkit:
      eth0:
        ipv4_address: 10.10.46.101
    restart: always
    environment:
      - LOCALKIT=http://localkit

  localkit-storage:
    image: dxflrs/garage:v2.3.0
    container_name: localkit-storage
    command: /garage server --single-node --default-bucket
    networks:
      localkit:
    volumes:
      - ./s3/garage.toml:/etc/garage.toml:ro
      - ./s3/meta:/var/lib/garage/meta
      - ./s3/data:/var/lib/garage/data
    environment:
      - GARAGE_DEFAULT_ACCESS_KEY=GKe1fd06e4975f7148c6f4359fa9d50163
      - GARAGE_DEFAULT_SECRET_KEY=b2ebda94643d392065f5381599e6db2a1a87367786742dfce9aac56e4904d9ab
      - GARAGE_DEFAULT_BUCKET=localkit
      - GARAGE_RPC_SECRET=<random-64-char-hex>
    restart: unless-stopped

volumes:
  localkit-storage:
  localkit-database:
  localkit-logs:

networks:
  localkit:
  eth0:
    external: true
```

::: info Object storage
`LOCALKIT_STORAGE_ENDPOINT` must be the address the **devices** use to reach Localkit (the macvlan IP of the localkit container). See [Media & Object Storage](./media) for the full reference — including how to use your own S3-compatible provider instead of Garage.
:::

### Garage Configuration

The Garage container needs a minimal `./s3/garage.toml` next to your `docker-compose.yml`:

```toml
metadata_dir = "/var/lib/garage/meta"
data_dir = "/var/lib/garage/data"
db_engine = "lmdb"
replication_factor = 1

# If deployed on raspberry pi you might need this
# lmdb_map_size = "1G"

rpc_bind_addr = "[::]:3901"
rpc_public_addr = "127.0.0.1:3901"
rpc_secret = "<same value as GARAGE_RPC_SECRET>"

[s3_api]
s3_region = "garage"
s3_endpoint = "0.0.0.0:3900"
```

Generate the `rpc_secret` with `openssl rand -hex 32` and use the same value in the config file and the `GARAGE_RPC_SECRET` environment variable. With the `--single-node --default-bucket` startup flags and the `GARAGE_DEFAULT_*` variables shown above, Garage creates the layout, access key, and `localkit` bucket automatically on first start — no manual Garage setup is needed.

### Create a User

After the containers are running, create an admin user:

::: code-group
```bash [Docker]
docker exec -it localkit php artisan make:filament-user
```
```bash [Docker Compose]
docker compose exec localkit php artisan make:filament-user
```
:::

Then visit the Web UI — you should be logged in automatically.

### Verify Devices

If everything is set up correctly, your devices will appear in the Web UI.

