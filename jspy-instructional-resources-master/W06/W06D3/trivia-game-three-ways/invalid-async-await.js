export async function markInvalid(clueID) {
	const response = await fetch(`https://jservice.xyz/api/clues/${clueID}`, { method: 'DELETE' });
	if (!response.ok) throw new Error(response.status);
	return await response.json();
}
