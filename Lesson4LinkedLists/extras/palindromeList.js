/* eslint-disable id-length */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper function to convert array to linked list
function arrayToList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}
// Problem Statement:
// Implement a function isPalindrome that determines if a linked list is a
// palindrome. A palindrome is a sequence that reads the same forward and
// backward. The function should return true if the linked list is a
// palindrome, and false otherwise.

function isPalindrome(head) {
  let nums = '';

  while (head) {
    nums += String(head.val);
    head = head.next;
  }

  return nums === [...nums].reverse().join('');
}

// Test Cases:
// Test Case 1: Even-length palindrome
let list1 = arrayToList([1, 2, 2, 1]);
console.log(isPalindrome(list1)); // Expected: true

// Test Case 2: Odd-length palindrome
let list2 = arrayToList([1, 2, 3, 2, 1]);
console.log(isPalindrome(list2)); // Expected: true

// Test Case 3: Not a palindrome
let list3 = arrayToList([1, 2, 3]);
console.log(isPalindrome(list3)); // Expected: false

// Test Case 4: Single node (trivial palindrome)
let list4 = arrayToList([5]);
console.log(isPalindrome(list4)); // Expected: true

// Test Case 5: Empty list (trivial palindrome)
let list5 = null;
console.log(isPalindrome(list5)); // Expected: true