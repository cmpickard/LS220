/* eslint-disable id-length */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper function to convert array to linked list
function arrayToList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}
// Problem Statement:
// Implement a function findMiddleNode that returns the middle node of a
// linked list. If the list has an even number of nodes, return the second
// middle node (the one closer to the end).
// Test Cases:

function findMiddleNode(head) {
  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
}

// Test Case 1: Odd number of nodes
let list1 = arrayToList([1, 2, 3, 4, 5]);
console.log(findMiddleNode(list1).val); // Expected: 3

// Test Case 2: Even number of nodes
let list2 = arrayToList([1, 2, 3, 4, 5, 6]);
console.log(findMiddleNode(list2).val); // Expected: 4

// Test Case 3: Single node
let list3 = arrayToList([42]);
console.log(findMiddleNode(list3).val); // Expected: 42

// Test Case 4: Two nodes
let list4 = arrayToList([1, 2]);
console.log(findMiddleNode(list4).val); // Expected: 2