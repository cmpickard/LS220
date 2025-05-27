/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
// You are given the head of a linked list of length n. Unlike a singly
// linked list, each node contains an additional pointer random, which may
// point to any node in the list, or null.

// Create a deep copy of the list.

// The deep copy should consist of exactly n new nodes, each including:

// The original value val of the copied node
// A next pointer to the new node corresponding to the next pointer of the
// original node
// A random pointer to the new node corresponding to the random pointer of
// the original node
// Note: None of the pointers in the new list should point to nodes in the
// original list.

// Return the head of the copied linked list.

// In the examples, the linked list is represented as a list of n nodes. Each
// node is represented as a pair of [val, random_index] where random_index
// is the index of the node (0-indexed) that the random pointer points to, or
// null if it does not point to any node.

// Example 1:
// Input: head = [[3,null],[7,3],[4,0],[5,1]]
// Output:[[3,null],[7,3],[4,0],[5,1]]


// Example 2:
// Input: head = [[1,null],[2,2],[3,2]]
// Output: [[1,null],[2,2],[3,2]]

// Constraints:
// 0 <= n <= 100
// -100 <= Node.val <= 100
// random is null or is pointing to some node in the linked list.

/*
input: head
output: new head
rules:
-each node in input will point to next node AND point to a random other node
or null
-return the head of a deep copy of the input linked list

algorithm:
-scan through the input and create a Map with the node as key and it's position
as the value
-scan through the input and make an array where each element corresponds to the
number of the random node it points to -- using the previous Map to identify
the position of the node that the random pointer points to
-construct a new list, in the usual way, leaving the random pointers blank,
as you go, create another Map like the first?
-scan through the new list and attach the random pointers to the correct node
using the map


*/

class ListNode {
  constructor(val = 0, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

function deepCopyRandomList(head) {
  let listMap = new Map();
  let curr = head;
  let listIdx = 0;

  while (curr) {
    listMap.set(curr, [curr.val, listIdx]);
    curr = curr.next;
    listIdx++;
  }

  curr = head;
  while (curr) {
    let points = listMap.get(curr.random) ? listMap.get(curr.random)[1] : null;
    listMap.get(curr).push(points);
    curr = curr.next;
  }

  curr = head;
  let newHead = new ListNode(listMap.get(curr)[0]);
  curr = curr.next;
  let newCurr = newHead;
  let newListArr = [newCurr];

  while (curr) {
    newCurr.next = new ListNode(listMap.get(curr)[0]);
    newCurr = newCurr.next;
    newListArr.push(newCurr);
    curr = curr.next;
  }

  curr = head;
  newCurr = newHead;

  while (curr) {
    let randomVal = newListArr[listMap.get(curr)[2]];
    if (randomVal === undefined) randomVal = null;
    newCurr.random = randomVal;
    curr = curr.next;
    newCurr = newCurr.next;
  }

  return newHead;
}

// Input: head = [[3,null],[7,3],[4,0],[5,1]]
// Output:[[3,null],[7,3],[4,0],[5,1]]
let head = new ListNode(3);
head.next = new ListNode(7);
head.next.next = new ListNode(4);
head.next.next.next = new ListNode(5);
head.next.random = head.next.next.next;
head.next.next.random = head;
head.next.next.next.random = head.next;
console.log(deepCopyRandomList(head));