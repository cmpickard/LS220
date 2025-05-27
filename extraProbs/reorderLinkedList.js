/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
// You are given the head of a singly linked-list.

// The positions of a linked list of length = 7 for example, can
// intially be represented as:

// [0, 1, 2, 3, 4, 5, 6]

// Reorder the nodes of the linked list to be in the following order:

// [0, 6, 1, 5, 2, 4, 3]

// Notice that in the general case for a list of length = n the nodes are
// reordered to be in the following order:

// [0, n-1, 1, n-2, 2, n-3, ...]

// You may not modify the values in the list's nodes, but instead you must
// reorder the nodes themselves.

// Example 1:
// Input: head = [2,4,6,8]

// Output: [2,8,4,6]


// Example 2:
// Input: head = [2,4,6,8,10]

// Output: [2,10,4,8,6]


// Constraints:

// 1 <= Length of the list <= 1000.
// 1 <= Node.val <= 1000

// You should aim for a solution with O(n) time and O(1) space,
// where n is the length of the given list.

/*
input: head
output: head

rules:
-the input list should be reordered in the following way:
  input: [0,1,2,3,4,5]
  output: [0,5,1,4,2,3]
  -- start with the first, then last, then second, then second-last, etc.
- space complexity should be O(1) so no creating a second list


alg:
-go halfway out to the end of the list, then reverse the  backhalf, then inter-
leave the front and back?
  -- how would I find halfway, though?
  -- run through the list once to count the number of nodes, then calc which
  node would be the halfway point node, then proceed

  input: [0,1,2,3,4,5]
  output: [0,5,1,4,2,3]

  input: [0,1,2,3,4,5,6]
  output: [0,6,1,5,2,4,3]

  1) run through list and cuotn # of nodes
    - splitAfter = math.floor((numNodes + 1) / 2)
  2) run through list and detach back half after seeing splitAfter nodes
  3) reverse backHalf
  4) interleave backHalf and frontHalf
  5) return head;

*/

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reorderList(head) {
  function reverse(head) {
    let curr = head;
    let next = curr.next;
    let prev = null;

    while (curr) {
      curr.next = prev;
      prev = curr;
      curr = next;
      if (curr) next = curr.next;
    }

    return prev;
  }

  let curr = head;
  let count = 0;
  while (curr) {
    curr = curr.next;
    count += 1;
  }

  let splitAfter = Math.floor((count + 1) / 2);
  curr = head;
  while (splitAfter > 0) {
    curr = curr.next;
    splitAfter -= 1;
  }

  let backHalf = reverse(curr);
  let frontHalf = head.next;
  curr = head;

  while (backHalf) {
    curr.next = backHalf;
    backHalf = backHalf.next;
    curr = curr.next;
    curr.next = frontHalf;
    frontHalf = frontHalf.next;
    curr = curr.next;
  }

  curr.next = frontHalf ? frontHalf : null;
  if (curr.next) curr.next = null;

  return head;
}

let head1 = new ListNode(2);
head1.next = new ListNode(4);
head1.next.next = new ListNode(6);
head1.next.next.next = new ListNode(8);
head1.next.next.next.next = new ListNode(10);
head1.next.next.next.next.next = new ListNode(12);
head1.next.next.next.next.next.next = new ListNode(14);

console.log(reorderList(head1));