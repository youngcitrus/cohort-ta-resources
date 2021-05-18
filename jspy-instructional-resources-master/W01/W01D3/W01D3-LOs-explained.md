## Intermediate Functions (W1D3) - Learning Objectives

### Intermediate Functions
1. Identify that strings are immutable and arrays are mutable
- When something is 'mutable' it can be changed. In JavaScript, the contents of a string are stored in a specific place in memory. When we want to add/remove/change characters, we change what place in memory we are pointing at. This means that we cannot mutate the string itself, only point to new strings:
```js
let word = 'hello';
console.log(word); // 'hello'
word[0] = 'm';
console.log(word); // 'hello' (we cannot mutate the string)
word += '!';
console.log(word); // 'hello!' (the += is reassigning the whole variable `word` to a new string of 'hello' + '!', or 'hello!')
```
- Unlike strings, arrays are mutable. Instead of a contents being stored directly in memory, we store pointers to the contents. This means not only can we reassign the whole value of the variable, we can change where those pointers go, mutating the contents of the actual array:
```js
let words = ['hello', 'world', 'apple', 'pie'];
console.log(words); // ['hello', 'world', 'apple', 'pie']
words[0] = 'hey';
console.log(words); // ['hey', 'world', 'apple', 'pie']
// we were able to mutate the actual value of our array instead of completely reassigning
```

2. Define a function using both function declaration and function expression syntax
- We have multiple ways to define a function in JavaScript.
```js
// function declaration
function addTwo(num) {
  return num + 2;
}

// function expression
let addTwo = function(num) {
  return num + 2;
}
```

3. Utilize Array#push, #pop, #shift, #unshift to mutate an array
- We can add and remove elements from an array using these methods.
  - push: add an element to the end
  - pop: take an element off of the end
  - shift: take an element off of the front
  - unshift: add an element to the front
```js
let food = ['pizza', 'burger'];
food.push('fries'); // ['pizza', 'burger', 'fries]
food.shift(); // ['burger', 'fries]
food.pop(); // ['burger']
food.unshift('hotdog'); // ['hotdog', 'burger']
console.log(food); // ['hotdog', 'burger']
```

4. List the arguments that can be used with `Array#splice`
- `Array#splice` is a method that allows us to get a reference to a location within an array and then remove a specific number of elements and/or insert new elements at that location. Splice will mutate the array as well as returning any elements that were removed.
- The method has one required argument and several optional ones.
- From the docs (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), we see the arguments listed in the following format:
  - `array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`
