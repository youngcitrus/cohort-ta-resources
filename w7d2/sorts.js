// bubbleSort variation
// bubble smallest value to the front of the array
// est time: 7 minutes

const bubbleSort = (nums) => {
    for (let i=0; i<nums.length - 1; i++) {
        for (let j=i+1; j<nums.length; j++) {
            if (nums[i] > nums[j]) {
                // swap
                let temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
            }
        }
    }
    return nums;
}

// console.log(bubbleSort([7, 5, 3, 1, 10, 19, 18]))

// est time: 25 minutes
// merge sort

function merge(array1, array2) {
    let p1 = 0;
    let p2 = 0;
    let merged = [];
    while (p1 < array1.length && p2 < array2.length) {
        if (array1[p1] < array2[p2]) {
            merged.push(array1[p1]);
            p1 += 1;
        } else {
            merged.push(array2[p2]);
            p2 += 1;
        }
    }
    if (p1 === array1.length) {
        merged = merged.concat(array2.slice(p2));
    } else {
        merged = merged.concat(array1.slice(p1));
    }
    
    return merged;
}
/*
array1              array2
[4, 6, 7]         [1, 2, 5, 8, 9]
p1                p2

merged 
*/
let nums2 = [4,5,6];
let nums1 = [1,2,5,8,9];
console.log(merge(nums1, nums2));

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const midIndex = Math.floor(arr.length / 2);
    const left = arr.slice(0, midIndex);
    const right = arr.slice(midIndex);
    return merge(mergeSort(left), mergeSort(right));
}



/*


// Quick sort
// est time: 10 minutes

*/

function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }
    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return leftSorted.concat([pivot]).concat(rightSorted);
}

[5,2,6,1]
pivot: 5
l: 2,1
r: 6

leftSorted = [1,2]
rightSorted = [6];

return [1,2].concat([5]).concat([6]);

[1,2,5,6]