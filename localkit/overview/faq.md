# FAQ

::: details Does Localkit work without an internet connection?
Yes, after the initial setup your devices communicate entirely on your local network — no cloud access required.
:::

::: details Why do I need my own DNS server?
Localkit redirects Petkit's cloud domains to local IPs. This requires a DNS server like AdGuard Home or Pi-hole that supports custom DNS entries.
:::

::: details Why should I not use a wildcard redirect for aliyuncs.com?
Do **not** redirect the whole `aliyuncs.com` domain (e.g. `aliyuncs.com` or `*.aliyuncs.com`). Only the device-specific MQTT subdomain `*.iot-as-mqtt.eu-central-1.aliyuncs.com` may point to the Localkit Broker — see [DNS](./dns).

`aliyuncs.com` is Aliyun's shared cloud domain. A domain-wide wildcard redirect also captures unrelated Aliyun endpoints used by your devices and other clients on your network, and routes them to the Localkit Broker, which cannot answer them. This can break device connectivity and unrelated services, and is hard to debug because the failures appear to come from the device, not the DNS setup.
:::

::: details Why does each container need its own IP address?
Devices connect on fixed, well-known ports (e.g. 443 for MQTT). Since port rewriting is not possible, each container must be reachable on a dedicated IP to avoid conflicts.
:::

::: details Is Home Assistant supported?
Yes, Localkit integrates with Home Assistant via MQTT. Devices are automatically discovered and appear as native entities.
:::

::: details Is Home Assistant required?
No, Home Assistant is optional. Localkit works fully without it.
:::

::: details What is BYPASS_AUTH?
`BYPASS_AUTH` automatically logs you in as a specific user, so you don't have to authenticate every time you open the Web UI. Set `BYPASS_AUTH=true` and `BYPASS_AUTH_ID` to the user ID you want to be automatically logged in as, should be 1
:::

## Devices

::: details Why does the firmware need to be modified?
Petkit secures MQTT connections using their own Certificate Authority (CA). Since a valid certificate signed by their CA cannot be obtained, the firmware must be patched to trust a custom CA — allowing Localkit to act as the MQTT broker.
:::

::: details Can I revert to the original firmware?
Not yet — reverting to the original stock firmware is currently not implemented, but it is planned.
:::

::: details Are Bluetooth devices read-only?
The K3 is read-only — it is triggered by its linked Pura Max. The W5 supports commands (power, mode, filter reset) via any proxy-capable device.
:::

::: details How do I obtain my Bluetooth Credentials?
Use the following page: https://tool.localkit.io/cloud, login to your Petkit account and you will get an overview of your Bluetooth devices.
:::

::: details How can I add a new device?
Currently, it's required to register new devices via the original Petkit app. Afterwards the device will be added to Localkit automatically.
:::

::: details My device is not supported
Contact me on Discord or GitHub.
:::

::: details On Camera Devices, how to get the Camera Stream?
Internally, Localkit uses [Go2RTC](https://github.com/AlexxIT/go2rtc) to stream the camera stream. Access the UI via `:1984`
:::