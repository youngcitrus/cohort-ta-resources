## Advanced Array Methods and Helper Functions (W1D4) - Learning Objectives

### Advanced Array Methods
1. Utilize Array#forEach to iterate through every element in an array
- `forEach` takes in a callback function as an argument. This function should take in the element that we are currently looking at as its argument, as well as optional arguments to capture the index and the array as a whole. The callback then performs whatever action we need to do with these elements/indices/array.
```js
let nums = [3, 5, 4, 2];

// print out each element
nums.forEach(function(element){
  console.log(element);
})

// print the element n times, where n is the index of the element
nums.forEach(function(element, index){
  for(let i = 0; i < index; i++){
    console.log(element);
  }
})

// assign each element to be the product of itself and its index
// print the array after the iterations have completed
nums.forEach(function(element, index, array){
  array[index] = element * index;
})
console.log(nums)
```

2. Utilize Array#map to return a new array with elements based off of the original
- Similar to `forEach`, `map` takes in a callback function as an argument that itself takes in the current element, with optional index and array arguments.
- The difference here is that the callback should return a value, which will be used as the element for that index in the new array that is returned.
```js
// create an array that is the product of each element and its index
// (this is different from the forEach example because it does not mutate the original array)
let nums = [3, 5, 4, 2];
let newNums = nums.map(function(num, idx){
  return num * idx;
})
console.log(nums);    // [3, 5, 4, 2]
console.log(newNums); // [0, 5, 8, 6]


// create an array that adds exclamation points to each word
let boring = ['hello', 'world'];
let exciting = boring.map(function(word){
  return word + '!!'
})
console.log(boring);   // ['hello', 'world']
console.log(exciting); // ['hello!!', 'world!!']
```

3. Utilize Array#filter to filter return a filtered array based on a callback function
- Like above, `filter` takes in a callback function that itself takes arguments for the element, and optional arguments for the index and the array.
- The callback should return `true` if the element should be included in the new array that is returned, or `false` if it should not be included.
```js
// only include words with length > 6
let words = ['apple', 'grape', 'pineapple', 'watermelon'];
let longWords = words.filter(function(word){
  return word.length > 6;
})
console.log(longWords); // ['pineapple', 'watermelon']

// only include numbers that are less than or equal to their original index
let nums = [3, -1, 2, 6];
let filteredNums = nums.filter(function(num, idx){
  return num <= idx;
})
console.log(filteredNums); // [-1, 2]
```

4. Utilize Array#reduce to return a value computed based on elements of an array
- `reduce` is useful if we want to use every value in an array to compute some final value (a sum or product are simple examples).
- The arguments to `reduce` are slightly different in that the function that it takes in as an argument itself takes in an accumulator as the first argument (the value that will be reassigned with each iteration's return statement), the current element as the second argument, as well as the usual optional index and array reference arguments.
- In addition to this callback, `reduce` can also take in an optional second argument, the initial value to start our calculations with. If no value is supplied, we use the first value of the array as the initial value.
```js
// Find the product of all numbers in an array
let nums = [3, -1, 2, 6];
// No initial value is given, so we use the first element of the array as our first accumulator
// With each iteration, we multiply our accumulator by our next number
// The result becomes the new value of the accumulator (-3 after the first round), and we continue our calculations
// In this example, our accumulator starts out as 3, then becomes -3, -6, then finally -36, which is returned as our final product.
let product = nums.reduce(function(accumulator, num){
  return accumulator * num;
})
console.log(product); // -36


// Calculate the final score, taking our starting score and subtracting each penalty
let startingScore = 100;
let penalties = [5, 5, 15, 10];
let finalScore = penalties.reduce(function(currentScore, penalty){
  return currentScore - penalty;
}, startingScore); // This part can be tricky! startingScore is the second argument to reduce, being passed in after the function, which is the first argument
console.log(finalScore); // 65
```

### Helper Functions
1. Be able to call a custom helper function within your own function. For example, define a function that takes in an array of numbers and returns a new array containing only the primes.
- In order to accomplish complex tasks, it can be helpful to break down the functionality into smaller tasks.
- In this example, we want to filter an array based on whether the element is a prime number.
- It can be more legible for someone reading your code (and for you building out the functionality), to first create the function that determines if an input is prime, then utilize this new function in your filtering process.
```js
// This helper function is constructed separately, allowing us to test our results before building a function that expects this functionality to work.
function isPrime(num){
  // A prime is a number greater than 1 that is only divisible by 1 and itself
  if(num < 2){
    return false;
  }
  // Starting at 2, check each number to see if our original number is divisible by this potential factor
  for(let factor = 2; factor < num; factor++){
    // If our number mod the potential factor is 0, it is divisible, meaning we do not have a prime and can return false
    if (num % factor === 0){
      return false;
    }
  }
  // If we've made it out of the loop without returning false, we've found a prime and return true
  return true;
}

console.log(isPrime(4)) // false
console.log(isPrime(5)) // true
console.log(isPrime(30)) // false
console.log(isPrime(31)) // true
// We tested our helper function and know that it works
// Now we can confidently and cleanly implement a filter based on its results
let nums = [4, 5, 30, 31]
let primes = nums.filter(function(num){
  return isPrime(num);
});
console.log(primes); // [5, 31]
```
