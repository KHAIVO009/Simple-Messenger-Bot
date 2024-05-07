module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kim Joseph DG Bien",
  description: "Interacts with a GPT-4 API",
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
    return api.sendMessage("Usage: /ai [question]", event.threadID, event.messageID);
  }
  try {
    const response = await axios.get(`https://gpt4-ni-kim.hiroshiapi.repl.co/gpt?ask=${encodeURIComponent(question)}`);
    const answer = response.data.response;
    api.sendMessage(answer, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("Sorry, I couldn't fetch the response from the AI service.", event.threadID, event.messageID);
  }
};
