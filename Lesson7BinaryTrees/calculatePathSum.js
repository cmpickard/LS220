/* eslint-disable id-length */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
// Given the root node of a binary tree containing only single-digit
// integers (0-9), implement a function `calculatePathSum` that
// computes the total sum of all root-to-leaf paths.
// A root-to-leaf path is a sequence of nodes from the root to a
// leaf, where each node's value represents a digit in the number
// formed by that path.

// Example 1:
//     5
//    / \
//   3   7
//
// In this tree, there are two root-to-leaf paths:
// 5 -> 3 (representing the number 53)
// 5 -> 7 (representing the number 57)
// The total sum would be 53 + 57 = 110.
//
// Example 2:
//     8
//    / \
//   2   9
//  / \
// 6   4
//
// In this tree, there are three root-to-leaf paths:
// 8 -> 2 -> 6 (representing the number 826)
// 8 -> 2 -> 4 (representing the number 824)
// 8 -> 9 (representing the number 89)
// The total sum would be 826 + 824 + 89 = 1739.

class TreeNode {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

function calculatePathSum(root) {
  let results = [];
  let pathVals = [];

  function traversePath(root) {
    pathVals.push(root.val);

    if (root.left === null && root.right === null) {
      results.push([...pathVals]);
      return;
    }

    if (root.left) {
      traversePath(root.left);
      pathVals.pop();
    }

    if (root.right) {
      traversePath(root.right);
      pathVals.pop();
    }
  }

  traversePath(root);
  return results.map(arr => Number(arr.join(''))).reduce((s, n) => s + n, 0);
}

// Helper function for test cases

function buildTree(arr) {
  if (arr.length === 0) {
    return null;
  }
  const nodes = [];
  const val = arr.shift();
  const root = new TreeNode(val);
  nodes.push(root);
  while (arr.length > 0) {
    const curr = nodes.shift();
    const leftVal = arr.shift();
    if (leftVal !== null) {
      curr.left = new TreeNode(leftVal);
      nodes.push(curr.left);
    }
    if (arr.length > 0) {
      const rightVal = arr.shift();
      if (rightVal !== null) {
        curr.right = new TreeNode(rightVal);
        nodes.push(curr.right);
      }
    }
  }
  return root;
}

// Test Cases

const tree1 = buildTree([8]);
console.log(calculatePathSum(tree1) === 8);

const tree2 = buildTree([5, 3, 7]);
console.log(calculatePathSum(tree2) === 110);

const tree3 = buildTree([2, 8, 4, 3, 9]);
console.log(calculatePathSum(tree3) === 596);

const tree4 = buildTree([6, 2, 8, null, 5]);
console.log(calculatePathSum(tree4) === 693);

const tree5 = buildTree([3, 7, 2, 1, 9, 5, 4, null, null, 6, 8]);
console.log(calculatePathSum(tree5) === 8614);

const tree6 = buildTree([9, 4, 7, null, 1, 3, null, null, 8]);
console.log(calculatePathSum(tree6) === 10391);

// All test cases should log true