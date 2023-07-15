const { MessageMedia } = require("whatsapp-web.js");
const path = require("path");

const wait = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.floor(Math.random() * 1000 + 1000));
  });
};

const sendChatMessage = async (chat, message = null) => {
  try {
    chat.sendStateTyping();
    await wait();
    chat.clearState();
    if (!message.file) {
      await chat.sendMessage(message.msg);
    } else {
      const filePath = path.join(__dirname, `../files/${message.file}`);
      const fileMedia = MessageMedia.fromFilePath(filePath);
      if (!fileMedia) return;
      const options = {};
      if (fileMedia.mimetype.includes("audio")) {
        options.sendAudioAsVoice = true;
        chat.sendStateRecording();
      } else {
        chat.sendStateTyping();
      }
      await wait();
      chat.clearState();
      options.caption = message.msg;
      await chat.sendMessage(fileMedia, options);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendChatMessage };
