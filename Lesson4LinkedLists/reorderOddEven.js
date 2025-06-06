// Write a function reorderOddEven that rearranges nodes in
// a singly linked list so that all nodes at odd positions
// are grouped together, followed by all nodes at even positions.

// The function should take the head of the linked list as input
// and return the reordered list. The first node is considered
// to be at an odd position, the second node at an even position,
// and so on.

// Ensure that the relative order of nodes within the odd and
// even groups remains the same as in the original list.
// If the list is empty or contains only one node, return the
// original list.

// Example:
// Input: head = [1, 2, 3, 4, 5]
// Output: [1, 3, 5, 2, 4]
// Explanation: Nodes at odd positions (1, 3, 5) are grouped
//              first, followed by nodes at even positions (2, 4).

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
input: head node
ouput: head node
rules:
-- rearrange nodes so all nodes with odd positions are first and in the original
order, then all nodes at even positions, also with order unchanged
-- the head node has an odd position
-- if head === null or head.next === null, return head

algorithm:
- maybe create two lists in parallel, then link them together at the end

GUARD CLAUSE: return head when head === null or head.next === null or
head.next.next === null

currOdd = head;
evenHead = head.next;
currEven = evenHead;

while (currOdd && currEven)
  nextOdd = currEven.next
  nextEven = currOdd.next
  currOdd.next = nextOdd
  currEven.next = nextEven
  currOdd = nextOdd
  currEven = nextEven
}
  currOdd.next = evenHead

  return head;
*/

function reorderOddEven(head) {
  if (head === null || head.next === null || head.next.next === null) {
    return head;
  }

  let currOdd = head;
  let currEven = head.next;
  let evenHead = head.next;
  while (currEven) {
    let nextOdd = currEven.next;
    let nextEven = nextOdd ? nextOdd.next : null;
    currOdd.next = nextOdd;
    currEven.next = nextEven;
    currEven = nextEven;
    currOdd = nextOdd ? nextOdd : currOdd;
  }

  currOdd.next = evenHead;
  return head;
}

// Test cases
let list1 = createLinkedList([1, 2, 3, 4, 5]);
let list2 = createLinkedList([2, 1, 3, 5, 6, 4, 7]);
let list3 = createLinkedList([1, 2, 3, 4]);
let list4 = createLinkedList([1]);
let list5 = createLinkedList([1, 2]);
let list6 = createLinkedList([]);

console.log("Original lists:");
printLinkedList(list1);
printLinkedList(list2);
printLinkedList(list3);
printLinkedList(list4);
printLinkedList(list5);
printLinkedList(list6);

console.log("\nAfter reordering odd and even positions:");
printLinkedList(reorderOddEven(list1)); // Expected: 1 -> 3 -> 5 -> 2 -> 4 -> null
printLinkedList(reorderOddEven(list2)); // Expected: 2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4 -> null
printLinkedList(reorderOddEven(list3)); // Expected: 1 -> 3 -> 2 -> 4 -> null
printLinkedList(reorderOddEven(list4)); // Expected: 1 -> null
printLinkedList(reorderOddEven(list5)); // Expected: 1 -> 2 -> null
printLinkedList(reorderOddEven(list6)); // Expected: null