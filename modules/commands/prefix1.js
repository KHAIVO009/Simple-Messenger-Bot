const axios = require('axios');

module.exports.config = {
	name: "prefix1",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Kim Joseph DG Bien",
	description: "See the prefix of BOT",
	commandCategory: "Noprefix",
	cooldowns: 5,
	dependencies: {
		"axios": ""
	}
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
	const { threadID, messageID, body, senderID } = event;

	if (this.config.credits !== "\u004B\u0069\u006D\u0020\u004A\u006F\u0073\u0065\u0070\u0068\u0020\u0044\u0047\u0020\u0042\u0069\u0065\u006E")
		return api.sendMessage("Incorrect credits!", threadID, messageID);

	const threadData = await Threads.getData(threadID);
	const groupPrefix = threadData.PREFIX || global.config.PREFIX;
	const prefixes = [
		"prefix",
		"ano prefix",
		"prefx",
		"anong prefix",
		"prefix nito?"
	];

	if (prefixes.includes(body.toLowerCase())) {
		api.sendMessage(`The current prefix is [ ${groupPrefix} ]`, threadID, messageID);
	}
};

module.exports.run = async ({ event, api }) => {
	const response = await axios.get('https://i.imgur.com/gTDreyi.gif', {
		responseType: 'arraybuffer'
	});

	if (response.status === 200) {
		const buffer = Buffer.from(response.data, 'binary');
		const message = {
			body: "( Alam mo naman na nonprefix diba??",
			attachment: buffer
		};

		api.sendMessage(message, event.threadID);
	} else {
		api.sendMessage("Failed to fetch the image.", event.threadID);
	}
};
