import Command from '../command';

export default class PingCommand extends Command {
	constructor () {
		super(...arguments);
		this.name = 'ping';
	}

	check ({channel}, args, memory) {
		const channelCommands = memory.get(['channels', channel.id, 'commands'], []);
		return channelCommands.includes(this.name);
	}

	run (message) {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	}
}
