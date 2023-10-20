const wppClient = require("./wppClient");
const server = require("./server");

console.log("Starting...");

wppClient.on("ready", () => {
  console.log(`Client connected with ${wppClient.info.wid.user}`);
  server.listen(process.env.PORT, () => {
    console.log("API ready on", process.env.PORT);
  });
});
