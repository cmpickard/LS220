/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
// You are given two non-empty linked lists, l1 and l2, where each represents
// a non-negative integer.

// The digits are stored in reverse order, e.g. the number 123 is represented
// as 3 -> 2 -> 1 -> in the linked list.

// Each of the nodes contains a single digit. You may assume the two numbers
// do not contain any leading zero, except the number 0 itself.

// Return the sum of the two numbers as a linked list.

// Example 1:

// Input: l1 = [1,2,3], l2 = [4,5,6]

// Output: [5,7,9]

// Explanation: 321 + 654 = 975.
// Example 2:

// Input: l1 = [9], l2 = [9]

// Output: [8,1]
// Constraints:

// 1 <= l1.length, l2.length <= 100.
// 0 <= Node.val <= 9

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function addTwoNumbers(head1, head2) {
  let curr1 = head1;
  let curr2 = head2;
  let newDummy = new ListNode();
  let newCurr = newDummy;
  let carry1 = false;

  while (curr1 || curr2) {
    let val1 = curr1 ? curr1.val : 0;
    let val2 = curr2 ? curr2.val : 0;
    let sum = val1 + val2;

    if (carry1) sum += 1;
    carry1 = false;

    if (sum > 9) {
      sum -= 10;
      carry1 = true;
    }

    newCurr.next = new ListNode(sum);
    newCurr = newCurr.next;
    curr1 = curr1 ? curr1.next : null;
    curr2 = curr2 ? curr2.next : null;
  }

  if (carry1) newCurr.next = new ListNode(1);

  return newDummy.next;
}

let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

let head2 = new ListNode(1);
head2.next = new ListNode(1);
head2.next.next = new ListNode(1);
head2.next.next.next = new ListNode(1);
head2.next.next.next.next = new ListNode(6);

console.log(addTwoNumbers(head, head2));