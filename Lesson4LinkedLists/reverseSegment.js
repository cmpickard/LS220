/* eslint-disable max-lines-per-function */
// Write a function `reverseSegment` that reverses a segment
// of a singly linked list between two given positions,
// `start` and `end`. The function should take the head of
// the linked list and two integers, `start` and `end`, as
// input and return the modified list.

// The positions `start` and `end` are 1-indexed, and `start`
// is guaranteed to be less than or equal to `end`.

// The list is guaranteed to have at least one node, and `start`
// and `end` are guaranteed to be within the bounds of the list.

// Example:
// Input: head = [1, 3, 5, 7, 9], start = 2, end = 4
// Output: [1, 7, 5, 3, 9]
// Explanation: The segment from position 2 to 4 (3 -> 5 -> 7)
//              is reversed to (7 -> 5 -> 3).

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function printLinkedList(head) {
  let currentNode = head;
  let listStr = '';
  while (currentNode !== null) {
    listStr += currentNode.val + ' -> ';
    currentNode = currentNode.next;
  }
  listStr += 'null';
  console.log(listStr);
}

function createLinkedList(arr) {
  let head = new ListNode(0);
  let current = head;
  arr.forEach(val => {
    current.next = new ListNode(val);
    current = current.next;
  });
  return head.next;
}

/*
input: head, start IDX, end IDX
output: head
rules:
-the output should be the same linked list, but with the nodes between start
and end inclusive in reverse order
-start and end are ONE-INDEXED!!
-start will be less than or equal to end (if equal, nothing needs to be done)
-head will always have one+ nodes.
-start and end will never be out of bounds

ALGORITHM:
can i just write a function inside the main function that takes a sublist
and reverses it?
Sort of

I can pass into that subfunction the TAIL of the list, with head = start

START = 2; END = 4
1 -> 2 -> 3 -> 4 -> 5 -> 6

count = 1
next until count = start
attach node before start to return value from:
  reverseSubList(head, last) {
    head = 2
    last = 4
    2 -> 3 -> 4 -> 5 -> 6
    6 <- 5 <- 2 <- 3 <- 4
    2 needs to point to 5
    then I don't need to mess with 5 at all, when I get there
    2 points to 5 // HOW? 2.next = 2.next.next.next (where the number of nexts
      equals (end - start + 1)?
    3 points to 2
    4 points to 3
    since 4 is the last element I'm reversing
    I can return it as the new head
  }


Output:
1 -> 4 -> 3 -> 2 -> 5

*/

function reverseSegment(head, start, end) {
  function reverseSubList(head, length) {
    if (length === 1) return head;
    let prev = null;
    let currNode = head;
    let counter = 0;
    while (counter < length) {
      let nextNode = currNode.next;
      currNode.next = prev;
      prev = currNode;
      currNode = nextNode;
      head.next = currNode;
      counter += 1;
    }

    return prev;
  }

  let dummy = new ListNode(null, head);
  let currNode = dummy;
  let count = 1;
  while (count < start) {
    count += 1;
    currNode = currNode.next;
  }

  currNode.next = reverseSubList(currNode.next, end - start + 1);
  return dummy.next;
}

let list1 = createLinkedList([1, 3, 5, 7, 9]);
let list2 = createLinkedList([1, 2, 3]);
let list3 = createLinkedList([1]);
let list4 = createLinkedList([1, 2, 3, 4, 5, 6]);
let list5 = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

printLinkedList(reverseSegment(list1, 2, 4)); // Expected: 1 -> 7 -> 5 -> 3 -> 9 -> null
printLinkedList(reverseSegment(list2, 1, 3)); // Expected: 3 -> 2 -> 1 -> null
printLinkedList(reverseSegment(list3, 1, 1)); // Expected: 1 -> null
printLinkedList(reverseSegment(list4, 3, 5)); // Expected: 1 -> 2 -> 5 -> 4 -> 3 -> 6 -> null
printLinkedList(reverseSegment(list5, 4, 7)); // Expected: 1 -> 2 -> 3 -> 7 -> 6 -> 5 -> 4 -> 8 -> 9 -> 10 -> null