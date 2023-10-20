const wppClient = require("../wppClient");
const helpers = require("../helpers/sendWppMessage");

module.exports = {
  async sendMessage(req, res) {
    try {
      if (
        !req.body ||
        (!req.body.phone && (!req.body.message || !req.body.file))
      ) {
        return res.status(400).json({
          success: false,
          error:
            "Expected JSON object body with at least phone and message or file.",
        });
      }
      const message = {};
      if (req.body.file) message.file = req.body.file;
      message.msg = req.body.message;
      const phoneNumber = req.body.phone;
      let phoneCorrected = phoneNumber.replace(/\D/g, "");
      phoneCorrected = phoneCorrected.replace(/^0+/, "");
      const chat = await wppClient.getChatById(`${phoneCorrected}@c.us`);
      if (!chat) {
        return res
          .status(400)
          .json({ success: false, error: "Chat not found!" });
      }
      await helpers.sendChatMessage(chat, message);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Fail trying to send message!" });
    }
  },
};
