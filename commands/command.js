const Store = require('./../store');

module.exports = {
	name: 'command',
	description: 'Command!',
	execute (msg, [action, command]) {
		const store = Store.for(msg.channel.guild.id);
		const message = msg.content;
		const prefix = store.getPrefix();

		if (action === 'add') {
			store.allowCommandInChannel(command, msg.channel.id);
			msg.channel.send(`Allowing command "${prefix}${command}" on this channel`);
		} else if (action === 'remove') {
			store.disallowCommandInChannel(command, msg.channel.id);
			msg.channel.send(`Disallowing command "${prefix}${command}" on this channel`);
		}
	}
};
