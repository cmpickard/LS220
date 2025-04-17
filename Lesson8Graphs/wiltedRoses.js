/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
// You're a botanist studying the spread of a peculiar wilting
// condition in a rose garden. The garden is represented as a
// grid where each cell can have one of three states:

// - 0 representing an empty plot,
// - 1 representing a healthy rose, or
// - 2 representing a wilted rose.

// Every day, any healthy rose that is adjacent (up, down, left,
// or right) to a wilted rose begins to wilt.
// Your task is to determine the minimum number of days it takes
// for all roses in the garden to wilt. If it's impossible for
// all roses to wilt, return -1.

// Example 1:

// Input:
// [
//   [2,1,1],
//   [1,1,0],
//   [0,1,1]
// ]

// Output: 4

// Explanation:
// Day 1: Roses at (0, 1) and (1, 0) will wilt.
// Day 2: Roses at (0, 2) and (1, 1) will wilt.
// Day 3: The rose at (2, 1) will wilt.
// Day 4: The final rose at (2, 2) will wilt.

// Example 2:

// Input:
// [
//   [2,1,1],
//   [0,1,1],
//   [1,0,1]
// ]

// Output: -1

// Explanation: The rose in the bottom left corner (2, 0)
// will never wilt because it's not adjacent to any
// other roses.

/*
rules:
- each square is a 2 a 1 or a 0. Zeroes are "empty" squares.
- we should return the maximum length -- taking the shortest path -- between
a 2 square and a 1 square UNLESS there is a 1 square that has no path to a 2
square, in which case we return -1.

algorithm:
can i treat this like a dynamic programming problem?

create a grid of the same size as the garden called, 'distance from 2'
each 2 in the original grid is a zero in this new grid. everything else is an
Infinity

*/

function wiltedRoses(garden) {
  if (!garden || garden.length === 0 || garden[0].length === 0) return -1;

  let wiltTime = Array(garden.length).fill()
    .map(_ => Array(garden[0].length).fill());

  for (let row = 0; row < garden.length; row++) {
    for (let col = 0; col < garden[0].length; col++) {
      wiltTime[row][col] = (garden[row][col] === 2) ? 0 : Infinity;
    }
  }

  calcWiltTimes(garden, wiltTime);

  for (let row = 0; row < garden.length; row++) {
    for (let col = 0; col < garden[0].length; col++) {
      if (wiltTime[row][col] === Infinity && garden[row][col] === 1) return -1;
    }
  }

  let allNums = wiltTime.flat().map(el => ((el === Infinity) ? -1 : el));
  return Math.max(...allNums);
}

function calcWiltTimes(garden, dp) {
  let wilted = true;

  while (wilted) {
    wilted = false;
    for (let row = 0; row < garden.length; row++) {
      for (let col = 0; col < garden[0].length; col++) {
        if (dp[row][col] !== Infinity || garden[row][col] === 0) continue;
        let top = (row === 0) ? Infinity : dp[row - 1][col];
        let bottom = (row >= garden.length - 1) ? Infinity : dp[row + 1][col];
        let left = (col === 0) ? Infinity : dp[row][col - 1];
        let right = (col >= garden[0].length - 1) ? Infinity : dp[row][col + 1];
        let minSide = Math.min(top, bottom, left, right);

        if (minSide !== Infinity) {
          dp[row][col] = minSide + 1;
          wilted = true;
        }
      }
    }
  }
}

// Test Cases:

console.log(wiltedRoses([[2,1,1],[1,1,0],[0,1,1]]) === 4);
console.log(wiltedRoses([[2,1,1],[0,1,1],[1,0,1]]) === -1);
console.log(wiltedRoses([[0,2]]) === 0);
console.log(wiltedRoses([[1,1,1],[1,2,1],[1,1,1]]) === 2);
console.log(wiltedRoses([[2,2],[1,1],[0,0]]) === 1);
console.log(wiltedRoses([[1,1,1],[1,1,1],[1,1,1]]) === -1);
console.log(wiltedRoses([[2]]) === 0);
console.log(wiltedRoses([[1]]) === -1);
console.log(wiltedRoses([]) === -1);
console.log(wiltedRoses([[0,0,0],[0,1,0],[0,0,2]]) === -1);
console.log(wiltedRoses([[2,1,1],[1,1,1],[0,1,2]]) === 2);