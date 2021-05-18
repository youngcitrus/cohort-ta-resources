const myMap = (array, cb) => {
	let mapped = [];
	for (let i = 0; i < array.length; i++) {
		mapped.push(cb(array[i]));
	}
	return mapped;
};

module.exports = myMap;
