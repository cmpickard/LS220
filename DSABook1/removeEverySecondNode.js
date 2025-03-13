// In this problem, you need to implement a function
// `removeEverySecondNode` that accepts a singly linked list
// as an argument. The function should remove every alternate
// node, starting with the second node.

class LinkNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function printLinkedList(head) {
  let curr = head;
  let list = [];
  while (curr) {
    list.push(curr.val);
    curr = curr.next;
  }

  list.push('null');
  console.log(list.join(' -> '));
}

function removeEverySecondNode(head) {
  let removeSwitch = true;
  let curr = head.next;
  let prev = head;

  while (curr) {
    if (removeSwitch) {
      prev.next = curr.next;
    }
    prev = curr;
    curr = curr.next;
    removeSwitch = !removeSwitch;
  }

  return head;
}

let head1 = new LinkNode(1);
head1.next = new LinkNode(2);
head1.next.next = new LinkNode(3);
head1.next.next.next = new LinkNode(4);
head1.next.next.next.next = new LinkNode(5);
head1.next.next.next.next.next = new LinkNode(6);
head1.next.next.next.next.next.next = new LinkNode(7);
head1.next.next.next.next.next.next.next = new LinkNode(8);

printLinkedList(head1);
head1 = removeEverySecondNode(head1);
printLinkedList(head1);