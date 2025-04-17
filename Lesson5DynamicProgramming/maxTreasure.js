/* eslint-disable max-len */
// An adventurer is embarking on a quest through a mysterious grid-like
// landscape filled with hidden treasures. The landscape is represented by a grid
// with M rows and N columns. Our adventurer begins their journey in the top-left
// corner and aims to reach the bottom-right corner, all while gathering as much
// treasure as possible.
//
// Rules:
// 1. The adventurer can only move in two directions: right and down.
// 2. Each cell in the grid contains a certain amount of treasure, represented by
//    a non-negative integer.
// 3. Upon entering a cell, the adventurer automatically collects the treasure there.
//
// Task:
// Create a function `maxTreasure` that takes a 2D grid as input. Each cell
// in the grid contains a non-negative integer representing the amount of treasure.
// The function should return the maximum possible treasure the adventurer can
// accumulate while traveling from the top-left to the bottom-right corner.
//
// Example:
// grid = [
//   [1, 3, 1, 5],
//   [2, 2, 4, 1],
//   [5, 0, 2, 3],
//   [0, 6, 1, 2]
// ]
//
// maxTreasure(grid) should return 17
//
// Explanation: The optimal path is 1 -> 3 -> 2 -> 4 -> 2 -> 3 -> 2
// collecting a total of 17 treasure units.
//
// Constraints:
// - The grid will always have at least one cell.
// - All values in the grid will be non-negative integers.
// - The grid dimensions M and N will be positive integers.

/*
  // create solutionGrid
  // fill in solution grid first row / first col
  // iterate through remaining squares:
  // for each square: calculate all possible path-sums for the square
  // set square value to maximum of possible paths
  // QUESTION: will there always be just 2 possible paths, given this approach?

  [1, 3, 1, 5],
  [2, 2, 4, 1],
  [5, 0, 2, 3],
  [0, 6, 1, 2]

  [1, 4, 5, 10],
  [3, 6, 10, 11],
  [8, 8, 12, 15],
  [0, 14, 15, 17]
*/

function maxTreasureIterative(grid) {
  let solutionGrid = new Array(grid.length)
    .fill()
    .map(() => new Array(grid[0].length));

  calcFirstRowAndCol(grid, solutionGrid);
  fillInSquares(grid, solutionGrid);

  return solutionGrid[grid.length - 1][grid[0].length - 1];
}

function fillInSquares(grid, solutionGrid) {
  for (let row = 1; row < grid.length; row++) {
    for (let col = 1; col < grid[0].length; col++) {
      let top = solutionGrid[row - 1][col];
      let left = solutionGrid[row][col - 1];
      solutionGrid[row][col] = grid[row][col] + Math.max(top, left);
    }
  }
}

function calcFirstRowAndCol(grid, solutionGrid) {
  let sum = 0;
  for (let col = 0; col < grid[0].length; col++) {
    sum += grid[0][col];
    solutionGrid[0][col] = sum;
  }

  sum = 0;
  for (let row = 0; row < grid.length; row++) {
    sum += grid[row][0];
    solutionGrid[row][0] = sum;
  }
}

function maxTreasureRecursive(grid) {
  let map = new Map();
  map.set('0, 0', grid[0][0]);

  function calcSquare(row, col) {
    if (row === 0 && col === 0) return map.get('0, 0');
    if (row < 0 || col < 0) return 0;

    let key = `${row}, ${col}`;
    if (map.has(key)) {
      return map.get(key);
    } else {
      let top = calcSquare(row - 1, col);
      let left = calcSquare(row, col - 1);
      let maxSum = grid[row][col] + Math.max(top, left);
      map.set(key, maxSum);
      return maxSum;
    }
  }

  return calcSquare(grid.length - 1, grid[0].length - 1);
}

// Test cases
const grid1 = [[7]];
const grid2 = [[1, 3], [2, 4]];
const grid3 = [
  [1, 3, 1, 5],
  [2, 2, 4, 1],
  [5, 0, 2, 3],
  [0, 6, 1, 2]
];

const grid4 = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25]
];

const grid5 = [
  [1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 1],
  [1, 2, 3, 3, 2, 1],
  [1, 2, 3, 3, 2, 1],
  [1, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1]
];

const largeGrid = Array(200).fill().map(() => Array(200).fill(1));

console.log(maxTreasureIterative(grid1) === 7);
console.log(maxTreasureIterative(grid2) === 8);
console.log(maxTreasureIterative(grid3) === 17);
console.log(maxTreasureIterative(grid4) === 149);
console.log(maxTreasureIterative(grid5) === 21);
// The test case below should time out with a brute force approach.
console.log(maxTreasureIterative(largeGrid) === 399);


console.log(maxTreasureRecursive(grid1) === 7);
console.log(maxTreasureRecursive(grid2) === 8);
console.log(maxTreasureRecursive(grid3) === 17);
console.log(maxTreasureRecursive(grid4) === 149);
console.log(maxTreasureRecursive(grid5) === 21);
// The test case below should time out with a brute force approach.
// console.log(maxTreasureRecursive(largeGrid) === 399);
// All test cases should log true