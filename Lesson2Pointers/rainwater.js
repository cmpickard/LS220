"use strict";
/* eslint-disable max-len */
// Imagine a series of vertical barriers arranged in a straight
// line at equal distances across a flat field.
// These barriers have different heights. After a rainstorm,
// water collects between the barriers, forming reservoirs.
// Your task is to determine the maximum volume of rainwater
// that can be captured between any two barriers, without
// the water spilling over the tops of those two barriers.

// Write a function `maxRainwater` that takes an array of
// barrier `heights` and calculates the maximum volume
// of rainwater that can be harvested between any two barriers.

// The array `heights` represents the height of each barrier,
// where `heights[i]` is the height of the i-th barrier.
// The distance between each barrier is uniform.

// The input array will contain at least 2 values.

// Example:
// Input: [1, 2, 1]
// Output: 2
// Explanation: The distance between the first and
// third barrier is 2, and the height is 1, so
// the maximum amount of rainfall is 2 * 1 = 2

//   |    =>    |
// |_|_|      |*|*|

// Example:
// Input: [2, 3, 4, 2]
// Output: 6
// Explanation: The distance between the first and
// fourth barrier is 3, and the height is 2, so the
// maximum amount of rainfall is 3 * 2 = 6

//     |            |
//   | |    =>    | |
// | | | |      |*|*|*|
// |_|_|_|      |*|*|*|

/*
[2, 9, 5, 10, 5, 6]
      |
  |   |
  |   |
  |   |
  |* *|* *|
  |*|*|*|*|
  |*|*|*|*|
  |*|*|*|*|
| |*|*|*|*|
| |*|*|*|*|

[5, 4, 3, 2, 9, 10, 3, 4, 5]
          |
        | |
        | |
        | |
        | |
|* * * *|*|* * *|
| |     | |   | |
| | |   | | | | |
| | | | | | | | |
| | | | | | | | |

  | |
  | |
  | |
  | |
  | |
  | |
  | |
  | |
  | |
| | | | |
input: int array
output: int
rules:
- we are trying to find the largest rectangle that can be formed from the input
array, where the length of the rect is the dist between 2 int (i.e. the diff
between their indices), and the height is the smaller of the two ints.
so,
[2, 3, 4] contains 3 rectangles:
[2, 3] => width 1, height 2
[2, 4] => width 2, height 2  => largest at 4 sq units
[3, 4] => width 1, height 3
    |
  | |
|*|*|
|*|*|

-the return value is the area of the largest rectangle

algorithm:
-set maxArea = -1
-set start = 0
-end = heights.length - 1

LOOP
calculate area of rectangle between start and end.
if area > maxArea, maxArea = area
find smaller of start height / end height
move smaller inward


*/

function maxRainwater(heights) {
  let maxArea = -1;
  let start = 0;
  let end = heights.length - 1;
  while (start < end) {
    let currArea = (end - start) * Math.min(heights[start],heights[end]);
    if (currArea > maxArea) maxArea = currArea;
    if (heights[start] < heights[end]) {
      start += 1;
    } else {
      end -= 1;
    }
  }

  return maxArea;
}

console.log(maxRainwater([1, 1]) === 1);
console.log(maxRainwater([1, 3]) === 1);
console.log(maxRainwater([1, 2, 1]) === 2);
console.log(maxRainwater([2, 3, 4, 2]) === 6);
console.log(maxRainwater([2, 2, 2, 2, 2]) === 8);
console.log(maxRainwater([2, 9, 5, 10, 5, 6]) === 24);
console.log(maxRainwater([5, 4, 3, 2, 9, 10, 3, 4, 5]) === 40);
console.log(maxRainwater([3, 1, 2, 5, 2, 4, 2, 5, 6, 1, 5, 3, 2, 3, 4, 1, 2]) === 44);
console.log(maxRainwater([2, 2, 13, 9, 1, 15, 2, 5, 9, 7, 5, 3, 6, 3, 4, 1, 4, 5]) === 75);

// All test cases should log true