export function createClue(clue) {
	return fetch('https://jservice.xyz/api/clues/', {
		method: 'POST',
		body: JSON.stringify(clue)
	}).then((response) => {
		if (!response.ok) {
			throw new Error(response.status);
		}
		return response.json();
	});
}
