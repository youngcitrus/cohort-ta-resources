function myMin1a(list) {
  let smallestNum;
  for (let i=0; i<list.length; i++) {
    let isSmallest = true;
    for (let j=0; j<list.length; j++) {
      if (list[i] > list[j]) {
        isSmallest = false;
      }
    }
    if (isSmallest) {
      smallestNum = list[i];
    }
  }
  return smallestNum;
}

function myMin1b(list) {
  // Code goes here ...
}


function myMin2(list) {
  let smallest = list[0];
  for (let i=1; i<list.length; i++) {
    if (list[i] < smallest) {
      smallest = list[i];
    }
  }
  return smallest;
}

// Time: O(n^3)
// Space: O(n^2)
function largestContiguousSubsum1(array) {
  let subArrays = [];
  for (let i=0; i<array.length; i++) {
    for (let j=i; j<array.length; j++) {
      let newArray = array.slice(i, j+1);
      subArrays.push(newArray);
    }
  }
  let sums = subArrays.map(sub => sub.reduce((acc, el)=>acc + el));
  return Math.max(...sums);
}

// console.log(largestContiguousSubsum1(array));

//O(n) linear time
//O(1) constant space
function largestContiguousSubsum2(array) {
  let largest = array[0];
  let current = array[0];

  for (let i = 1; i < array.length; i++) {
    if (current < 0) current = 0;
    current += array[i];
    if (current > largest) largest = current;
  }

  return largest;
}
