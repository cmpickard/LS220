class LinkNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function printLinkedList(head) {
  let curr = head;
  while (curr) {
    console.log(curr.val + '->');
    curr = curr.next;
  }
  console.log('null');
}

function reverseLinkedList(head) {
  let curr = head;
  let prev = null;
  let next;
  while (curr) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

let head1 = new LinkNode(1);
head1.next = new LinkNode(2);
head1.next.next = new LinkNode(3);
head1.next.next.next = new LinkNode(4);

printLinkedList(head1);
head1 = reverseLinkedList(head1);
printLinkedList(head1);