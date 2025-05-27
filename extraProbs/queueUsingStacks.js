/* eslint-disable max-statements */
/* eslint-disable max-len */
/**
 * Implement a Queue data structure using only Stack operations.
 * A Stack has the following operations: push(element), pop(), peek(), and isEmpty().
 * Your Queue should support the operations: enqueue(element), dequeue(), peek(), and isEmpty().
 *
 * Your implementation should use only two stacks and should achieve O(1) amortized time complexity for each operation.
 */
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

class QueueUsingStacks {
  constructor() {
    this.stack1 = new Stack();
    this.stack2 = new Stack();
  }

  // Add an element to the back of the queue
  enqueue(element) {
    while (this.stack1.size() !== 0) {
      this.stack2.push(this.stack1.pop());
    }

    this.stack2.push(element);

    while (this.stack2.size() !== 0) {
      this.stack1.push(this.stack2.pop());
    }
  }

  // Remove and return the element at the front of the queue
  dequeue() {
    if (this.stack1.size() === 0) return null;

    return this.stack1.pop();
  }

  // Return the element at the front of the queue without removing it
  peek() {
    return this.stack1.peek();
  }

  // Check if the queue is empty
  isEmpty() {
    return this.stack1.isEmpty();
  }

  // Return the number of elements in the queue
  size() {
    return this.stack1.size();
  }
}

// Test cases
function testQueue() {
  const queue = new QueueUsingStacks();

  // Test isEmpty on empty queue
  console.log(queue.isEmpty() === true);

  // Test enqueue
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  // Test peek
  console.log(queue.peek() === 1);

  // Test size
  console.log(queue.size() === 3);

  // Test dequeue
  console.log(queue.dequeue() === 1);
  console.log(queue.dequeue() === 2);

  // Test size after dequeue
  console.log(queue.size() === 1);

  // Test queue operations in sequence
  queue.enqueue(4);
  console.log(queue.dequeue() === 3);
  console.log(queue.peek() === 4);
  queue.enqueue(5);
  console.log(queue.size() === 2);
  console.log(queue.dequeue() === 4);
  console.log(queue.dequeue() === 5);
  console.log(queue.isEmpty() === true);
}

testQueue();