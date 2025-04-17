/* eslint-disable max-len */
// As a hydrologist, you're studying a unique rectangular island
// situated between the Atlantic Ocean and the Indian Ocean. The
// island's terrain varies in elevation across its surface.
// The island is represented as an m x n grid, where each cell has
// a specific elevation.

// The ocean borders are as follows:

// The Atlantic Ocean borders the island's western and northern coasts.
// The Indian Ocean borders the island's southern and eastern coasts.

// You're given an m x n integer matrix `heights` where `heights[r][c]`
// represents the height above sea level of the cell at coordinate (r, c).
// During the rainy season, water accumulates on the island and
// flows according to these rules:

// Water can flow from a cell to adjacent cells in four directions,
// north, south, east, and west if the adjacent cell's elevation
// is less than or equal to the current cell's elevation.
// Water can flow from any edge cell directly into the bordering ocean.

// Your task is to identify all the locations on the island where accumulated
// rainwater has the potential to eventually reach *both* the Atlantic and
// Indian Oceans, either directly or through connected cells.


// Example 1:

// Input:
// [
//  [1, 2, 1, 3, 6],
//  [2, 2, 3, 4, 4],
//  [2, 3, 5, 2, 1],
//  [9, 8, 1, 3, 5],
//  [5, 1, 2, 2, 3]
// ]

// Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

// Explanation:
// - [0,4] with an elevation of 6 can flow to the Atlantic Ocean (north) and the Indian Ocean (east) directly.
// - [1,3] with an elevation of 4 can flow to the Atlantic via [0,3] (as well as several other paths) and
//   can reach the Indian ocean via [1,4] (as well as several other paths).
// - [1,4] can flow to both oceans in a similar fashion as [1, 3].
// - [2,2] can reach Atlantic Ocean directly to the north or west and the Indian ocean directly to the east.
// - [3,0], [3,1], and [4,0] can flow to the Atlantic to the west and reach the Indian ocean to the south.

// Example 2:

// Input:
// [[1]]

// Output: [[0,0]]

// Explanation: On a single-cell island, water from the sole cell can reach both oceans.

/*
input: rectangular 2D grid, each subarray a list of positive ints
output: 2D array with 2-element subarrays, each with int coordinates
rules:
-the top and left edges constitutes 1 outlet; the bottom and right edges are
the other
-the OUTPUT array should contain the coordinates of every cell that has the
potential to reach both outlets
  -- from a given square, we can "reach": any adjacent square whose value is
  less than or equal to the given square's value
  -- any square reachable from a square that can be reached from the given sq
  -- if on an edge, the outlet on that edge (e.g. from [0,0] we can reach both
  the top and left outlets -- though, those count as the same
  "outlet" in the problem)
-the topright and bottomleft squares will always be in the output -- though,
if the grid is a 1X1, those will be the same square:[0,0]

algorithm:
--Maybe iterate through every square and check if that square has a path to
both outlets
  --create a region consisting of all squares reachable from the current sq
  --once the region is built, inspect it to see if
  (i) at least one square is  adjacent to top OR left:
    squares.some(([row, col]) => row === 0 || col == 0)
  (ii) at least one square is adj to bottom OR right:
    squares.some(([row, col]) => row === grid.length - 1 || col === grid[0].length - 1)

-- can I assume that if one square in a region has double access, that all do?
  -- NO. because the graph is directional in this case. A 1 square is reachable
  from a 10 square but not vice versa
*/

function waterFlow(heights) {
  let results = [];
  for (let row = 0; row < heights.length; row++) {
    for (let col = 0; col < heights[0].length; col++) {
      if (testRegion(heights, row, col)) results.push([row, col]);
    }
  }

  return results;
}

function testRegion(heights, row, col) {
  let region = new Set();

  function traverse(row, col, neighborHeight = Infinity) {
    if (row < 0 || col < 0 || row >= heights.length ||
        col >= heights[0].length || region.has(`${row},${col}`) ||
        heights[row][col] > neighborHeight) {
      return;
    }

    region.add(`${row},${col}`);

    let currHeight = heights[row][col];
    traverse(row - 1, col, currHeight);
    traverse(row + 1, col, currHeight);
    traverse(row, col - 1, currHeight);
    traverse(row, col + 1, currHeight);
  }

  traverse(row, col);
  return hasAccess(region, heights);
}

function hasAccess(region, heights) {
  let reachables = Array.from(region).map(key => {
    return key.split(',').map(el => Number(el));
  });

  return (reachables.some(([row, col]) => {
    return row === 0 || col === 0;
  }) &&
  reachables.some(([row, col]) => {
    return row === heights.length - 1 || col === heights[0].length - 1;
  }));
}

// Helper function for the test cases

function coordinateSetsEqual(set1, set2) {
  if (set1.length !== set2.length) return false;
  const stringSet1 = new Set(set1.map(JSON.stringify));
  return set2.every(coord => stringSet1.has(JSON.stringify(coord)));
}

// Test Cases:

const grid1 = [
  [1, 2, 1, 3, 6],
  [2, 2, 3, 4, 4],
  [2, 3, 5, 2, 1],
  [9, 8, 1, 3, 5],
  [5, 1, 2, 2, 3]
];
const expected1 = [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]];
console.log(coordinateSetsEqual(waterFlow(grid1), expected1));

const grid2 = [[1]];
const expected2 = [[0,0]];
console.log(coordinateSetsEqual(waterFlow(grid2), expected2));

const grid3 = [
  [3, 3, 3, 3, 3],
  [3, 2, 2, 2, 3],
  [3, 2, 1, 2, 3],
  [3, 2, 2, 2, 3],
  [3, 3, 3, 3, 3]
];
const expected3 = [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,0],[4,1],[4,2],[4,3],[4,4]];
console.log(coordinateSetsEqual(waterFlow(grid3), expected3));

const grid4 = [
  [1, 2, 3],
  [8, 9, 4],
  [7, 6, 5]
];
const expected4 = [[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
console.log(coordinateSetsEqual(waterFlow(grid4), expected4));

const grid5 = [
  [10, 10, 10, 10],
  [10,  1,  1, 10],
  [10,  1,  1, 10],
  [10, 10, 10, 10]
];
const expected5 = [[0,0],[0,1],[0,2],[0,3],[1,0],[1,3],[2,0],[2,3],[3,0],[3,1],[3,2],[3,3]];
console.log(coordinateSetsEqual(waterFlow(grid5), expected5));