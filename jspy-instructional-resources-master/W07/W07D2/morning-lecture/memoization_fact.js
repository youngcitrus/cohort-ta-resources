// MEMOIZATION

// // Runtime: O(n)
// function factorial(n) {
// 	if (n === 1) return 1;
// 	return n * factorial(n - 1);
// }

// console.log(factorial(6));
// console.log(factorial(100));

// Using a memo
let memo = {};
function factorial(n) {
	// check to see if a key n is in the object memo
	if (n in memo) {
		console.log('fetching memo for', n);
		return memo[n];
	}

	if (n === 1) return 1;

	let ans = n * factorial(n - 1);
	console.log('storing memo for', n);
	memo[n] = ans;
	return ans;
}

// console.log(factorial(6)); // 6 steps
// console.log(memo); // Has all of the
// console.log(factorial(6)); // 1 step - we have the answer immediately from our memo
// console.log(factorial(5)); // 1 step - we have the answer immediately from our memo
// console.log(factorial(8)); // 3 steps - calculate fact(8) -> calculate fact(7) -> retrieve fact(6) from memo

module.exports = factorial;
