/* eslint-disable no-lonely-if */
/* eslint-disable id-length */
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper function to build a BST from an array
function buildBST(arr) {
  if (!arr.length) return null;

  // Simplified BST construction for testing purposes
  const root = new TreeNode(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    insertIntoBST(root, arr[i]);
  }

  return root;
}

function insertIntoBST(root, val) {
  if (val < root.val) {
    if (root.left === null) {
      root.left = new TreeNode(val);
    } else {
      insertIntoBST(root.left, val);
    }
  } else {
    if (root.right === null) {
      root.right = new TreeNode(val);
    } else {
      insertIntoBST(root.right, val);
    }
  }
}

// Helper function to compare trees
function sameTree(p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  if (p.val !== q.val) return false;

  return sameTree(p.left, q.left) && sameTree(p.right, q.right);
}

/**
 * Given the root node of a binary search tree and a value to search for,
 * return the subtree rooted at the node with that value.
 * If the value doesn't exist in the tree, return null.
 *
 * @param {TreeNode} root - The root of the binary search tree
 * @param {number} val - The value to search for
 * @return {TreeNode} - The subtree with the root value equal to val, or null
 */

/*
input: root node of binary search tree, target node val
ouput: node w/ target val

rules:
-input will be a binary search tree, so all the elements in the left tree from
a given node will have vals smaller than the given node's val and all the right
tree nodes will have vals larger than...
-it's poss that the val won't be present in the tree, in which case, return
null

algorithm:
since this is a bin search tree, should prolly b e aiming for a time complexity
of O(logN) -- where N is the height of the tree?

start at root:

if root.val === val, return root
ELSE if (root.val > val) SEARCH LEFT
ELSE... SEARCH RIGHT

SEARCH LEFT:
recursively (?) call a traversal function to check the left node.
  -- check if node is null. if so, return false.
  -- check if node.val === val. if so, return true
  -- if (node.val > target val) traverse(node.left)


*/

function searchBST(root, val) {
  function traverse(node) {
    if (!node) return null;
    if (node.val === val) return node;
    return (node.val > val) ? traverse(node.left) : traverse(node.right);
  }

  return traverse(root);
}

// Test cases
const tree1 = buildBST([4, 2, 7, 1, 3]);
const expectedSubtree1 = buildBST([2, 1, 3]);
console.log(sameTree(searchBST(tree1, 2), expectedSubtree1)); // Expected: true

const tree2 = buildBST([4, 2, 7, 1, 3]);
console.log(searchBST(tree2, 5) === null); // Expected: true

const tree3 = buildBST([]);
console.log(searchBST(tree3, 1) === null); // Expected: true

const tree4 = buildBST([50, 30, 70, 20, 40, 60, 80]);
const expectedSubtree4 = buildBST([30, 20, 40]);
console.log(sameTree(searchBST(tree4, 30), expectedSubtree4)); // Expected: true