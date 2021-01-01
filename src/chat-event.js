export default class ChatEvent {
	constructor (name) {
		this.name = name;
	}

	check (message, memory) {
		return true;
	}

	action (message, memory) {
		throw new Error(`Event "${this.name}" not implemented`);
	}
}
