module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kim Joseph DG Bien",
  description: "Interacts with a GPT-3 API",
  commandCategory: "ai",
  usages: "[question]",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  let question = args.join(" ");
  if (!question) {
    return api.sendMessage("Usage: /aiv2 [question]", event.threadID, event.messageID);
  }
  try {
    const response = await axios.get(`hhttps://free-api.hiroshiapi.repl.co/gpt3?ask=${encodeURIComponent(question)}`);
    const answer = response.data.message;
    api.sendMessage(answer, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("Sorry, I couldn't fetch the response from the AI service.", event.threadID, event.messageID);
  }
};
