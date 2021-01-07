import { AdminChatCommand } from '../chat-command';

export default class ConfigCommand extends AdminChatCommand {
	name = 'config';
	hidden = true;
	format = '<prefix> <value>';
	description = 'Configure the bot';

	run ({channel}, [option, value], memory) {
		if (option === 'prefix') {
			memory.set(['config', option], value);
			channel.send(`Changed ${option} to ${value}`);
		}
	}
}
