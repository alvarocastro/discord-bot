import Command from '../command';

export default class CommandCommand extends Command {
	name = 'command';

	check ({member}) {
		return member.hasPermission('ADMINISTRATOR');
	}

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
