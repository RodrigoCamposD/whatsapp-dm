const wppClient = require("../wppClient");
const helpers = require("../helpers/sendWppMessage");

const attachs = ["launchplug-dep1.mp4", "launchplug-dep2.mp4", "reworked.mp4"];

module.exports = {
  async sendMessage(req, res) {
    try {
      const message = {};
      if (!req.body || !req.body.phone || !req.body.message) {
        return res
          .status(400)
          .json({ success: false, error: "Corpo da requisição mal formatado" });
      }
      if (req.body.attach) {
        if (!attachs[req.body.attach]) {
          return res.status(400).json({
            success: false,
            error: "Anexo informado porém não encontrado!",
          });
        } else {
          message.file = attachs[req.body.attach];
        }
      }
      message.msg = req.body.message;
      const phoneNumber = req.body.phone;
      let phoneCorrected = phoneNumber.replace(/\D/g, "");
      phoneCorrected = phoneCorrected.replace(/^0+/, "");
      if (!phoneCorrected.startsWith("55") && phoneCorrected.length <= 11) {
        phoneCorrected = `55${phoneCorrected}`;
      }
      phoneCorrected = `${phoneCorrected}@c.us`;
      const chat = await wppClient.getChatById(phoneCorrected);
      if (!chat) {
        return res
          .status(400)
          .json({ success: false, error: "Chat não encontrado!" });
      }
      await helpers.sendChatMessage(chat, message);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Falha ao enviar a mensagem" });
    }
  },
};
