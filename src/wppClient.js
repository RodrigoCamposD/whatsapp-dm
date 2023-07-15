const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { platform } = require("os");

let executablePath;

if (platform() === "linux") {
  executablePath = "/usr/bin/google-chrome-stable";
} else if (platform() === "win32") {
  executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
}

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
    executablePath,
  },
});

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("auth_failure", (msg) => {
  console.error("FALHA NA AUTENTICAÇÃO", msg);
});

let rejectCalls = true;

client.on("call", async (call) => {
  if (rejectCalls) await call.reject();
});

client.on("disconnected", (reason) => {
  console.log("Cliente deslogado", reason);
});

module.exports = client;
