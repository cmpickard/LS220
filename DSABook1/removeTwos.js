// Given the head of a linked list, remove all
// occurrences of the value 2 from the linked list.

// Input:  1 -> 2 -> 3 -> 2 -> 4 -> null
// Output: 1 -> 3 -> 4 -> null

// Input:  2 -> 3 -> 2 -> null
// Output: 3 -> null

// Input:  null
// Output: null
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function removeTwos(head) {
  let curr = head;
  let dummy = new ListNode(null, head);
  let prev = dummy;

  while (curr) {
    if (curr.val === 2) {
      prev.next = curr.next;
    } else {
      prev = curr;
    }
    curr = curr.next;
  }

  return dummy.next;
}

function printLinkedList(head) {
  let current = head;

  do {
    console.log(current.val + ' -> ');
    current = current.next;
  } while (current !== null);
  console.log(null);
}


let head1 = new ListNode(1);
head1.next = new ListNode(2);
head1.next.next = new ListNode(3);
head1.next.next.next = new ListNode(2);
head1.next.next.next.next = new ListNode(4);

let head2 = new ListNode(2);
head2.next = new ListNode(2);
head2.next.next = new ListNode(3);
head2.next.next.next = new ListNode(2);

head1 = removeTwos(head1);
printLinkedList(head1);

head2 = removeTwos(head2);
printLinkedList(head2);
