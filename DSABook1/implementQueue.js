class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.back = null;
  }

  enqueue(val) {
    let newBack = new ListNode(val);
    if (this.back) {
      this.back.next = newBack;
    } else {
      this.front = newBack;
    }
    this.back = newBack;
  }

  dequeue() {
    if (this.front && this.front === this.back) {
      let front = this.front;
      this.front = null;
      this.back = null;
      return front.val;
    } else if (this.front) {
      let front = this.front;
      this.front = this.front.next;
      return front.val;
    } else {
      return null;
    }
  }

  peek() {
    return this.front ? this.front.val : null;
  }
}

let queue = new Queue();
console.log(queue.dequeue()); // null
console.log(queue.peek()); // null

queue.enqueue(1);
console.log(queue.peek()); // 1
console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // null
console.log(queue.peek()); // null

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.peek()); // 1
console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 2
console.log(queue.peek()); // null