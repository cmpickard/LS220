// You are given a grid represented as a nested array filled
// with empty strings. Chaos, the puppy, is standing at the
// top-left corner of the grid and can move either down or right
// at any point in time. Determine the number of distinct paths
// Chaos can take to reach a bowl of treats placed at the
// bottom-right corner of the grid.

// Define a function `chaosInTheGrid` that, given a nested
// array, returns the number of unique paths that Chaos
// can take to reach the bottom-right corner.

// The grid will have at least 1 row and 1 column.

// Example:

// Given the following 2x3 grid:

// const grid = [
//   ["", "", ""],
//   ["", "", ""],
// ];

// There are three distinct path Chaos can take:
// 1. Right -> Right -> Down
// 2. Right -> Down -> Right
// 3. Down -> Right -> Right

// Test cases

const grid1 = [[""]];
const grid2 = [
  ["", ""],
  ["", ""],
];
const grid3 = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const grid4 = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
const grid5 = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];

// bottomUp
function chaosInTheGridBottomUp(grid) {
  let rows = grid.length;
  let cols = grid[0].length;
  grid = createSolutionGrid(rows, cols);

  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      grid[row][col] = grid[row - 1][col] + grid[row][col - 1];
    }
  }

  return grid[rows - 1][cols - 1];
}

console.log(chaosInTheGridBottomUp(grid1) === 1);
console.log(chaosInTheGridBottomUp(grid2) === 2);
console.log(chaosInTheGridBottomUp(grid3) === 6);
console.log(chaosInTheGridBottomUp(grid4) === 15);
console.log(chaosInTheGridBottomUp(grid5) === 252);
// All test cases should log true

/*
Write a top-down recursive solution for the same problem

Algorithm:
BaseCase:
calcSquare:
  if row === 0 or col === 0 return 1
  else,
  return calcSquare(row - 1, col) + calcSquare(row, col - 1)

gonna want to memoize the square values -- maybe just use a 2-D grid? identical
to what I did in the bottom-up solution?


*/

function createSolutionGrid(rows, cols) {
  let solutionGrid = [];
  for (let idx = 0; idx < rows; idx++) {
    if (idx === 0) {
      solutionGrid[idx] = new Array(cols).fill(1);
    } else {
      solutionGrid[idx] = new Array(cols).fill(0);
      solutionGrid[idx][0] = 1;
    }
  }

  return solutionGrid;
}

function chaosInTheGridTopDown(grid) {
  let rows = grid.length;
  let cols = grid[0].length;
  let solutionGrid = createSolutionGrid(rows, cols);

  function calcSquare(row, col) {
    if (solutionGrid[row][col]) return solutionGrid[row][col];
    let newSquare = calcSquare(row - 1, col) + calcSquare(row, col - 1);
    solutionGrid[row][col] = newSquare;
    return newSquare;
  }

  return calcSquare(rows - 1, cols - 1);
}

console.log(chaosInTheGridTopDown(grid1) === 1);
console.log(chaosInTheGridTopDown(grid2) === 2);
console.log(chaosInTheGridTopDown(grid3) === 6);
console.log(chaosInTheGridTopDown(grid4) === 15);
console.log(chaosInTheGridTopDown(grid5) === 252);