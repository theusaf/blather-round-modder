export function similarity(s1: string, s2: string): number {
	let longer = s1;
	let shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	const longerLength = longer.length;
	if (longerLength === 0) {
		return 1.0;
	}
	return (longerLength - editDistance(longer, shorter)) / longerLength;
}

export function editDistance(s1: string, s2: string): number {
	const normalized1 = s1.toLowerCase();
	const normalized2 = s2.toLowerCase();

	const costs = [];
	for (let i = 0; i <= normalized1.length; i++) {
		let lastValue = i;
		for (let j = 0; j <= normalized2.length; j++) {
			if (i === 0) costs[j] = j;
			else {
				if (j > 0) {
					let newValue = costs[j - 1];
					if (normalized1.charAt(i - 1) !== normalized2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0) costs[normalized2.length] = lastValue;
	}
	return costs[normalized2.length];
}
