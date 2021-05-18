function quicksort(array) {
	if (array.length <= 1) {
		return array;
	}
	let leftSlice = [];
	let rightSlice = [];
	let pivotIndex = Math.floor(array.length / 2);
	let pivot = array[pivotIndex];
	for (let i = 0; i < array.length; i++) {
		if (i === pivotIndex) continue;
		if (array[i] < pivot) {
			leftSlice.push(array[i]);
		} else if (array[i] >= pivot) {
			rightSlice.push(array[i]);
		}
	}
	console.log(`input: ${array}, leftslice: ${leftSlice}, pivot: ${pivot}, rightslice: ${rightSlice}`);
	let sortedLeft = quicksort(leftSlice);
	let sortedRight = quicksort(rightSlice);
	console.log(`input: ${array}, sortedLeft: ${sortedLeft}, pivot: ${pivot}, sortedRight: ${sortedRight}`);
	return sortedLeft.concat(pivot).concat(sortedRight);
}

let array = [ 4, 18, 95, 23, 0, -1, 63, 46, 47, -123, -16, -5 ];

console.log(quicksort(array));
