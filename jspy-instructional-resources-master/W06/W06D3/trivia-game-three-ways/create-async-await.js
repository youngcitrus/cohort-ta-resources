export async function createClue(clue) {
	const response = await fetch('https://jservice.xyz/api/clues', { method: 'POST', body: JSON.stringify(clue) });
	if (!response.ok) throw new Error(response.status);
	return await response.json();
}
