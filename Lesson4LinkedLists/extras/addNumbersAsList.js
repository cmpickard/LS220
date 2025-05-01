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
// You are given two non-empty linked lists representing two non-negative
// integers. The digits are stored in reverse order, and each node contains
// a single digit. Implement a function addTwoNumbers that adds the two
// numbers and returns the sum as a linked list.
// You may assume the two numbers do not contain any leading zero, except
// the number 0 itself.

/*
-algorithm:
-- convert each list to a number
  -- HELPER FUNCTION:
    -- let tens = 0;
    -- sum = 0
    -- iterate through list:
      -- sum += node.val * 10 ** tens
    return sum
-- add the numbers that result
-- convert the sum to a list
  -- HELPER FUNCTION
-- return that new list;
*/

function addTwoNumbers(list1, list2) {
  let sum = listToNumber(list1) + listToNumber(list2);
  return numberToList(sum);
}

function listToNumber(list) {
  let tens = 0;
  let sum = 0;

  while (list) {
    sum += list.val * (10 ** tens);
    tens += 1;
    list = list.next;
  }

  return sum;
}

function numberToList(num) {
  let digits = [...String(num)];
  let head = new ListNode(Number(digits[digits.length - 1]));
  let node = head;

  for (let idx = digits.length - 2; idx > -1; idx--) {
    node.next = new ListNode(Number(digits[idx]));
    node = node.next;
  }

  return head;
}

// Test Cases:
// Test Case 1: Basic addition with carrying
// 342 + 465 = 807 (represented as 7->0->8)

let l1 = arrayToList([2, 4, 3]);
let l2 = arrayToList([5, 6, 4]);
console.log(listToArray(addTwoNumbers(l1, l2))); // Expected: [7, 0, 8]

// Test Case 2: Different length lists
// 99 + 1 = 100 (represented as 0->0->1)
let l3 = arrayToList([9, 9]);
let l4 = arrayToList([1]);
console.log(listToArray(addTwoNumbers(l3, l4))); // Expected: [0, 0, 1]

// Test Case 3: Zero value
// 0 + 0 = 0
let l5 = arrayToList([0]);
let l6 = arrayToList([0]);
console.log(listToArray(addTwoNumbers(l5, l6))); // Expected: [0]

// Test Case 4: Larger numbers with multiple carries
// 9999 + 9999 = 19998 (represented as 8->9->9->9->1)
let l7 = arrayToList([9, 9, 9, 9]);
let l8 = arrayToList([9, 9, 9, 9]);
console.log(listToArray(addTwoNumbers(l7, l8))); // Expected: [8, 9, 9, 9, 1]
