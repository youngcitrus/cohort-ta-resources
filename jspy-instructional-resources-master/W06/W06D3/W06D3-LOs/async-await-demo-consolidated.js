const delayMessage = (message, delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`This is from delayMessage: ${message}`);
		}, delay * 1000);
	});
};

// Without async/await, we can use .then chains
// We use a .catch method to catch errors
function wrapper() {
	delayMessage('hello', 1)
		.then((res1) => {
			console.log(res1);
			return delayMessage('hi', 2);
		})
		.then((res2) => {
			console.log(res2);
			return delayMessage('hey', 3);
		})
		.then((res3) => {
			console.log(res3);
			return delayMessage("what's up", 1);
		})
		.then((res4) => {
			console.log(res4);
		})
		.catch((err) => {
			console.error('Error encountered:', err);
		});
}

wrapper();

// With async/await, our code looks more like synchronous code
// We use a standard try/catch block to handle errors
// In order for us to use `await` we must be in a function declared with `async`
async function wrapper() {
	try {
		console.log(await delayMessage('hello', 1));
		console.log(await delayMessage('hi', 2));
		console.log(await delayMessage('hey', 3));
		console.log(await delayMessage("what's up", 1));
	} catch (err) {
		console.error('Error encountered:', err);
	}
}

wrapper();
