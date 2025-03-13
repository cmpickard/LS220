/* eslint-disable max-lines-per-function */
// In this assignment,
// we'll work on a more challenging graph problem: "Number of Forests."

// Problem Description
// You are provided with a 2D grid map where each cell is either
//  marked as a tree ('T') or open land ('O'). Your goal is to
// count the number of distinct forest regions on the map. A forest
// region consists of a contiguous group of tree cells ('T'). For
// this problem, two tree cells are considered connected if they
// share an edge horizontally or vertically, but not diagonally.

// Write a function numOfForests that accepts a nested array grid
// representing the 2D map. The function should return the total
// number of forest regions in the grid.

/*
input: 2D array
output: int
rules:
-the 2D array represents a rectangular grid. each space is labelled as either
a tree -- with a 'T' -- or as open land -- with an 'O'.
  -- assume good input and that all spaces are labelled
-the return value should correspond to the number of distinct 'forests' in the
grid
- a 'forest' consists of a collection of 1 or more tree squares each of which is
adjacent to one or more other members of the collection. For this problem,
we count as a adjacent to a square, S, the 4 squares on each side: top, bottom,
left, and right. Corner sqs thus have 2 adjacents and edge squares 3.
- two forests are 'distinct' therefore when none of their members are adjacent
to any member of the other forest

datastructure:
Set for visited
array of Maps for forests

algorithm:
- first convert sq into adjacency map
  --
- create visited set
- iterate through the elements of the grid:
  if the square is a O, next
  if the square is a NEW T, create a forest Map for the forest this T lives in
  and then add that map to the forest map arr
    -- for each member of the forest, add it to Visited
    HL FUNC: mapForest
  if the square is a VISITED T, next
- return the length of the forest maps array

mapForest
input: col and row of a T square, the grid, the list of visited sqs
output: a Map? really just need ANY VALUE to signify that i've traversed the
forest.
Maybe we don't need a forestArr. maybe just a count. which i increment after
traversing a forest

*/

function numOfForests(grid) {
  if (!grid || grid.length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols ||
      grid[row][col] === 'O') {
      return;
    }

    grid[row][col] = 'O';
    dfs(row - 1, col);
    dfs(row + 1, col);
    dfs(row, col - 1);
    dfs(row, col + 1);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 'T') {
        count += 1;
        dfs(row, col);
      }
    }
  }
  return count;
}

const grid1 = [];
console.log(numOfForests(grid1) === 0);

const grid2 = [
  ['O', 'O', 'O'],
  ['O', 'O', 'O'],
  ['O', 'O', 'O']
];
console.log(numOfForests(grid2) === 0);
const grid3 = [
  ['T', 'T', 'O'],
  ['T', 'T', 'O'],
  ['O', 'O', 'O']
];
console.log(numOfForests(grid3) === 1);
const grid4 = [
  ['O', 'O', 'T', 'T', 'O'],
  ['T', 'T', 'O', 'T', 'O'],
  ['T', 'T', 'O', 'O', 'O'],
  ['O', 'O', 'O', 'T', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
];
console.log(numOfForests(grid4) === 3);

const grid5 = [
  ['T', 'T', 'T'],
  ['T', 'O', 'T'],
  ['T', 'T', 'T']
];
console.log(numOfForests(grid5) === 1);

const grid6 = [
  ['T', 'O', 'T', 'O', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
  ['T', 'O', 'T', 'O', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
  ['T', 'O', 'T', 'O', 'T']
];
console.log(numOfForests(grid6) === 9);

const grid7 = [
  ['T', 'T', 'T'],
  ['T', 'T', 'T'],
  ['T', 'T', 'T']
];
console.log(numOfForests(grid7) === 1);

// All test cases should log true

// Further Exploration
// In this problem, as in many other graph problems, we need a way to track
// visited squares. We used a set to solve this problem. However, do we need
// a set in this case? Is there another way to mark a square as visited?

// Try to solve the problem without using an additional collection like a set.
// You can always reference the solution provided below.