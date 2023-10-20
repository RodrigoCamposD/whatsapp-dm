## MULTIPLE EASY MESSAGE SENDER 😮

DM stands for direct message, no groups here.\
This implementation uses pm2 to execute multiple instances of [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js/) and express with only one docker container.

### 1. Download, install and run...

You will need to map the ports in the `docker run` command before, adapt to your api numbers.
You can create and map a docker volume for local files!

```bash
docker pull rdgcode/whatsapp-dm
# docker volume create dm
docker run -d --name dm -p 3001:3001 -p 3002:3002 rdgcode/dm
# docker run -d --name dm -p 3001:3001 -p 3002:3002 -v dm:/home/node/app/files rdgcode/dm
```

### 2. Configure pm2 ecosystem

```bash
docker exec -it dm /bin/bash
nano ecosystem.config.js
```

You can have as many instances as you want 😉

```javascript
instanceConfig(3001), // http://host-ip:3001/
instanceConfig(3002, { webhook: "custom_webhook" }), // http://host-ip:3002/custom_webhook
instanceConfig(3003, { origin: "https://allowed-origin" }), // only requests from https://allowed-origin
// ... other instances
```

### 3. Restart your Container

```bash
docker restart dm
```

### 4. Scanning the qrcodes / Authenticating

You can use `docker logs dm` but you may have a lot of qr codes in that log, maybe better do it inside the container with `pm2 logs`

```bash
docker exec -it dm /bin/bash
pm2 list
pm2 logs procsess_name --lines 50
```

### 5. Protecting your API

Although you can adjust the origin for express endpoint in the `ecosystem.config.js file`, it is good practice to enable a firewall to avoid problems. An example using ufw (you may need sudo):

```bash
ufw allow ssh
ufw allow from origin_ip
ufw enable
```

## Troubleshooting

```javascript
// bug in authentication? change this const in node_modules/whatsapp-web.js/src/Client.js
const INTRO_IMG_SELECTOR = "div[role='textbox']";
```

### Post examples

`http://host-ip:port/yourHookId`

```json
{
  "phone": "+1 22 33334444",
  "message": "Hello World!\nGet my emoji 😀",
  "file": "https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg"
}
```

```json
{
  "phone": "+1 22 33334444",
  "message": "Look my cat video!!! 😻",
  "file": "cat.mp4"
}
```

Phone always required, and at least one of message or file.\
If you send message and together some file the message will be sent like caption.\
Files can either be from the internet or local, do not forget to take into account that in the case of files from the internet, each time you send the file, the file will be downloaded, keep in mind bandwidth consumption.

### Why I am using pm2 and not multiple containers?

This image requires a large number of packages to run `1.45GB`, this approach has advantages such as memory usage but also some disadvantages such as greater isolation. The container has been using ~500MB of memory, so the approach of running multiple containers would require a VPS with a lot of memory.

### Final notes

📌 This app creates a small delay between messages and sends "typing" or "recording audio" status when applicable to avoid "problems" but it is even more important that you make some delay for your requests.
