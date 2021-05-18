// Runtime: O(2^n)
function fib(n) {
	if (n === 1 || n === 2) return 1;
	return fib(n - 1) + fib(n - 2);
}

// With tabulation:
function fib(n) {
	let table = new Array(n + 1);
	table[0] = 0;
	table[1] = 1;

	for (let i = 2; i < table.length; i++) {
		table[i] = table[i - 1] + table[i - 2];
	}

	return table[n];
}

// What is our time complexity?
// O(__)

function wordBreak(s, wordDict) {
	// creates a new array of length (s.length + 1)
	// fills every element of the array with false
	let table = new Array(s.length + 1).fill(false);
	table[0] = true;

	for (let i = 0; i < table.length; i++) {
		if (table[i] === false) continue;

		for (let j = i + 1; j < table.length; j++) {
			let word = s.slice(i, j);
			if (wordDict.includes(word)) {
				table[j] = true;
			}
		}
	}

	return table[table.length - 1];
}

// STEPS FOR TABULATION
// ======================
// Figure out how big is your table
//   - Typically going to be base on input size (number in fibonacci, length of string in wordBreak)
// What does my table represent?
// What initial values do I need to seed?
// How do I iterate and fill out my table?
