const returnsThree = () => {
	return 3;
};

const recipricol = (num) => {
	if (num < 1 || num > 1000000) {
		throw new TypeError('Input must be between 1 and 1000000');
	}
	return 1 / num;
};

module.exports = { returnsThree, recipricol };
