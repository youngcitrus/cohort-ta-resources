// Chaining function invocation
function lazyAdder(firstNum) {
	return function(secondNum) {
		return function(thirdNum) {
			return firstNum + secondNum + thirdNum;
		};
	};
}

// We can store the result of each individual result
let stepOneResult = lazyAdder(5);
let stepTwoResult = stepOneResult(10);
let result = stepTwoResult(5);
console.log(result); // 20

// We can also chain the result
let otherResult = lazyAdder(5)(10)(5);
console.log(otherResult); // 20
