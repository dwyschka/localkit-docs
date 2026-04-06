# Installation

### Overview

Two containers need to be deployed:

| Container | Image |
|---|---|
| [Localkit](https://github.com/dwyschka/localkit) | `ghcr.io/dwyschka/localkit:main` |
| [Localkit Broker](https://github.com/dwyschka/localkit-broker) | `ghcr.io/dwyschka/localkit-broker:main` |

Each container requires its own IP address. The example below uses a macvlan network configuration. Make sure to create the `eth0` macvlan network before starting the containers.

::: info Why separate IPs?
Since the devices connect on fixed, well-known ports (e.g. 443 for MQTT), port rewriting is not possible. Each container must be reachable on its own IP so that multiple hosts can be served without port conflicts.
:::

### Pull Images

```bash
docker pull ghcr.io/dwyschka/localkit:main
docker pull ghcr.io/dwyschka/localkit-broker:main
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

volumes:
  localkit-storage:
  localkit-database:
  localkit-logs:

networks:
  localkit:
  eth0:
    external: true
```

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

![devices.png](../public/devices.png)
