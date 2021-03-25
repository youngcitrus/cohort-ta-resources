// O(n^2) quadratic time
// O(n) linear space
function firstAnagram(str1, str2) {
  let arr1 = str1.split(""),
    arr2 = str2.split("");

  for (let letter of arr1) {
    let index = arr2.indexOf(letter);
    if (index === -1) return false;
    arr2.splice(index, 1);
  }

  return !arr2.length;
}



// O(n*log(n)) linearithmic time
// O(m+n) linear space, where m and n are lengths of the strings
function secondAnagram(str1, str2) {
  str1 = str1.split("").sort().join("");
  str2 = str2.split("").sort().join("");

  return str1 === str2;
}


function thirdAnagram(str1, str2) {
  // Code goes here ....
}


// O(n) linear time
// O(1) constant space (same logic as above)
function fourthAnagram(str1, str2) {
  let letterSums = {};

  // If we do the exact same subractions for each letter in
  // str2 as we do additions for str1, letter_sums will all be 0.
  str1.split("").forEach((e) => (letterSums[e] = (letterSums[e] || 0) + 1));
  str2.split("").forEach((e) => (letterSums[e] = (letterSums[e] || 0) - 1));

  // It's a zero-sum game!
  return Object.values(letterSums).every((sum) => sum === 0);
}