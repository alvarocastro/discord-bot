const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

export default class Memory {
	constructor () {
		this.guilds = {};

		if (!fs.existsSync('./data')) {
			fs.mkdirSync('./data');
		}
	}

	async for (guildId) {
		if (this.guilds[guildId]) {
			return this.guilds[guildId];
		}

		return this.guilds[guildId] = new GuildMemory(guildId);
	}
}

export class GuildMemory {
	constructor (guildId) {
		this.db = low(new FileSync(`./data/guild-${guildId}.json`));

		this.db.defaults({
			config: {
				prefix: '!'
			},
			channels: {
				// <CHANNEL_ID>: {
				// 	commands: ['']
				// }
			}
		}).write();
	}

	get (path, value) {
		console.log('Memory#get', path, value);
		return this.db.get(path, value).value();
	}

	set (path, value) {
		console.log('Memory#set', path, value);
		this.db.set(path, value).write();
	}

	default (path, value) {
		console.log('Memory#default', path, value);
		this.db.get(path).defaultsDeep(value).write();
	}
}
