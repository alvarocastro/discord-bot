module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute (msg, args) {
		const timeTaken = Date.now() - msg.createdTimestamp;
		msg.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
		msg.channel.send('<:pepelaugh:783660173558284288>');
	}
};
