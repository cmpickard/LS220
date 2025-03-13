// In this assignment, your goal is to implement a stack using a singly linked
// list. We'll provide you with a template to help you get started. You might
// recognize the class ListNode from the Linked List assignment. We encourage
// you to implement the stack independently but feel free to reference our
// walkthrough if you need guidance.

// the push method should take a value (and not a ListNode)
// the pop method should return teh current top value, or null if the stack
// is empty

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(value) {
    this.top = new ListNode(value, this.top);
  }

  pop() {
    // remove top from stack
    let popped = this.top;
    this.top = this.top ? this.top.next : null;
    return popped ? popped.val : null;

  }

  peek() {
    return this.top ? this.top.val : null;
  }
}

// let node1 = new ListNode(1);
// let node2 = new ListNode(2);
// let node3 = new ListNode(3);
let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek()); // 3
console.log(stack.pop()); // 3
console.log(stack.peek()); // 2
console.log(stack.pop()); // 2
console.log(stack.peek()); // 1
console.log(stack.pop()); // 1
console.log(stack.peek()); // null
console.log(stack.pop()); // null