module.exports.config = {
	name: "avtwibu",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Kojiro Fixed By HiroshiKim",
	description: "Text with fancy writing",
	commandCategory: "text",
	usages: "[text]",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args, Users }) => {
	const request = require("request");
	const fs = require("fs-extra");

	if (!args[0]) {
		api.sendMessage("Character ID is missing!", event.threadID);
		return;
	}

	if (!args[1]) {
		api.sendMessage("Missing background text!", event.threadID);
		return;
	}

	if (!args[2]) {
		api.sendMessage("Missing signature!", event.threadID);
		return;
	}

	const id = args[0];
	const namebg = args[1];
	const signature = args[2];

	const callback = () => {
		api.sendMessage({
			body: "",
			attachment: fs.createReadStream(__dirname + "/cache/avt1.png")
		}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/avt1.png"), event.messageID);
	};

	return request(encodeURI(`https://chards-bot-api.richardretadao1.repl.co/api/canvas/avatarwibu?id=${id}&bgname=${namebg}&sig=${signature}`))
		.pipe(fs.createWriteStream(__dirname + "/cache/avt1.png"))
		.on("close", () => callback());
};
