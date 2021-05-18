export function markInvalid(clueID) {
	return fetch(`https://jservice.xyz/api/clues/${clueID}`, { method: 'DELETE' }).then((response) => {
		if (!response.ok) throw new Error(response.status);

		return response.json();
	});
}
