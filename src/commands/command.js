import { AdminChatCommand } from '../chat-command';

export default class CommandCommand extends AdminChatCommand {
	name = 'command';
	hidden = true;
	format = '<allow|disallow> <command>';
	description = 'Enables/disables the use of certain commands per channel';

	run ({channel}, [action, command], memory) {
		memory.default(['channels'], {
			[channel.id]: {
				'commands': []
			}
		});

		if (action === 'allow') {
			let commands = memory.get(['channels', channel.id, 'commands'], []);

			// Add the command
			commands.push(command);
			// Remove duplicates in case the command was already allowed
			commands = commands.filter((cmd, i) => commands.indexOf(cmd) === i);
			memory.set(['channels', channel.id, 'commands'], commands);
			channel.send(`Allowing command ${command} on this channel`);
			return;
		}

		if (action === 'disallow') {
			let commands = memory.get(['channels', channel.id, 'commands'], []);

			commands = commands.filter(cmd => cmd !== command);
			memory.set(['channels', channel.id, 'commands'], commands);
			channel.send(`Disallowing command ${command} on this channel`);
			return;
		}
	}
}
