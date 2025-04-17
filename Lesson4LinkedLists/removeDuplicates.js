// Write a function `removeDuplicates` that removes all
// nodes with duplicate values from a sorted linked list,
// leaving only distinct values from the original list.
// The function should take the head of the sorted linked
// list as input and return the modified list. The list
// should remain sorted after removing duplicates. If the
// list becomes empty after removing all duplicates,
// return null.

// Example:
// Input: head = [1, 2, 2, 3, 3, 4, 5, 5]
// Output: [1, 4]
// Explanation: The values 2, 3, and 5 appear multiple times, so
//              they are removed. Only 1 and 4 remain as unique
//              values.

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
input: head
output: head of mutated linked list

rules:
-- if linked list ends up empty, return null
-- if more than one of a value appears all instance of the value should be
removed from the linked list
-- the input will be sorted and should remain sorted

algorithm:
initialize dummy
  dummy.next = head

let prev = dummy // use as the most-recent attachement point

let currNode = head;

WHILE LOOP -- while (currNode)
  let currVal = currNode.val
  if (currVal === currNode.next.val) {
    find the first occurence of a new value, set currNode to that Node, update
    currVal to that val
    do not attach prev to anything
  } else {
    prev.next = currNode
    prev = currNode
    currNode = currNode.next
  }
*/

function removeDuplicates(head) {
  let dummy = new ListNode();
  let prev = dummy;
  let currNode = head;
  while (currNode) {
    let currVal = currNode.val;
    if (currNode.next && currVal === currNode.next.val) {
      while (currNode && currNode.val === currVal) {
        currNode = currNode.next;
      }
    } else {
      prev.next = currNode;
      prev = currNode;
      currNode = currNode.next;
    }
  }

  prev.next = null;

  return dummy.next;
}

let list1 = createLinkedList([1, 4, 5, 5]);
let list2 = createLinkedList([1, 1, 1, 2, 3]);
let list3 = createLinkedList([1, 2, 3, 4, 5]);
let list4 = createLinkedList([1, 1, 1, 1, 1]);
let list5 = createLinkedList([1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5]);

printLinkedList(removeDuplicates(list1)); // Expected: 1 -> 4 -> null
printLinkedList(removeDuplicates(list2)); // Expected: 2 -> 3 -> null
printLinkedList(removeDuplicates(list3)); // Expected: 1 -> 2 -> 3 -> 4 -> 5 -> null
printLinkedList(removeDuplicates(list4)); // Expected: null
printLinkedList(removeDuplicates(list5)); // Expected: 1 -> null