const reverseString = (input) => {
	if (typeof input !== 'string') {
		throw TypeError('Input must be of type string');
	}
	let newWord = '';
	input.split('').forEach((letter) => (newWord = letter + newWord));
	return newWord;
};

module.exports = reverseString;
