# FAQ

### Does Localkit work without an internet connection?

Yes, after the initial setup your devices communicate entirely on your local network — no cloud access required.

### Why do I need my own DNS server?

Localkit redirects Petkit's cloud domains to local IPs. This requires a DNS server like AdGuard Home or Pi-hole that supports custom DNS entries.

### Why does each container need its own IP address?

Devices connect on fixed, well-known ports (e.g. 443 for MQTT). Since port rewriting is not possible, each container must be reachable on a dedicated IP to avoid conflicts.

### Why does the firmware need to be modified?

Petkit secures MQTT connections using their own Certificate Authority (CA). Since a valid certificate signed by their CA cannot be obtained, the firmware must be patched to trust a custom CA — allowing Localkit to act as the MQTT broker.

### Is Home Assistant supported?

Yes, Localkit integrates with Home Assistant via MQTT. Devices are automatically discovered and appear as native entities.

### Is Home Assistant required?

No, Home Assistant is optional. Localkit works fully without it.

### Can I revert to original Firmware?

Yes, but It's still WIP on the implementation part.

### How do I obtain my Bluetooth Credentials?

Use the following Page: https://tool.localkit.io/cloud, login to your Petkit-Account and you got an overview of your Bluetooth Devices

### My Device is not supported 

Contact me on Discord / Github

### Next Supported Devices?
Petkit Purobot Crystal Duo, Petkit Yumshare Dual-Hopper 2

### On Camera Devices, how to get the Camera Stream?
Internally, Localkit uses [Go2RTC](https://github.com/AlexxIT/go2rtc) to stream the camera stream. Access the UI via `http://URIP:1984`

### How can i add a new device?
Currently, it's required to register new devices via the original Petkit-App, afterwards the device will be added to Localkit.