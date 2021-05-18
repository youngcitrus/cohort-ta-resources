// Write a Stack class that has methods to push, pop, peek, and return the size

class Stack {
	constructor() {
		this.storage = [];
	}

	push(val) {
		this.storage.push(val);
	}

	pop() {
		return this.storage.pop();
	}

	peek() {
		return this.storage[this.storage.length - 1];
	}

	size() {
		return this.storage.length;
	}
}

/*
Big-O Time Analysis:
Inserting an element: O(1), since we are always adding to the top
Deleting an element: O(1), since we are always removing from the top
Searching for an element: O(n), we may have to pop all of our items off of the stack
Accessing an element: O(n), just like search, we may have to traverse all the way down
*/
