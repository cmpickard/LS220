// The diameter of a binary tree is defined as the length of the longest
// path between any two nodes within the tree. The path does not necessarily
// have to pass through the root.

// The length of a path between two nodes in a binary tree is the number
// of edges between the nodes.

// Given the root of a binary tree root, return the diameter of the tree.

// Example 1:

// Input: root = [1,null,2,3,4,5]

// Output: 3
// Explanation: 3 is the length of the path [1,2,3,5] or [5,3,2,4].

// Example 2:

// Input: root = [1,2,3]

// Output: 2
// Constraints:

// 1 <= number of nodes in the tree <= 100
// -100 <= Node.val <= 100

/*
base case: null || root with no children -> depth = 1
Return: 0

1st case: depth = 2
return:
1 + depth(left) + (1 + depth(right))???

recursive function R should:
RETURN: max depth -> 1, if no children, else 1 + Max(maxdepth left, max right)
CHECK: whether (R(left) + R(right)) > maxDiameter
*/

function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  function maxDepth(node) {
    if (!node) return 0;
    if (!node.left && !node.right) return 1;

    let leftMax = maxDepth(node.left);
    let rightMax = maxDepth(node.right);
    let diameter = leftMax + rightMax;

    if (maxDiameter < diameter) maxDiameter = diameter;

    return 1 + Math.max(leftMax, rightMax);
  }

  maxDepth(root);
  return maxDiameter;
}