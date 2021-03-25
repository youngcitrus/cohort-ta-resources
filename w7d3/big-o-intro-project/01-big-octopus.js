// Time: O(n^2)
// Space: O(1)

function quadraticBiggestFish(fishes) {
  // Code goes here ...
  let [longestFish, longestLength] = [null, 0];

  for (let i=0; i<fishes.length; i++) {
    let currentLength = 0;
    for (let j=0; j<fishes[i].length; j++) {
      currentLength += 1;
    }
    if (currentLength > longestLength) {
      longestLength = currentLength;
      longestFish = fishes[i];
    }
  }

  return longestFish;
}

// console.log(quadraticBiggestFish(['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish',
//   'ffiiiiisshh', 'fsh', 'fiiiissshhhhhh']));

// Time: O(nlogn)
// Space: O(n)

function nlognBiggestFish(fishes) {
  // sort the array longest to shortest
  fishes.sort((a, b) => b.length - a.length);
  //return the first element
  return fishes[0];
}

// O(n) time
// O(1) space
function linearBiggestFish(fishes) {
  let biggestFish = fishes[0];

  for (let fish of fishes) {
    if (fish.length > biggestFish.length) biggestFish = fish;
  }

  return biggestFish;
}


tilesArray = ["up", "right-up", "right", "right-down", "down", "left-down", "left", "left-up"]
function slowDance(direction, tilesArray) {
  for (let i = 0; i < tilesArray.length; i++) {
    let tile = tilesArray[i];
    if (tile == direction) return i;
  }
}


tilesObj = {
  "up": 0,
  "right-up": 1,
  "right": 2,
  "right-down": 3,
  "down": 4,
  "left-down": 5,
  "left": 6,
  "left-up": 7
}
function fastDance(direction, tilesObj) {
  return tilesObj[direction];
}
