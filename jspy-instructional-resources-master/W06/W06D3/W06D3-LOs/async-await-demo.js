// The purpose of having these as separate functions is just to show that the
// content of the promises does not matter, as long as we have a promise we can
// chain them together.
// This also gives us an opportunity to make a promise in the middle of the chain
// fail by using "reject" instead of "resolve".
// Check out the "consolidated" version to see the same code just utilizing one
// promise instead of separate ones.
const promise1 = (message, delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`This is from the first promise: ${message}`);
		}, delay * 1000);
	});
};
const promise2 = (message, delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`This is from the second promise: ${message}`);
		}, delay * 1000);
	});
};
const promise3 = (message, delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(`This is from the third promise: ${message}`);
		}, delay * 1000);
	});
};
const promise4 = (message, delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`This is from the fourth promise: ${message}`);
		}, delay * 1000);
	});
};

// // Alternatively, we could define these promises elsewhere and import them
// // We are using "require" because we are running this file in node, not the browser
// const { promise1, promise2, promise3, promise4 } = require('./promises');

// Without async/await, we can use .then chains
// We use a .catch method to catch errors
function wrapper() {
	promise1('hello', 1)
		.then((res1) => {
			console.log(res1);
			return promise2('hi', 2);
		})
		.then((res2) => {
			console.log(res2);
			return promise3('hey', 3);
		})
		.then((res3) => {
			console.log(res3);
			return promise4("what's up", 1);
		})
		.then((res4) => {
			console.log(res4);
		})
		.catch((err) => {
			console.error('Error encountered:', err);
		});
}

// wrapper();

// With async/await, our code looks more like synchronous code
// We use a standard try/catch block to handle errors
// In order for us to use `await` we must be in a function declared with `async`
async function wrapper() {
	try {
		console.log(await promise1('hello', 1));
		console.log(await promise2('hi', 2));
		console.log(await promise3('hey', 3));
		console.log(await promise4("what's up", 1));
	} catch (err) {
		console.error('Error encountered:', err);
	}
}

wrapper();
