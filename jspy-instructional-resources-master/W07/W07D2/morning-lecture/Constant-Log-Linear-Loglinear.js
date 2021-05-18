// Constant
function constant_1(n) {
	return n * 2 + 1;
}

function constant_2(n) {
	for (let i = 1; i <= 20; i++) {
		console.log(i);
	}
}

// Logarithmic
function logarithmic(n) {
	console.log(n);
	if (n <= 1) return;
	logarithmic(n / 2);
}

// Linear
function linear_1(n) {
	for (let i = 1; i <= n; i++) {
		console.log(i);
	}
}

function linear_2(n) {
	console.log(n);
	if (n === 1) return;
	linear_2(n - 1);
}

// Loglinear
function loglinear(n) {
	if (n <= 1) return;
	for (let i = 1; i <= n; i++) { // n calculations, looping using for
		console.log(n);
	}
	loglinear(n / 2); // 
	loglinear(n / 2);
}
 

function loop(n) {
	for (let i = 1; i <= n; i++) { // n calculations, looping using for
		console.log(n);
	}
}

// loglinear(4)
// 4
// 4
// 4
// 4
// loglinear(2)
// 2
// 2
// loglinear(1)
// loglinear(1)
// loglinear(2)
// 2
// 2

// 						loglinear(4) - 4 calcs                         4 calcs
// 			loglinear(2) -2 calcs         2 calcs

module.exports = { constant_1, constant_2, logarithmic, linear_1, linear_2, loglinear };

// O(n^2)
	for (let j = 1; j <= n; j++) {
		console.log(i);
	}
	for (let j = 1; j <= n; j++) {
		console.log(i);
	}
T(n + n) = T(2n) = O(n)