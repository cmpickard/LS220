/* eslint-disable max-lines-per-function */
// You are given a grid represented as a
// nested array filled with strings.

// Chaos is standing at the top-left corner of
// the grid and can move either down or right at
// any point in time. However, there are sleeping
// cats in certain squares, represented by the
// letter "C" in the grid, and Chaos cannot go through
// these squares.

// Determine the number of distinct paths Chaos
// can take to reach a bowl of treats placed at
// the bottom-right corner of the grid.

// Define a function `chaosInTheGridWithCats` that,
// given a nested array, returns the number of
// unique paths that Chaos can take to reach the
//  bottom-right corner.

// The grid will have at least 1 row and 1 column.

// Example:

// Given the following 2x3 grid:

// const grid = [
//   ["", "C", ""],
//   ["", "", ""],
// ];

// There is only one distinct path Chaos can take:
// 1. Down -> Right -> Right

/*
  ["", "", "", "", "C"],
  ["", "C", "", "", ""],
  ["", "", "", "C", ""],

  [0, 1, 1, 1, 0]
  [1, 0, 1, 2, 2]
  [1, 1, 1, 0, 2]

  so, same procedure as before EXCEPT
  I need to go through and place a zero in each position where
  there is a cat
  AND if there are any cats on the top row or first col, then every space
  after the cat is a zero
*/

function chaosInTheGridWithCatsBottomUp(grid) {
  let rows = grid.length;
  let cols = grid[0].length;
  let solved = createSolutionGrid(rows, cols, grid);
  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      if (grid[row][col] === 'C') {
        solved[row][col] = 0;
      } else {
        solved[row][col] = solved[row - 1][col] + solved[row][col - 1];
      }
    }
  }

  return solved[rows - 1][cols - 1];
}

function createSolutionGrid(rows, cols, grid) {
  let solutionsGrid = new Array(rows).fill(null).map(_ => new Array(cols));
  let seenCat = false;

  for (let col = 0; col < cols; col++) {
    if (seenCat || grid[0][col] === 'C') {
      seenCat = true;
      solutionsGrid[0][col] = 0;
    } else {
      solutionsGrid[0][col] = 1;
    }
  }

  seenCat = false;
  for (let row = 0; row < rows; row++) {
    let seenCat = false;
    if (seenCat || grid[row][0] === 'C') {
      seenCat = true;
      solutionsGrid[row][0] = 0;
    } else {
      solutionsGrid[row][0] = 1;
    }
  }

  return solutionsGrid;
}

// Test Cases:

const grid1 = [
  ["", "C"],
  ["", ""],
];
const grid2 = [["", "C"]];
const grid3 = [
  ["", "", ""],
  ["", "C", ""],
  ["", "", ""],
];
const grid4 = [
  ["", "", "", "", "C"],
  ["", "C", "", "", ""],
  ["", "", "", "C", ""],
];
const grid5 = [
  ["", "", "", "", "C", ""],
  ["", "C", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "C", "", ""],
  ["", "C", "", "", "", ""],
  ["", "", "", "", "", ""],
];

function chaosInTheGridWithCatsTopDown(grid) {
  let rows = grid.length;
  let cols = grid[0].length;
  let solved = createSolutionGrid(rows, cols, grid);

  function calcSquare(row, col) {
    if (solved[row][col] !== undefined) return solved[row][col];
    let solution;
    if (grid[row][col] === 'C') {
      solution = 0;
    } else {
      solution = calcSquare(row - 1, col) + calcSquare(row, col - 1);
    }
    solved[row][col] = solution;
    return solution;
  }

  return calcSquare(rows - 1, cols - 1);
}

console.log(chaosInTheGridWithCatsBottomUp(grid1) === 1);
console.log(chaosInTheGridWithCatsBottomUp(grid2) === 0);
console.log(chaosInTheGridWithCatsBottomUp(grid3) === 2);
console.log(chaosInTheGridWithCatsBottomUp(grid4) === 2);
console.log(chaosInTheGridWithCatsBottomUp(grid5) === 43);
console.log(chaosInTheGridWithCatsTopDown(grid1) === 1);
console.log(chaosInTheGridWithCatsTopDown(grid2) === 0);
console.log(chaosInTheGridWithCatsTopDown(grid3) === 2);
console.log(chaosInTheGridWithCatsTopDown(grid4) === 2);
console.log(chaosInTheGridWithCatsTopDown(grid5) === 43);
