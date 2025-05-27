/* eslint-disable id-length */
/* eslint-disable max-len */
// Definition for a singly linked list node
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper function to create a linked list from an array
function createLinkedList(arr) {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

/**
 * Write a function that finds the middle node of a linked list.
 * If the list has an even number of nodes, return the second of the two middle nodes.
 * You may only traverse the list once.
 *
 * @param {ListNode} head - Head of the linked list
 * @return {ListNode} - The middle node
 */

/*
input: head of linked list
output: node of list
rules:
- traverse the list once
- return middle node
  -- if even number of nodes, then return second of the middle nodes

algorithm:
seems like a slow / fast pointer approach will work?

start both at... head?
then LOOP (while fast and fast.next) (?)
  --advance slow by 1
  --advance fast by 2
end

return slow

1, 2, 3, 4, 5, 6
         S        F

*/

function findMiddleNode(head) {
  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
}

// Test cases
function runTest(arr) {
  const list = createLinkedList(arr);
  const middleNode = findMiddleNode(list);
  const middleIndex = Math.floor(arr.length / 2);

  return middleNode ? middleNode.val === arr[middleIndex] : arr.length === 0;
}

console.log(runTest([1, 2, 3, 4, 5])); // Should return true (middle is node with value 3)
console.log(runTest([1, 2, 3, 4, 5, 6])); // Should return true (middle is node with value 4)
console.log(runTest([1])); // Should return true (only one node)
console.log(runTest([])); // Should return true (empty list)