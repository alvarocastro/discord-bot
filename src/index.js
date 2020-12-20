require('dotenv').config();

import Bot from './bot';
import commands from './commands';

(async function () {
	const bot = new Bot({
		commands: commands
	});

	await bot.login(process.env.DISCORD_TOKEN);
})();
