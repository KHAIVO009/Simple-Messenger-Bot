const fs = require('fs');

module.exports.config = {
	name: "stock",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Kim Joseph DG Bien",
	description: "Check the stock of accounts",
	commandCategory: "Utility",
	cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
	try {
		const accountsPath = "./modules/commands/accounts.json";

		if (!fs.existsSync(accountsPath)) {
			return api.sendMessage("No accounts data available.", event.threadID);
		}

		const accountsData = fs.readFileSync(accountsPath, "utf-8");
		const accounts = JSON.parse(accountsData);

		let message = "";

		Object.keys(accounts).forEach(platform => {
			const stock = accounts[platform].length;

			message += `Replit: ${platform}\n`;
			message += `Stock: ${stock}\n\n`;
		});

		return api.sendMessage(message.trim(), event.threadID);
	} catch (error) {
		console.error(error);
		return api.sendMessage("An error occurred while checking the stock.", event.threadID);
	}
};
