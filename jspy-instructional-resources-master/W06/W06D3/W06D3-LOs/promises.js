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
			resolve(`This is from the third promise: ${message}`);
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

const delayMessage = (message, delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`This is from delayMessage: ${message}`);
		}, delay * 1000);
	});
};

module.exports = { promise1, promise2, promise3, promise4, delayMessage };
