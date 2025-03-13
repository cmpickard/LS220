/* eslint-disable max-lines-per-function */
// You are provided with an 'm x n' 2D grid map where each cell
// is either marked as a tree ('T') or open land ('O'). Your task
//  is to find the largest contiguous forest area on the map. A
// forest area consists of a group of tree cells ('T') connected
// 4-directionally (horizontally or vertically, but not diagonally).

// Write a function largestForestArea that accepts a nested
// array grid representing the 2D map. The function should
// return the size of the largest forest area, which is the
// number of contiguous 'T' cells in the largest forest.
// If there are no trees in the grid, return 0.

// Example:
// Input:
// [
//   ['O', 'T', 'O', 'O'],
//   ['T', 'T', 'O', 'T'],
//   ['O', 'O', 'O', 'T'],
//   ['O', 'O', 'T', 'T']
// ]
// Output: 4 (The largest forest area has 4 connected tree cells)

function largestForestArea(grid) {
  if (!grid || grid.length === 0) return 0;
  let largest = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(row, col) {
    if (row < 0 || col < 0 || row >= rows || col >= cols ||
        grid[row][col] === 'O') {
      return 0;
    } else {
      grid[row][col] = 'O';
      return 1 + dfs(row, col - 1) + dfs(row, col + 1) + dfs(row - 1, col) +
      dfs(row + 1, col);
    }

  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 'T') {
        let size = dfs(row, col);
        if (largest < size) largest = size;
      }
    }
  }

  return largest;
}

// Test cases
const grid1 = [];
console.log(largestForestArea(grid1) === 0);

const grid2 = [
  ['O', 'O', 'O'],
  ['O', 'O', 'O'],
  ['O', 'O', 'O']
];
console.log(largestForestArea(grid2) === 0);

const grid3 = [
  ['T', 'T', 'O'],
  ['T', 'T', 'O'],
  ['O', 'O', 'O']
];
console.log(largestForestArea(grid3) === 4);

const grid4 = [
  ['O', 'O', 'T', 'T', 'O'],
  ['T', 'T', 'O', 'T', 'O'],
  ['T', 'T', 'O', 'O', 'O'],
  ['O', 'O', 'O', 'T', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
];
console.log(largestForestArea(grid4) === 4);

const grid5 = [
  ['T', 'T', 'T'],
  ['T', 'O', 'T'],
  ['T', 'T', 'T']
];
console.log(largestForestArea(grid5) === 8);

const grid6 = [
  ['T', 'O', 'T', 'O', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
  ['T', 'O', 'T', 'O', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
  ['T', 'O', 'T', 'O', 'T']
];
console.log(largestForestArea(grid6) === 1);

const grid7 = [
  ['T', 'T', 'T'],
  ['T', 'T', 'T'],
  ['T', 'T', 'T']
];
console.log(largestForestArea(grid7) === 9);

const grid8 = [
  ['O', 'T', 'O', 'T', 'T'],
  ['O', 'T', 'O', 'O', 'O'],
  ['O', 'O', 'T', 'O', 'O'],
  ['O', 'O', 'T', 'T', 'T'],
  ['T', 'O', 'T', 'T', 'T']
];
console.log(largestForestArea(grid8) === 7);

const grid9 = [
  ['T', 'O', 'T', 'T'],
  ['O', 'T', 'O', 'T'],
  ['T', 'T', 'O', 'O'],
  ['O', 'T', 'T', 'T']
];
console.log(largestForestArea(grid9) === 6);

const grid10 = [
  ['O', 'T', 'O', 'O'],
  ['T', 'T', 'O', 'T'],
  ['O', 'O', 'O', 'T'],
  ['O', 'O', 'T', 'T']
];
console.log(largestForestArea(grid10) === 4);

const grid11 = [
  ['O', 'T', 'T', 'T', 'O'],
  ['T', 'T', 'O', 'T', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
  ['T', 'T', 'O', 'T', 'O'],
  ['T', 'T', 'O', 'T', 'T']
];
console.log(largestForestArea(grid11) === 7);

// All test cases should log true