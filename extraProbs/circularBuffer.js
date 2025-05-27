/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/**
 * Implement a circular buffer data structure.
 * A circular buffer is a fixed-size buffer that works as if the memory is contiguous and circular.
 * When the buffer is full, writing new data overwrites the oldest data.
 *
 * Your implementation should support the following operations:
 * - enqueue(item): Add an item to the buffer
 * - dequeue(): Remove and return the oldest item from the buffer
 * - peek(): Return the oldest item without removing it
 * - isFull(): Return true if the buffer is full
 * - isEmpty(): Return true if the buffer is empty
 * - size(): Return the current number of items in the buffer
 */
class CircularBuffer {
  constructor(capacity) {
    this.queue = [];
    this.capacity = capacity;
  }

  enqueue(item) {
    if (this.isFull()) {
      this.queue.shift();
    }

    this.queue.push(item);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.queue.shift();
  }

  peek() {
    return this.isEmpty() ? null : this.queue[0];
  }

  isFull() {
    return this.queue.length === this.capacity;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  size() {
    return this.queue.length;
  }
}

// Test cases
function testCircularBuffer() {
  const buffer = new CircularBuffer(3);

  console.log(buffer.isEmpty() === true);
  console.log(buffer.isFull() === false);

  buffer.enqueue('A');
  console.log(buffer.peek() === 'A');
  console.log(buffer.size() === 1);

  buffer.enqueue('B');
  buffer.enqueue('C');
  console.log(buffer.isFull() === true);
  console.log(buffer.size() === 3);

  console.log(buffer.dequeue() === 'A');
  console.log(buffer.size() === 2);
  console.log(buffer.isFull() === false);

  buffer.enqueue('D');
  console.log(buffer.isFull() === true);

  buffer.enqueue('E'); // This should overwrite 'B'
  console.log(buffer.dequeue() === 'C');
  console.log(buffer.dequeue() === 'D');
  console.log(buffer.dequeue() === 'E');
  console.log(buffer.isEmpty() === true);
}

testCircularBuffer();