- The first argument (start) is the index that we want to start changing the array. If we wanted to start removing and/or inserting elements after the first two that we currently have, we would provide 2 as the argument, since the deleted/inserted elements start at index 2. A useful feature for `start` is that we can provide negative numbers to indicate an index starting from the end (a -1 would mean, start right before the last element of the array).
- The second argument (deleteCount), an optional argument, is the number of elements that we want to remove from the array. If we don't include this value, or if we provide a large value greater than the remaining length, all of the remaining elements will be removed. We don't have to delete anything, so if we just want to insert, we can provide a value of 0, indicating we want to delete no elements.
- The next arguments (item1, item2, etc.), also optional, are what we want to insert into the array. Providing arguments will insert them as elements at this location. Omitting these arguments will simply not insert anything (most likely because we just wanted to use splice's deleting functionality).
- Some examples:
```js
let fruit = ['apple', 'banana', 'grape', 'kiwi', 'orange', 'strawberry', 'watermelon'];
let removed = fruit.splice(4);
console.log(removed); // ['orange', 'strawberry', 'watermelon']
console.log(fruit); // ['apple', 'banana', 'grape', 'kiwi']

fruit = ['apple', 'banana', 'grape', 'kiwi', 'orange', 'strawberry', 'watermelon'];
removed = fruit.splice(-2, 1);
console.log(removed); // ['strawberry']
console.log(fruit); // ['apple', 'banana', 'grape', 'kiwi', 'orange', 'watermelon']

fruit = ['apple', 'banana', 'grape', 'kiwi', 'orange', 'strawberry', 'watermelon'];
removed = fruit.splice(5, 0, 'starfruit');
console.log(removed); // []
console.log(fruit); // ['apple', 'banana', 'grape', 'kiwi', 'orange', 'starfruit', 'strawberry', 'watermelon']

fruit = ['apple', 'banana', 'grape', 'kiwi', 'orange', 'strawberry', 'watermelon'];
removed = fruit.splice(2, 4, 'pizza', 'candy');
console.log(removed); // ['grape', 'kiwi', 'orange', 'strawberry']
console.log(fruit); // ['apple', 'banana', 'pizza', 'candy', 'watermelon']
```
- Splice is a great example of being able to read documentation and apply it to your specific situation. You may not have all aspects of the method memorized, but by parsing the documentation you should be able to understand how to use it.

5. Write a function that sums up elements of an array, given an array of numbers as an argument
- We want to manipulate a variable on each iteration of looping through our array, so we create this variable before the loop, set a starting value, then do our addition inside.
```js
// for loop version
function sumArrayFor(nums){
  let sum = 0;
  for(let i = 0; i < nums.length; i++){
    sums += nums[i];
  }
  return sum;
}

// while loop version
function sumArrayWhile(nums) {
  let sum = 0;
  let i = 0;
  while (i < nums.length) {
    sum += nums[i];
    i++;
  }
  return sum;
}
```

6. Define a function that takes in a 2D array of numbers and returns the total sum of all elements in the array
- We need to access the elements inside of our inner arrays. To accomplish this we need to nest our loops.
- The first loop iterates over the elements in our outer array. Each of these elements is itself an array (the inner arrays that make this 2D).
- The element that we reference on this loop is the inner array. For each of these, we need to iterate over the elements inside, adding them to our total.
```js
function sum2DArray(array) {
  let sum = 0;

  for (let outerIdx = 0; outerIdx < array.length; outerIdx++){
    let innerArray = array[outerIdx];
    for (let innerIdx = 0; innerIdx < innerArray.length; innerIdx++){
      let num = innerArray[innerIdx];
      sum += num;
    }
  }

  return sum;
}
```

7. Define a function that takes in an array of elements and returns a 2d array where the subarrays represent unique pairs of elements
- To create unique pairs, we need to create every combination of indices for our array. For example, with an array of 4 elements, we need [[ele1, ele2], [ele1, ele3], [ele1, ele4], [ele2, ele3], [ele2, ele4], [ele3, ele4]].
- We can accomplish this pattern by creating a nested loop.
  - Our outer loop goes through each index that will be used for the first element.
  - Out inner loop now must create a pair for each second element that represents a valid pair.
  - In order for the pair to be unique, we don't want to repeat indices we've already used. Instead of starting at 0 for the inner loop, we can start at the index after our outer loop, ensuring an index combination that hasn't been used yet.
```js
function createPairs(arr) {
  let pairs = [];

  // We start at 0 in order to use the first element of the array as the starting element
  for (let i = 0; i < arr.length; i++) {
    // The inner loop starts at i + 1 because we want to start at the next element in the array, ensuring no pair repetition
    for (let j = i + 1; j < arr.length; j++) {
      // Now that we have the indices for our pair, we can get the elements and create an array with them
      let pair = [ arr[i], arr[j] ];
      // We push our pair array, representing a unique pair, into our overall pairs array that we are tracking across iterations
      pairs.push(pair);
    }
  }
  // When our outer loop completes, we've iterated over every possible combination and can return our 2d pairs
  return pairs;
};
```

8. Define a function that takes in an array of numbers as an argument and returns the smallest value in the array; if the array is empty return null
- We set up a base case/default. In this scenario, if we don't have any numbers in our array, we return `null`, so this is the default value we use in the variable that will track our minimum value.
- In order to check for the smallest value, we iterate over each element.
- If the current element is smaller than the smallest that we've found (or if it's the first that we are looking at), we overwrite what our smallest value is with the current one and continue looping.
- After all of our iterations, whatever is stored in our variable has to be the smallest value in the whole array.
```js
function minValue(nums) {
  // We set our base value for min, ie, what we want to return if our array is empty
  let min = null;

  // For each element in the array...
  for(let i = 0; i < nums.length; i++) {
    let num = nums[i];
    // ...if the number is either the first we've seen or smaller than our minimum...
    if (min === null || num < min) {
      // ...reassign our minimum to be this new, smaller number.
      min = num;
    }
  }

  // After checking every number, return the smallest one we found.
  return min;
};
```
