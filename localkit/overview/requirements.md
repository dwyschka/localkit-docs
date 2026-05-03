# Requirements

### Software

| Requirement | Link | Required |
|---|---|---|
| Docker | [docker.com](https://www.docker.com/) | Yes |
| Docker Compose | [docs.docker.com/compose](https://docs.docker.com/compose/) | Yes |
| DNS Server | [AdGuard Home](https://adguard.com/de/adguard-home/overview.html) / [Pi-hole](https://pi-hole.net/) | Yes |
| Home Assistant | [home-assistant.io](https://www.home-assistant.io/) | Optional |
| Generic MQTT Broker | | Optional |

### Hardware

A soldering iron, FTDI adapter, and terminal are only required for devices that need a manipulated firmware (e.g. [YumShare Solo](/devices/yumshare-solo)).

::: info
For most devices, no additional hardware is needed beyond your network setup.
:::

### Why does my device need a manipulated firmware?

Petkit only allows MQTT connections secured with SSL/TLS using their own Certificate Authority (CA). Since we cannot obtain a valid certificate signed by their CA, the firmware needs to be modified to  trust a custom CA — allowing Localkit to act as the MQTT broker.
