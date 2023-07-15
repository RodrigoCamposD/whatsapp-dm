const wppClient = require("./wppClient");
const server = require("./server");

console.log("Starting pedroslopez/whatsapp-web.js");

wppClient.on("ready", () => {
  console.log(`Executando cliente com ${wppClient.info.wid.user}`);
  server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express executando na porta ${process.env.EXPRESS_PORT}`);
  });
});
