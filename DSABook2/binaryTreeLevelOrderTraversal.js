/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
"use strict";
// Given the root node of a binary tree, implement a
// function `bfs` that returns an array containing the
// values of the nodes visited in level order
// (or breadth-first-search) traversal.

class Node {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

// Helper function for test cases
function buildTree(arr) {
  if (arr.length === 0) {
    return null;
  }

  const nodes = [];

  const val = arr.shift();
  const root = new Node(val);
  nodes.push(root);

  while (arr.length > 0) {
    const curr = nodes.shift();

    const leftVal = arr.shift();
    if (leftVal !== null) {
      curr.left = new Node(leftVal);
      nodes.push(curr.left);
    }

    if (arr.length > 0) {
      const rightVal = arr.shift();
      if (rightVal !== null) {
        curr.right = new Node(rightVal);
        nodes.push(curr.right);
      }
    }
  }

  return root;
}

/*
      1
  2       3
4   5   6   7
   8 9    10 11
[1]
from 1 add 2 then 3
from 2: add 4 then 5
from 3: add 6 then 7

[1,2,3,4,5,6,7,8,9,10,11]


*/

function bfs(root) {
  let result = [];
  let queue = [root];

  while (queue.length > 0) {
    let nextNode = queue.pop();
    result.push(nextNode.val);
    if (nextNode.left) queue.unshift(nextNode.left);
    if (nextNode.right) queue.unshift(nextNode.right);
  }

  return result;
}

// Test cases
const tree1 = buildTree([1, null, 2, 3]);
console.log(bfs(tree1)); // Output: [1, 2, 3]

const tree2 = buildTree([1, 2, 3, null, null, 4, null, null, 5]);
console.log(bfs(tree2)); // Output: [1, 2, 3, 4, 5]

const tree3 = buildTree([5, 3, null, 2, null, 1, null]);
console.log(bfs(tree3)); // Output: [5, 3, 2, 1]

const tree4 = buildTree([10, 5, 15, null, 6, 12, 21, null, null, 11]);
console.log(bfs(tree4)); // Output: [10, 5, 15, 6, 12, 21, 11]