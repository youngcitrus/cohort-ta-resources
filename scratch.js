[, 5, 30, 7]
pivot: 8
left: 5
right: 30, 7

5 (sorted)  8   30, 7

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr.shift();
    let left = arr.filter(el => el < arr[midIndex]);
    let right = arr.filter(el => el >= arr[midIndex]);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return leftSorted.concat([pivot]).concat(rightSorted);
    [5].concat([8]).concat([7, 30])
}

