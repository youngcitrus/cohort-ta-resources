const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
/**
 * In this file, you will test the class Rounder and its methods. The outline of
 * the expected tests is provided for you in describe/it format.
 *
 * NOTE: Put your tests in this file, not in the file in the test directory!
 *
 * DO NOT CHANGE THE ROUNDER CLASS PROVIDED!!!
 *
 */

/* BEGIN_CLASS_ROUNDER */
class Rounder {
  constructor(number) {
    this.number = number;
  }

  roundDown() {
    return Math.floor(this.number);
  }

  roundUp() {
    return Math.ceil(this.number);
  }

  roundUpToNearest10() {
    return (Math.floor(this.number / 10) + 1) * 10;
  }
}
/* END_CLASS_ROUNDER */

/**
 * DO NOT CHANGE ANY CODE ABOVE THIS LINE.
 */

describe('Rounder class', () => {
  context('roundDown() method', () => {
    it('returns a number rounded down to the nearest integer', () => {
      // Your code here
      const rounder = new Rounder(3.5);
      expect(rounder.roundDown()).to.equal(3);
      
    });
  });

  context('roundUp() method', () => {
    it('returns a number rounded up to the nearest integer', () => {
      // Your code here
      const rounder = new Rounder(3.5);
      expect(rounder.roundUp()).to.equal(4);
    });
  });

  context('roundUpToNearest10() method', () => {
    it('returns the closest multiple of 10 greater than the input', () => {
      // Your code here
      const rounder = new Rounder(35);
      expect(rounder.roundUpToNearest10()).to.equal(40);
    });
  });
});