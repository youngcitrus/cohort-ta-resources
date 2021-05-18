// Runtime: O(2^n)
function fib(n) {
	if (n === 1 || n === 2) return 1;
	return fib(n - 1) + fib(n - 2);
}

console.log(fib(50));

// Runtime: O(n)
// Default argument for memo
function fib(n, memo = {}) {
	if (n in memo) return memo[n];
	if (n === 1 || n === 2) return 1;

	// Make sure to pass the memo in to your calls to fib!
	memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
	return memo[n];
}

console.log(fib(50));

// STEPS FOR MEMOIZATION
// ======================
// Write out the brute force recursion
// Add the memo object as an additional argument
//   - Keys on this object represent input, values are the corresponding output
// Add a base condition that returns the stored value if the argument is already in the memo
// Before returning a calculation, store the result in the memo for future use
