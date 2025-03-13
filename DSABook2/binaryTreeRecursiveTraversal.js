"use strict";
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
// Given the root node of a binary tree, implement a
// function `preorderTraversal` that returns an
// array containing the values of the nodes visited in
// a preorder traversal.

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

// Test Cases:

function preorderTraversal(root) {
  let result = [];

  function processNode(node) {
    result.push(node.val);
    if (node.left !== null) processNode(node.left);
    if (node.right !== null) processNode(node.right);
  }

  processNode(root);
  return result;
}

function inorderTraversal(root) {
  let result = [];

  function processNode(node) {
    if (node.left !== null) processNode(node.left);
    result.push(node.val);
    if (node.right !== null) processNode(node.right);
  }

  processNode(root);
  return result;
}

function postorderTraversal(root) {
  let result = [];

  function processNode(node) {
    if (node.left !== null) processNode(node.left);
    if (node.right !== null) processNode(node.right);
    result.push(node.val);
  }

  processNode(root);
  return result;
}

const tree1 = buildTree([1, null, 2, 3]);
console.log(preorderTraversal(tree1)); // Output: [1, 2, 3]
console.log(inorderTraversal(tree1)); // Output: [1, 3, 2]
console.log(postorderTraversal(tree1)); // Output: [3, 2, 1]

/*
    1
  2   3
     4
       5
*/

const tree2 = buildTree([1, 2, 3, null, null, 4, null, null, 5]);
console.log(preorderTraversal(tree2)); // Output: [1, 2, 3, 4, 5]
console.log(inorderTraversal(tree2)); // Output: [2, 1, 4, 5, 3]
console.log(postorderTraversal(tree2)); // Output: [2, 5, 4, 3, 1]

//       5
//     3   -
//   2  -
// 1  -
const tree3 = buildTree([5, 3, null, 2, null, 1, null]);
console.log(preorderTraversal(tree3)); // Output: [5, 3, 2, 1]
console.log(inorderTraversal(tree3)); // Output: [1, 2, 3, 5]
console.log(postorderTraversal(tree3)); // Output: [1, 2, 3, 5]

//   10
// 5    15
//  6  12 21
//    11
const tree4 = buildTree([10, 5, 15, null, 6, 12, 21, null, null, 11]);
console.log(preorderTraversal(tree4)); // Output: [10, 5, 6, 15, 12, 11, 21]
console.log(inorderTraversal(tree4)); // Output: [5, 6, 10, 11, 12, 15, 21]
console.log(postorderTraversal(tree4)); // Output: [6, 5, 11, 12, 21, 15, 10]