// Credit to https://stackoverflow.com/a/2450976
export function shuffle<E>(array: E[]): void {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
}

export function toShuffled<E>(array: E[]): E[] {
	const arrayCopy = Array.from(array);
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
			arrayCopy[randomIndex],
			arrayCopy[currentIndex],
		];
	}
	return arrayCopy;
}
