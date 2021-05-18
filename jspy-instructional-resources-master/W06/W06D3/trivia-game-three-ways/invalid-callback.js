export function markInvalid(clueID, callback) {
	const xhr = new XMLHttpRequest();

	xhr.addEventListener('readystatechange', () => {
		if (xhr.readyState !== XMLHttpRequest.DONE) return;

		if (xhr.status !== 200) {
			callback(xhr.status);
		} else {
			const clue = JSON.parse(xhr.responseText);
			callback(null, clue);
		}
	});

	xhr.open('DELETE', `https://jservice.xyz/api/clues/${clueID}`);
	xhr.send();
}
