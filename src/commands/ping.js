import { ChannelChatCommand } from '../chat-command';

export default class PingCommand extends ChannelChatCommand {
	name = 'ping';
	description = 'Measures the latency of the bot';

	run (message) {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	}
}
