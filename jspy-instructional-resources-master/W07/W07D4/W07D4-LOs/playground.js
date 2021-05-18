/*
Stacks and queues are just tracking ordered groups of elements and defining
specific ways we want to be able to interact with them.
*/

/*
this.head: [a]
this.tail: [d]

newNode = [1]

newNode.next = this.head
this.head = newNode

[a] => [b] => [c] => [d] =>


[1] => [a] => [b] => [c] => [d] =>

*/

// Stack:
// [a] => [b] => [c] =>
//  ^
// this.top: [a]
// this.length: 3

// Nodes:
// [a]
// this.value: a
// this.next: [b]

// [b]
// this.value: b
// this.next: [c]

// [c]
// this.value: c
// this.next: null
