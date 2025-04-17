/* eslint-disable id-length */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
// You are provided with a 2D grid map where each cell
// is either marked as a tree ('T') or open land ('O').
// Your goal is to transform specific regions of open land into trees.
// An open land region consists of open land cells that are
// connected horizontally or vertically.

// Any region of open land that is completely surrounded by trees
// on all four sides should be converted into a tree area by changing
// its designation to 'T'.

// The transformation rules are as follows:
// - If an open land cell ('O') is connected to other open land cells
//   horizontally or vertically, they form an open land region.
// - If an entire open land region is completely surrounded by tree
//   cells ('T') on all four sides (up, down, left, and right), then
//   all cells in this region should be changed to tree cells ('T').
// - Open land regions that are not completely surrounded by trees
// will remain unchanged.

// Implement a function `forestExpansion` that
// accepts a nested array grid representing the 2D map.
// The function should return the same grid, modified
// so that all open land regions surrounded by trees
// on all four sides are converted to trees.

// Example 1:

// Input:
// [
// ['T', 'T', 'O'],
// ['T', 'O', 'T'],
// ['T', 'T', 'T']
// ]

// Output:
// [
// ['T', 'T', 'O'],
// ['T', 'T', 'T'],
// ['T', 'T', 'T']
// ]

// Explanation:
// There are two distinct open land regions - cell (0, 2) and cell (1, 1).
// The region made up of cell (1, 1) is completely surrounded by trees,
// horizontally and vertically, so it's converted to a tree.


// Example 2:

// Input:
// [
// ['T', 'O', 'T'],
// ['O', 'O', 'O'],
// ['T', 'O', 'T']
// ]

// Output:
// [
// ['T', 'O', 'T'],
// ['O', 'O', 'O'],
// ['T', 'O', 'T']
// ]

// Explanation:
// There is only one open land region in this case made up of
// cells (0, 1), (1, 0), (1, 1), (1, 2), and (2, 1).
// This region is not fully surrounded by trees, so it remains unchanged.

/*
in: grid
out: grid
rules:
- if an open land area touches any of the borders of the grid, do nothing
  else, convert every square that's part of the open land area from an 'O' to
  a 'T'.
- thus, I need to check, while I traverse a contiguous land area, whether each
square has any of the following position values:
  -row = 0
  -col = 0
  -row = grid.length - 1
  -col = grid[0].length - 1
-maybe implement a binary toggle to keep track of whether any squares im
traversing are like that

algo:
-create a Set(?) for keeping track of which squares have been visited:
  -use 'row,col' as the key
-iterate through every square
  -if 'T', continue
  -if 'O' AND if !visited.has('row,col'), call our traversal function
    -- inside the funciton is where we'll rewrite 'O's to 'Ts' ?

--return grid

NESTED HELPER:
traverseGrid(row, col) -- has access to grid & visited
 --let thisLand = new Set

*/

function forestExpansion(grid) {
  let visited = new Set();

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 'O' && !visited.has(`${row},${col}`)) {
        traverseGrid(grid, visited, row,col);
      }
    }
  }

  return grid;
}

function traverseGrid(grid, visited, row, col) {
  let hasEdge = false;
  let thisLand = [];

  function traverse(row, col) {
    if (visited.has(`${row},${col}`) || row < 0 || col < 0 ||
        row >= grid.length || col >= grid[0].length || grid[row][col] !== 'O') {
      return;
    }

    if (row === 0 || row === grid.length - 1 ||
        col === 0 || col === grid[0].length - 1) {
      hasEdge = true;
    }

    visited.add(`${row},${col}`);
    thisLand.push([row, col]);

    traverse(row - 1, col);
    traverse(row + 1, col);
    traverse(row, col - 1);
    traverse(row, col + 1);
  }

  traverse(row, col);

  if (!hasEdge) {
    thisLand.forEach(([row, col]) => {
      grid[row][col] = 'T';
    });
  }
}


// Helper function for the test cases
function gridsAreEqual(grid1, grid2) {
  if (grid1.length !== grid2.length) return false;

  return grid1.every((row, i) => row.length === grid2[i].length && row.every((cell, j) => cell === grid2[i][j]));
}

// Test Cases:

const grid1 = [
  ['T', 'T', 'O'],
  ['T', 'O', 'T'],
  ['T', 'T', 'T']
];
const expected1 = [
  ['T', 'T', 'O'],
  ['T', 'T', 'T'],
  ['T', 'T', 'T']
];

console.log(gridsAreEqual(forestExpansion(grid1), expected1));

const grid2 = [
  ['T', 'O', 'T'],
  ['O', 'O', 'O'],
  ['T', 'O', 'T']
];
const expected2 = [
  ['T', 'O', 'T'],
  ['O', 'O', 'O'],
  ['T', 'O', 'T']
];

console.log(gridsAreEqual(forestExpansion(grid2), expected2));

const grid3 = [
  ['T', 'T', 'T', 'T'],
  ['T', 'O', 'T', 'T'],
  ['T', 'T', 'O', 'T'],
  ['T', 'T', 'T', 'T']
];
const expected3 = [
  ['T', 'T', 'T', 'T'],
  ['T', 'T', 'T', 'T'],
  ['T', 'T', 'T', 'T'],
  ['T', 'T', 'T', 'T']
];

console.log(gridsAreEqual(forestExpansion(grid3), expected3));

const grid4 = [
  ['O', 'T', 'O', 'T'],
  ['T', 'O', 'T', 'O'],
  ['O', 'T', 'O', 'O']
];
const expected4 = [
  ['O', 'T', 'O', 'T'],
  ['T', 'T', 'T', 'O'],
  ['O', 'T', 'O', 'O']
];

console.log(gridsAreEqual(forestExpansion(grid4), expected4));

const grid5 = [
  ['T', 'T', 'T', 'O', 'T'],
  ['T', 'O', 'T', 'O', 'T'],
  ['T', 'O', 'T', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T'],
];
const expected5 = [
  ['T', 'T', 'T', 'O', 'T'],
  ['T', 'T', 'T', 'O', 'T'],
  ['T', 'T', 'T', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T'],
];

console.log(gridsAreEqual(forestExpansion(grid5), expected5));