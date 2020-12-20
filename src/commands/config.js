import Command from '../command';

export default class ConfigCommand extends Command {
	name = 'config';

	check ({member}) {
		return member.hasPermission('ADMINISTRATOR');
	}

	run ({channel}, [option, value], memory) {
		if (option === 'prefix') {
			memory.set(['config', option], value);
			channel.send(`Changed ${option} to ${value}`);
		}
	}
}
