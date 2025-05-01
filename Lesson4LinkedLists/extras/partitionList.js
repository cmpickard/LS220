/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable id-length */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper functions
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

function listToArray(head) {
  const result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}
// Problem Statement:
// Implement a function partition that partitions a linked list around a value x
// such that all nodes less than x come before all nodes greater than or equal
// to x.

// The original relative order of the nodes in each partition should be
// preserved.

function partition(head, pivot) {
  if (!head || !head.next) return null;

  let lessers = new ListNode();
  let firstGreater;
  let greaters = new ListNode();
  let node = head;

  while (node) {
    if (node.val < pivot) {
      lessers.next = node;
      node = node.next;
      lessers = lessers.next;
    } else {
      greaters.next = node;
      node = node.next;
      greaters = greaters.next;
      if (!firstGreater) firstGreater = greaters;
    }
  }

  greaters.next = null;
  lessers.next = firstGreater;
  return head;
}

// Test Cases:
// Test Case 1: Basic partition
let list1 = arrayToList([1, 4, 3, 2, 5, 2]);
console.log(listToArray(partition(list1, 3))); // Expected: [1, 2, 2, 4, 3, 5]

// Test Case 2: All elements less than partition value
let list2 = arrayToList([1, 2, 2, 1]);
console.log(listToArray(partition(list2, 3))); // Expected: [1, 2, 2, 1]

// Test Case 3: All elements greater than or equal to partition value
let list3 = arrayToList([4, 5, 3]);
console.log(listToArray(partition(list3, 3))); // Expected: [4, 5, 3] or possibly rearranged

// Test Case 4: Empty list
let list4 = null;
console.log(listToArray(partition(list4, 3))); // Expected: []