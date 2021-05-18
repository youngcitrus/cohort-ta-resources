## POJOs and Pair Programming (W2D2) - Learning Objectives

### Plain Old JavaScript Objects
1. Label variables as either Primitive vs. Reference
- We have five primitive types in JavaScript:
  - `Boolean` - `true` and `false`
  - `Null` - represents the intentional absence of value.
  - `Undefined` - default return value for many things in JavaScript.
  - `Number` - like the numbers we usually use (`15`, `4`, `42`)
  - `String` - ordered collection of characters (`'apple'`)
- And one reference type:
  - `Object` - this also includes arrays
- Primitive types are immutable, meaning they cannot change. We can reassign variables to point to new values, but the values themselves have a fixed place in memory, with reassignment just changing where our variables point.
- Reference types are mutable. Their values can change. We can add new elements to arrays, change the values that keys point to in an object, etc. These changes do not change where our variables point to, but change the values themselves.

2. Identify when to use `.` vs `[]` when accessing values of an object
- Using `.` means that we are looking for a key specifically with the name that follows `.`. For example, `myObj.name` is going to look for a key called `name`.
- Using `[]` evaluates whatever is inside the brackets before looking for a key with that name. For example, if we have a variable `let attribute = 'favoriteColor'`, using `myObj[attribute]` will evaluate `attribute`, resulting in `'favoriteColor'`, then look for a key called `favoriteColor` on `myObj`

3. Use the `obj[key] !== undefined` pattern to check if a given variable that contains a key exists in an object
- When we try to use a key that does not exist on an object, the return value is `undefined`. We can use this pattern to check if a key exists:
```js
const key1 = 'name';
const key2 = 'superPower';
const myObj = {
  name: 'Bill',
  job: 'Web Developer'
};

if (myObj[key1] !== undefined){
  console.log("My " + key1 + " is " + myObj[key1])
} else {
  console.log("Key " + key1 + " does not exist.")
}

if (myObj[key2] !== undefined){
  console.log("My " + key2 + " is " + myObj[key2])
} else {
  console.log("Key " + key2 + " does not exist.")
}

// Extra! How could we combine these keys or checks to simplify this code?
// Arrays and loops may help us...
```

4. Utilize `Object.keys` and `Object.values` in a function
- `Object.keys` returns an array of all of the keys in an object. We can use them directly, or use them to key into the object and get the associated values:
```js
const cup = {color: "Red", contents: "coffee", weight: 5};

const cupKeys = Object.keys(cup);

console.log("The cup object has the following key/value pairs:");
cupKeys.forEach(function(key){
  console.log("Key: " + key + ", Value: " + cup[key]);
})
```
- `Object.values` returns an array of all of the values in an object. Since we can't work backwards and find a key by the value (very easily, at least), we generally only would use this method if we don't care about the keys at all, just the values:
```js
const cup = {color: "Red", contents: "coffee", weight: 5};

const cupValues = Object.values(cup);

console.log("The cup object has the following values:");
cupValues.forEach(function(value){
  console.log("Value: " + cup[key]);
})
```

5. Iterate through an object using a `for in` loop
- The `for in` syntax allows us to iterate through each key of an object. It can be a simpler implementation than using the `Object.keys` method and then iterating like we saw above:
```js
const cup = {color: "Red", contents: "coffee", weight: 5};

console.log("The cup object has the following key/value pairs:");
for(let key in cup){
  console.log("Key: " + key + ", Value: " + cup[key]);
}
```

6. Define a function that utilizes `...`rest syntax to accept an arbitrary number of arguments
- The rest operator will collect all arguments into an array, which we can then utilize in our function however we need.
- In this example, we collect any number of arguments and add them together:
```js
function addAll(...nums){
  let sum = 0;
  for (let i = 0; i < nums.length; i++){
    sum += nums[i]
  }
  return sum;
  // We can implement this functionality many ways! `reduce` would make this super slick...
}

console.log(addAll(1, 2, 3, 4)) // 10
console.log(addAll(100, 100)) // 200
```

