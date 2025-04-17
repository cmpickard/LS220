/* eslint-disable id-length */
// Given the root of a binary tree, return an array of the node
// values visible when the tree is viewed from the right side.

// Example 1:

//    1
//   / \
//  2   3
//   \   \
//    5   4

// Input: [1,2,3,null,5,null,4]
// Output: [1,3,4]

// Example 2:

//    1
//     \
//      3

// Input: [1,null,3]
// Output: [1,3]

/*
RULES:
-is it that at each level of the tree, we want our output to include the
rightmost elment from that level?
-the root node will always be the first element of our output
-the index of each element in the output corresponds to the tree level and the
value at that index is the right most value at that tree level

ALGORITHM:
-this seems like a natural fit for a BFS. We want to go one level at a time and
determine which node is the rightmost, then add the value at that node to the
output arr. Then onto the next level, etc.

-what i'm not sure about is how to keep track of which level each node is at.
*/

function visibleNodes(root) {
  if (!root) return [];
  let result = [];
  let queue = [];

  function traverse(root, currLevel) {
    if (root) {
      let nextLevel = queue.length > 0 ? queue.slice(-1)[0][1] : Infinity;
      if (nextLevel > currLevel) result.push(root.val);
      if (root.left) queue.unshift([root.left, currLevel + 1]);
      if (root.right) queue.unshift([root.right, currLevel + 1]);
    }

    if (queue.length > 0) {
      traverse(...queue.pop());
    }
  }

  traverse(root, 0);
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

// Test cases
console.log(visibleNodes(buildTree([1,2,3,null,5,null,4]))); // Expected: [1,3,4]
console.log(visibleNodes(buildTree([1,null,3]))); // Expected: [1,3]
console.log(visibleNodes(buildTree([]))); // Expected: []
console.log(visibleNodes(buildTree([1,2,3,4]))); // Expected: [1,3,4]
console.log(visibleNodes(buildTree([1,2,3,null,5,null,4,6,null,7]))); // Expected: [1,3,4,7]
console.log(visibleNodes(buildTree([1,2,3,null,4,5,6,null,null,7]))); // Expected: [1,3,6,7]
console.log(visibleNodes(buildTree([1,2,3,4,5,6,7]))); // Expected: [1,3,7]
console.log(visibleNodes(buildTree([1,2,3,4,null,5,6,7,null,null,null,8]))); // Expected: [1,3,6,8]
console.log(visibleNodes(buildTree([1,2,3,4,5,null,6,null,null,7]))); // Expected: [1,3,6,7]
console.log(visibleNodes(buildTree([1,2,3,4,null,5,null,6,null,7,null,8]))); // Expected: [1,3,5,7,8]