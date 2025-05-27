/* eslint-disable id-length */
/* eslint-disable max-statements */
// You are given the beginning of a linked list head, and an integer n.

// Remove the nth node from the end of the list and return the beginning of the
// list.

// Example 1:
// Input: head = [1,2,3,4], n = 2
// Output: [1,2,4]

// Example 2:
// Input: head = [5], n = 1
// Output: []

// Example 3:
// Input: head = [1,2], n = 2
// Output: [2]

// Constraints:
// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function removeNthFromEnd(head, n) {
  let dummy = new ListNode(0, head);
  let count = 0;
  let curr = head;

  while (curr) {
    count += 1;
    curr = curr.next;
  }

  if (count === 1) return null;

  let toDelete = count - n;
  let prev = dummy;
  curr = head;

  while (toDelete > 0) {
    prev = curr;
    curr = curr.next;
    toDelete -= 1;
  }

  prev.next = curr.next;
  return dummy.next;
}

let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);
let head2 = new ListNode(5);
let head3 = new ListNode(1);
head3.next = new ListNode(2);

console.log(removeNthFromEnd(head, 2));
console.log(removeNthFromEnd(head2, 2));
console.log(removeNthFromEnd(head3, 2));