export default class Command {
	constructor (name) {
		this.name = name;
	}

	help (message) {
		return false;
	}

	check (message, args, memory) {
		return false;
	}

	run (message, args, memory) {
		throw new Error(`Command "${this.name}" not implemented`);
	}
}
