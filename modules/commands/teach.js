const fs = require('fs');

module.exports.config = {
  name: "teach",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kim Joseph DG Bien",
  description: "teach command",
  commandCategory: "Utilities",
  cooldowns: 5,
  args: "[keyword] | [reply]"
};

module.exports.run = async ({ api, event, args }) => {
  const [keyword, reply] = args.join(" ").split(" | ");

  if (!keyword || !reply) {
    return api.sendMessage(
      "Please provide the keyword and reply in the correct format\n\nExample: /teach hi | hello!",
      event.threadID
    );
  }

  try {
    const filePath = './modules/commands/sim.json';
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);

    if (jsonData.hasOwnProperty(keyword)) {
      jsonData[keyword].push(reply);
    } else {
      jsonData[keyword] = [reply];
    }

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    api.sendMessage(
      `Learned Already\nThank You For Teaching Me\n\nAsk: ${keyword}\nRespond: ${reply}.`,
      event.threadID
    );
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while adding the message.", event.threadID);
  }
};
