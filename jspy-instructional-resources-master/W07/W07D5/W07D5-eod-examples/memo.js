// Following example sourced from
// https://www.freecodecamp.org/news/understanding-memoize-in-javascript-51d07d19430e/

// // Big-O of the returned function
// // Time: O(1) (we are either performing the calculation or pulling from the cache)
// // Space: O(1) only creating a result variable
// //
// // Our outer function could potentially take up O(k) space, where k is the number of
// // calls that we make to our returned function. This would happen if each call
// // was a new input and had to be stored in the cache as a new entry.
// const memoizedAdd = () => {
// 	let cache = {};
// 	return (n) => {
// 		if (n in cache) {
// 			// 1 step
// 			console.log('Fetching from cache'); // 1 step
// 			return cache[n]; // 1 step
// 		} else {
// 			console.log('Calculating result'); // 1 step
// 			let result = n + 10; // 1 step
// 			cache[n] = result; // 1 step
// 			return result; // 1 step
// 		}
// 	};
// };
// // returned function from memoizedAdd
// const newAdd = memoizedAdd();
// console.log('Invoking newAdd(9) first time:');
// console.log(newAdd(9)); // calculated
// console.log('\nInvoking newAdd(9) second time:');
// console.log(newAdd(9)); // cached

// A slightly more complex example, memoizing a factorial function:
// Big-O of the returned function
// Time: O(n) (worst case have to calculate each smaller factorial, n recursive calls)
// Space: O(n) (worst case have to recursively call fact n times, resulting in n frames on our call stack)
//
// Our outer function could potentially take up O(n) space. Our largest input needs
// to calculate the values of every smaller factorial.
const memoizedFactorial = () => {
	let cache = { 0: 1 };
	const fact = (n) => {
		if (n in cache) {
			// 1 step
			console.log(`Fetching fact(${n}) from cache`); // 1 step
			return cache[n]; // 1 step
		} else {
			console.log(`Calculating result of fact(${n})`); // 1 step
			let result = n * fact(n - 1); // 1 * up to n recursive calls
			cache[n] = result; // 1 step
			return result; // 1 step
		}
	};
	return fact; // 1 step
};

const factorialCalc = memoizedFactorial();
console.log('\nInvoking factorialCalc(4) first time:');
console.log('factorial of 4:', factorialCalc(4));
console.log('\nInvoking factorialCalc(6) first time:');
console.log('factorial of 6:', factorialCalc(6));
console.log('\nInvoking factorialCalc(4) second time:');
console.log('factorial of 4:', factorialCalc(4));
