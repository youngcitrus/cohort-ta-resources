// O(2^n)
// Space: O(2^n)
function nthFib(n) {
	if (n === 1 || n === 2) return 1;

	return nthFib(n - 1) + nthFib(n - 2);
}

// console.log(nthFib(1)); // 1
// console.log(nthFib(2)); // 1
// console.log(nthFib(3)); // 2
// console.log(nthFib(4)); // 3
// console.log(nthFib(5)); // 4
// console.log(nthFib(6)); // 5

// With memoization:
// O(n)
// Space: Depeneds on stack frames, so O(n)
function fibMemo(n, memo = {}) {
	if (n in memo) return memo[n];
	if (n === 1 || n === 2) return 1;

	// Make sure to pass the memo in to your calls to fibMemo!
	memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
	return memo[n];
}

// console.log(fibMemo(1)); // 1
// console.log(fibMemo(2)); // 1
// console.log(fibMemo(3)); // 2
// console.log(fibMemo(4)); // 3
// console.log(fibMemo(5)); // 4
// console.log(fibMemo(6)); // 5

// With tabulation:
// O(n)
// Space: O(n), we can make O(1) if we replace values in our table
function fibTab(n) {
	let table = new Array(n + 1);
	table[0] = 0;
	table[1] = 1;

	for (let i = 2; i < table.length; i++) {
		table[i] = table[i - 1] + table[i - 2];
	}

	return table[n];
}

// console.log(fibTab(1)); // 1
// console.log(fibTab(2)); // 1
// console.log(fibTab(3)); // 2
// console.log(fibTab(4)); // 3
// console.log(fibTab(5)); // 4
// console.log(fibTab(6)); // 5

// Using a memo at a higher scope means subsequent calls to the function (not
// just recursive) will use the precalculated values.
// In this example, it is defined globally, but it could be an attribute of a
// class, stored in a secure general location or database, etc., (ie, it's not
// automatically bad practice)
let memo = {};
function factorial(n) {
	// check to see if a key n is in the object memo
	console.log('calculating factorial of', n);
	if (n in memo) {
		console.log('fetching memo for', n, `(it is ${memo[n]})`);
		return memo[n];
	}

	if (n === 1) return 1;

	let ans = n * factorial(n - 1);
	console.log('storing memo for', n, `(it is ${ans})`);
	memo[n] = ans;
	return ans;
}

console.log('factorial of 6 is:', factorial(6), '\n'); // 6 steps
console.log('factorial of 6 is:', factorial(6), '\n'); // 1 step - we have the answer immediately from our memo
console.log('factorial of 5 is:', factorial(5), '\n'); // 1 step - we have the answer immediately from our memo
console.log('factorial of 8 is:', factorial(8), '\n'); // 3 steps - calculate fact(8) -> calculate fact(7) -> retrieve fact(6) from memo
