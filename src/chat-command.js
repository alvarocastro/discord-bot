export class ChatCommand {
	constructor (name) {
		this.name = name;
		this.description = null;
		this.format = null;
		this.hidden = false;
	}

	check (message, args, memory) {
		return true;
	}

	run (message, args, memory) {
		throw new Error(`Command "${this.name}" not implemented`);
	}
}

export class AdminChatCommand extends ChatCommand {
	check ({member}) {
		return member.hasPermission('ADMINISTRATOR');
	}
}

export class ChannelChatCommand extends ChatCommand {
	check ({channel}, args, memory) {
		const channelCommands = memory.get(['channels', channel.id, 'commands'], []);
		return channelCommands.includes(this.name);
	}
}
