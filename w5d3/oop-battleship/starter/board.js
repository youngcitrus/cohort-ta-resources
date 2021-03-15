class Board {
  constructor(numRows, numCols, numShips) {
    if (numShips > numRows * numCols) {
      throw "Too many ships for board size!"
    }
    // TODO: Set up constructor that sets the numRows, numCols, and numShips.
    // TODO: Set this.grid equal to the return value of the instance method
    // populateGrid().
    this.grid = this.populateGrid(numRows, numCols, numShips);
  }

  populateGrid(numRows, numCols, numShips) {
    // TODO: Using the instance variables numRows, numCols, and numShips, return
    // a 2D array representing the state of the board.
    const grid = new Array(numRows);
    const shipPositions = this.randomShipPositions(numRows, numCols, numShips);
    console.log(shipPositions);
    
    for (let i=0; i<grid.length; i++) {
      grid[i] = new Array(numCols).fill(null)
    }
    for (let [x,y] of shipPositions) {
      grid[x][y] = "s";
    }
    return grid;
  }

  randomShipPositions(numRows, numCols, numShips) {
    const positions = [];
    for (let i=0; positions.length < numShips; i++) {
      const new_position = [Board.getRandomNumber(numRows), Board.getRandomNumber(numCols)];
      if (Board.isUniquePosition(new_position, positions)) {
        positions.push(new_position);
      }
    }
    return positions;
  }

  static getRandomNumber(max) {
    return Math.floor(Math.random() * max)
  }

  static isUniquePosition(pos, positionArray) {
    for (let currentPosition of positionArray) {
      if (currentPosition[0] === pos[0] && currentPosition[1] === pos[1]) {
        return false;
      }
    }
    return true;
  }

  display() {
    // TODO: Print the game board with marks on any spaces that have been fired
    // upon. Be sure not to display the unhit ships to the user! Hint: you might
    // be able to use console.table()

  }

  count() {
    // TODO: Return the number of valid targets (ships) remaining.
  }

  isValidMove(pos) {
    // TODO: Take in an attack position (in the form of an array [row, col]) and
    // return true if the position is a valid move.
  }

  isGameOver() {
    // TODO: Return true if the game is over (when all ships are hit).
    return this.count === 0;
  }

  attack(pos) {
    // TODO: Take in an attack position in the form of an array, [row, col], as
    // a parameter. Update this.grid depending on if the position is an empty
    // space or a damaged ship.
    let [row, col] = pos;
    if (this.grid[row][col] === 's') {
      this.grid[row][col] = 'x';
      console.log("Direct hit!");
      return true;
    } else if (this.grid[row][col] === null) {
      console.log("You missed!");
      return true;
    } else {
      console.log("You already fired there!");
      return false;
    }
  }
}

const board = new Board(3,1,3);
console.log(board.grid);

// console.log(Board.isUniquePosition([4,4], [[0,0],[1,1]]));

module.exports = Board;
