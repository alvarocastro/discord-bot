# discord-bot

[![NPM](https://img.shields.io/npm/v/@alvarocastro/discord-bot)](https://www.npmjs.com/package/@alvarocastro/discord-bot)
[![Maintainability status](https://img.shields.io/codeclimate/maintainability/alvarocastro/discord-bot)](https://codeclimate.com/github/alvarocastro/discord-bot/maintainability)
[![Code style: XO](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Modular library to easily build powerful discord bots.

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)

## Install

```bash
npm install @alvarocastro/discord-bot
```

## Usage

Just instantiate the bot, make it login with your discord token and you are done!

```js
// index.js
import { Bot, commands } from '@alvarocastro/discord-bot';

const bot = new Bot({
	commands: commands
});

bot.login('YOUR_DISCORD_TOKEN');
```

You can pass an array of commands to the bot, the bot by itself has no commands but the library already comes with some simple (and boring) commands you can use, but you can easily build your own.

Let's make a command to get cat images:

```js
// commands/cat.js
import { Command } from '@alvarocastro/discord-bot';

export default class CatCommand extends Command {
	constructor () {
		super(...arguments);
		this.name = 'cat'; // This will be used as the name to invoke the command, eg: !cat
	}

	run ({channel}, [count]) { // Our command will be able to accept a parameter, eg: !cat 3
		count = Number(count);
		count = count > 1 ? count : 1;

		for (let i = 0; i < count; i++) {
			channel.send('https://cataas.com/cat');
		}
	}
}
```

Done! Our command is created, now we have to add it to our bot, let's go back to our `index.js` file.

```js
// index.js
import { Bot, commands } from '@alvarocastro/discord-bot';
import CatCommand from './commands/cat.js';

const bot = new Bot({
	commands: [
		...commands,
		CatCommand
	]
});

bot.login('YOUR_DISCORD_TOKEN');
```

Now our bot is ready to fill our channels with cats!

## Contributing

Contributions are always welcome! Feel free to fix any bug you find or propose commands to add to the bot.

## Support

If you use this package please consider starring it :)
