const { MessageMedia } = require("whatsapp-web.js");
const path = require("path");
const { existsSync } = require("fs");

const wait = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.floor(Math.random() * 1000 + 1000));
  });
};

const sendChatMessage = async (chat, message) => {
  try {
    chat.sendStateTyping();
    await wait();
    chat.clearState();
    if (!message.file) {
      await chat.sendMessage(message.msg);
    } else {
      let fileMedia;
      if (message.file.includes("http")) {
        fileMedia = await MessageMedia.fromUrl(message.file);
      } else {
        const filePath = path.join(__dirname, `../../files/${message.file}`);
        if (!existsSync(filePath)) throw new Error("File not Found");
        fileMedia = MessageMedia.fromFilePath(filePath);
      }
      if (!fileMedia) throw new Error("Media Error");
      const options = {};
      if (fileMedia.mimetype.includes("audio")) {
        options.sendAudioAsVoice = true;
        chat.sendStateRecording();
      } else {
        chat.sendStateTyping();
      }
      await wait();
      chat.clearState();
      if (message.msg) options.caption = message.msg;
      await chat.sendMessage(fileMedia, options);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendChatMessage };
