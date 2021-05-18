// in testing-demo/problems/reverse-string.js

const reverseString = (str) => {
	// throws a specific error unless the the incoming arg is a string
	if (typeof str !== 'string') {
		throw new TypeError('this function only accepts string args');
	}

	return str.split('').reverse().join('');
};

// note this function is being exported!
module.exports = reverseString;