7. Use `...`spread syntax for Object literals and Array literals
- The spread operator can be used for arrays and objects to break them down into their individual elements.
- This can be useful for adding a collection of elements into another collection:
```js
// With arrays
let numArray = [1, 2, 3];
let moreNums = [...numArray, 4, 5, 6];

// Or POJOs
let colors = { red: "scarlet", blue: "aquamarine" };
let colors2 = { green: "forest", yellow: "sunflower" };
let moreColors = { purple: "mauve", ...colors, ...colors2 };
```
- It can also be used to spread an array into individual arguments for a function:
```js
function speak(verb, noun) {
  return "I like to go " + verb + " with " + noun + ".";
}

const words = ["running", "Jet"];

console.log(speak("running", "Jet")); // => I like to go running with Jet.
console.log(speak(...words)); // => I like to go running with Jet.
```

8. Destructure an array to reference specific elements
- We can create new variables to reference specific elements from an array using `[]`:
```js
let numArray = [10, 20];

// here we are "unpacking" the array values into two separate variables
let [firstEl, secondEl] = numArray;

console.log(firstEl); //=> 10
console.log(secondEl); //=> 20
```
- We can similarly destructure a nested array as well:
```js
let numArray = [1, [20, 30, [400]]]
// We unpack the elements by matching the nesting structure
let [firstEl, [secondNestedEl, thirdNestedEl, [fourthDoubleNestedEl]]] = numArray

console.log(firstEl); // 1
console.log(secondNestedEl); // 20
console.log(thirdNestedEl); // 30
console.log(fourthDoubleNestedEl); // 400

// Alternatively, if we unpacked like in the first example, we could get two elements, our first `1`, and our second element being the nested array
let [altFirstEl, altSecondEl] = numArray;

console.log(altFirstEl); // 1
console.log(altSecondEl); // [20, 30, [400]]
```

9. Destructure an object to reference specific values
- We can create new variables to reference specific elements from an object using `{}`:
```js
// Here we're only unpacking the variables a and c
let { a, c } = { a: 1, b: 2, c: 3 };
a; //=> 1
c; //=> 3
```
- We can unpack the variables as a new name by using the `{key: newName}` syntax:
```js
let { a: newA, c: newC } = { a: 1, b: 2, c: 3 };
newA; //=> 1
newc; //=> 3
a; //=> ReferenceError
c; //=> ReferenceError
```
- We can similarly destructure a nested object by matching the nesting structure:
```js
let user = {
  userId: 1,
  favoriteAnimal: "hippo",
  fullName: {
    fname: "Rose",
    lname: "K"
  }
};

// accessing values *with* destructuring
// I added in fullName as well to show that we can gain access to both the nested data as well as the object overall
let {
  userId,
  fullName,
  fullName: { fname, lname }
} = user;

console.log(userId, fname, lname); // 1 "Rose" "K"
console.log(fullName); // { fname: "Rose", lname: "K" }
```

10. Write a function that accepts an array as an argument and returns an object representing the count of each character in the array
```js
function countChars(charsArray){
  const charObj = {};
  // iterate through each character in the array
  for (let i = 0; i < charsArray.length; i++){
    const char = charsArray[i];
    // if we've already encountered this character, increment its count
    if (char in charObj){
      charObj[char]++;
    // otherwise, we haven't seen this character yet, so add the key with a value of 1
    } else {
      charObj[char] = 1;
    }
  }
  return charObj;
}

console.log(countChars(['h','e','l','l','o','w','o','r','l','d'])) 
// {h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1}
console.log(countChars(['a','r','r','a','y','s','a','r','e','c','o','o','l'])) 
// {a: 3, r: 3, y: 1, s: 1, e: 1, c: 1, o: 2, l: 1}
```
