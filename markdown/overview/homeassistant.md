## Home Assistant

It's possible to integrate the Devices in Home Assistant.
The integration is based on MQTT, Autodiscovery is used.

### Configuration
We need to add following Environment-Variables to the Localkit-Container:
```
HOMEASSISTANT_PORT=HOST_PORT  
HOMEASSISTANT_HOST=HOST_IP
HOMEASSISTANT_CLIENT_ID=localkit  
```

Replace IP and Port with your MQTT-Server.

If your MQTT-Broker requires authentication, add following variables too:
````
HOMEASSISTANT_AUTH_USERNAME=USERNAME
HOMEASSISTANT_AUTH_PASSWORD=PASSWORD
````

::: warning Two users required
When using MQTT authorization, two separate users are needed — one for **subscribing** (used by Localkit to receive messages) and one for **publishing** (used by Home Assistant to send commands). Using a single user for both may cause permission errors.
:::


## Enable
If your Devices are not connected to Home Assistant, ensure the `localkit-homeassistant` service is enabled and running:

![localkit-services.png](../../assets/localkit-services.png)