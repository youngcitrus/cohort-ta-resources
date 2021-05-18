export function createClue(clue, callback) {
	const xhr = new XMLHttpRequest();

	xhr.addEventListener('readystatechange', () => {
		if (xhr.readyState !== XMLHttpRequest.DONE) return;

		if (xhr.status !== 200) {
			callback(xhr);
		} else {
			const newClue = JSON.parse(xhr.responseText);
			callback(null, newClue);
		}
	});
	const jsonClue = JSON.stringify(clue);
	console.log(jsonClue);
	xhr.open('POST', 'https://jservice.xyz/api/clues');
	xhr.send(jsonClue);
}
