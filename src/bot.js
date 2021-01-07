import { Client, Collection } from 'discord.js';
import Memory from './memory';

export default class Bot {
	constructor (options = {}) {
		this.client = new Client();
		this.memory = new Memory();

		this.client.on('message', (message) => {
			this.handleMessage(message);
		});

		this.commands = new Collection();

		if (options.commands?.length) {
			for (const CommandClass of options.commands) {
				const command = new CommandClass();
				command.bot = this;
				this.commands.set(command.name, command);
			}
		}

		if (options.events?.length) {
			this.events = options.events.map(EventClass => new EventClass);
		} else {
			this.events = [];
		}
	}

	get user () {
		return this.client.user;
	}

	setInterval (fn, time, immediate = true) {
		if (immediate) {
			fn(this);
		}
		const newtime = Array.isArray(time) ? Math.floor(Math.random() * (time[1] - time[0])) + time[0] : time;
		setTimeout(() => {
			this.setInterval(fn, time, true);
		}, newtime);
	}

	async login (token) {
		await new Promise(async (resolve, reject) => {
			await this.client.login(token);

			this.client.on('ready', () => {
				resolve();
			});
		});
	}

	async handleMessage (message) {
		// Prevent bots talk
		if (message.author.bot) {
			return;
		}

		const memory = await this.memory.for(message.channel.guild.id);

		for (const event of this.events) {
			if (await event.check(message, memory)) {
				event.action(message, memory);
			}
		}

		const prefix = memory.get(['config', 'prefix']);

		// Check if message starts with prefix
		if (!message.content.startsWith(prefix)) {
			console.log('[handleMessage] Not a command');
			return;
		}

		// Split the message by spaces, ignoring the prefix chars at the beginning
		let [command, ...args] = message.content.substr(prefix.length).split(/ +/);
		command = command.toLowerCase();

		console.log(`[handleMessage] Received command "${command}" with args "${args.join(", ")}"`);

		// Check if the command exists
		if (!this.commands.has(command)) {
			console.log('[handleMessage] Command not found');
			return;
		}

		try {
			console.log(`[handleMessage] Checking if command can run`);
			const allowed = await this.commands.get(command).check(message, args, memory);

			if (!allowed) {
				console.log(`[handleMessage] Command not allowed`);
				return;
			}

			console.log(`[handleMessage] Running command "${command}"!`);
			this.commands.get(command).run(message, args, memory);
		} catch (e) {
			console.error(e);
			message.reply('There was an error trying to execute that command!');
		}
	}
}
