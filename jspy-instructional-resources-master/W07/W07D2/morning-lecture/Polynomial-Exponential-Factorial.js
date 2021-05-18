// Polynomial - O(n^2)
function quadratic(n) {
	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= n; j++) {
			console.log(`${i}, ${j}`);
		}
	}
}

// Polynomial - O(n^3)
function cubic(n) {
	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= n; j++) {
			for (let k = 1; k <= n; k++) {
				console.log(`${i}, ${j}, ${k}`);
			}
		}
	}
}

// Exponential - O(2^n)
function exponential_2n(n) {
	console.log(n);
	if (n === 1) return;
	exponential_2n(n - 1);
	exponential_2n(n - 1);
}

// Exponential - O(3^n)
function exponential_3n(n) {
	console.log(n);
	if (n === 1) return;
	exponential_3n(n - 1);
	exponential_3n(n - 1);
	exponential_3n(n - 1);
}

// Factorial - O(n!)
function factorial(n) {
	console.log(n);
	if (n === 1) return;
	for (let i = 1; i <= n; i++) {
		factorial(n - 1);
	}
}

module.exports = { quadratic, cubic, exponential_2n, exponential_3n, factorial };
