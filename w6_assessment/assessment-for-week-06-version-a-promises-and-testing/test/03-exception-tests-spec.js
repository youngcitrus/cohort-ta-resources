
const { expect } = require('chai');
class Rounder {
  constructor(number) {
    this.number = number;
  }

  roundDown() {
    return null;
  }

  roundUp() {
    return null;
  }

  roundUpToNearest10() {
    return null;
  }
}
/* END_CLASS_ROUNDER */

/**
 * DO NOT CHANGE ANY CODE ABOVE THIS LINE.
 */

describe('Rounder class', () => {
  context('roundDown() method detects bad output when it', () => {
    it('returns a number rounded down to the nearest integer', () => {
    let failed = false;
    try {
      
      // Your code here
      const rounder = new Rounder(3.5);
      expect(rounder.roundDown()).to.equal(3);
      
    
    } catch (e) {
      if (e.actual !== undefined && e.expected !== undefined) {
        failed = true;
      }
    }
    if (!failed) {
      expect.fail('You test did not handle bad output');
    }
});
  });

  context('roundUp() method detects bad output when it', () => {
    it('returns a number rounded up to the nearest integer', () => {
    let failed = false;
    try {
      
      // Your code here
      const rounder = new Rounder(3.5);
      expect(rounder.roundUp()).to.equal(4);
    
    } catch (e) {
      if (e.actual !== undefined && e.expected !== undefined) {
        failed = true;
      }
    }
    if (!failed) {
      expect.fail('You test did not handle bad output');
    }
});
  });

  context('roundUpToNearest10() method method detects bad output when it', () => {
    it('returns the closest multiple of 10 greater than the input', () => {
    let failed = false;
    try {
      
      // Your code here
      const rounder = new Rounder(35);
      expect(rounder.roundUpToNearest10()).to.equal(40);
    
    } catch (e) {
      if (e.actual !== undefined && e.expected !== undefined) {
        failed = true;
      }
    }
    if (!failed) {
      expect.fail('You test did not handle bad output');
    }
});
  });
});


