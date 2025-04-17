/* eslint-disable no-unused-vars */
/* eslint-disable max-lines-per-function */
/* eslint-disable id-length */
// Given the root of a binary tree, transform it into a
// linked list-like structure following the tree's nodes
// in a pre-order traversal pattern.

// In the transformed structure, each node's right child points to
// the next node in the traversal, and the left child is always null.
// The order of nodes in the list should match a pre-order
// traversal of the original binary tree.

// The binary tree should be transformed in place.

// Example 1:

// Input: [1,2,3,4,5]
// Equivalent to:

//     1
//    / \
//   2   3
//  / \
// 4   5

// Output: [1,null,2,null,4,null,5,null,3]
// Equivalent to:

//  1
//   \
//    2
//     \
//      4
//       \
//        5
//         \
//          3

// Example 2:

// Input: [1,null,2,3]
// Equivalent to:

//  1
//   \
//    2
//   /
//  3

// Output: [1,null,2,null,3]
// Equivalent to:

//  1
//   \
//    2
//     \
//      3


// Bonus: Can you transform the tree in-place (with O(1) extra space)?

/*
ALGORITHM:
first we need to traverse the tree to find the preorder traversal order of the
elements
then we need to reconfigure the input tree such that it is a linear structure
with all nodes having a right child
*/


function transformWithStack(root) {
  let stack = [];

  function traverse(root) {
    if (root && root.left) {
      if (root.right) stack.push(root.right);
      root.right = root.left;
      root.left = null;
    } else if (stack.length > 0 && !root.right) {
      root.right = stack.pop();
    }

    if (root && root.right) traverse(root.right);
  }

  traverse(root);
  return root;
}


function transformConstantSpace(root) {
  let result = root;

  function traverse(root, tail = null) {
    if (root && root.right) {
      tail = traverse(root.right);
    }

    if (root && root.left) {
      traverse(root.left, tail);
      root.right = root.left;
      root.left = null;
      let curr = root.right;

      while (curr.right) {
        curr = curr.right;
      }
      curr.right = tail;
    }

    return root;
  }

  result = traverse(root);
  return result;
}


function transform(root) {
  let list = preorderTraversal(root);
  return list.forEach((node, idx) => {
    node.left = null;
    let nextNode = list[idx + 1];
    node.right = nextNode ? nextNode : null;
  });
}

function preorderTraversal(root) {
  let result = [];

  function traverse(root) {
    result.push(root);
    if (root && root.left) traverse(root.left);
    if (root && root.right) traverse(root.right);
  }

  if (root) traverse(root);
  return result;
}


class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper function to build a tree from an array
function buildTree(arr) {
  if (arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function treeToArray(root) {
  if (root === null) return [];
  const result = [];
  let current = root;
  while (current) {
    result.push(current.val);
    result.push(current.left === null ? null : current.left.val);
    current = current.right;
  }
  while (result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

function runTest(input) {
  let root = buildTree(input);
  transformConstantSpace(root); // CHANGE THIS TO TEST DIFF SOLUTIONS!
  console.log(treeToArray(root));
}

// Test cases
/*
    1
  2   3
4   5
*/
runTest([1,2,3,4,5]);
// Expected: [1,null,2,null,4,null,5,null,3]

runTest([1,null,2,3]);
// Expected: [1,null,2,null,3]

runTest([1,2,5,3,4,null,6]);
// Expected: [1,null,2,null,3,null,4,null,5,null,6]

runTest([]);
// Expected: []

runTest([1]);
// Expected: [1]

runTest([1,2,3,null,4,5,6]);
// Expected: [1,null,2,null,4,null,3,null,5,null,6]

runTest([1,2,3,4,5,6,7]);
// Expected: [1,null,2,null,4,null,5,null,3,null,6,null,7]

runTest([1,2,null,3,null,4,null,5]);
// Expected: [1,null,2,null,3,null,4,null,5]

runTest([1,null,2,null,3,null,4,null,5]);
// Expected: [1,null,2,null,3,null,4,null,5]