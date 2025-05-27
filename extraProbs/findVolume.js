/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
// You are given an array non-negative integers height which represent an
// elevation map. Each value height[i] represents the height of a bar,
// which has a width of 1.

// Return the maximum area of water that can be trapped between the bars.

// Example 1:

// Input: height = [0,2,0,3,1,0,1,3,2,1]

// Output: 9
// Constraints:

// 1 <= height.length <= 1000
// 0 <= height[i] <= 1000

/*
input: array of positive ints
output: int
rules:
- will receive between 1 and 1000 heights
- no bad input
- the heights will be between 0 and 1000
- should return volume of trapped water when heighmap is full
- each 'square' unit counts as a vol of 1
- each height represents a column of width 1 with height = height


[0,2,0,3,1,0,1,3,2,1]
       _       _
   _  | |X X X| |_
  | |X| |X X X|   |_
 _| |X| | |X|       |
               A R


ANCHOR STARTS AT ZERO
RUNNER STARTS AT ONE -- b/c there is no volume at a single index?

1. ADVANCE ANCHOR UNTIL anchor + 1 IS SMALLER THAN ANCHOR
2. Start runner at anchor + 1
3. Advance runner, looking for heighest wall -- save IDX, don't overwrite =s
  -- STOP if it hits a wall that is same height as anchor
  a. if that never happens, set runner equal to heighestSeen
  b. UNLESS heighestSeen is zero, in which case, we're done iterating

  -- Now we've identified a basin.
4. Calc volume held in basin with plumbBasin, add return value to totalVol
5. Set anchor = runner;

HELPER: plumbBasin(start, end, heights) {
  if (end === start + 1) return 0;

  let maxVol = Math.min(heights[start], heights[end]) * (end - (start + 1))
  for (let col = start + 1; col < end; col++) {
    maxVol -= heights[col];
  }

  return maxVol;
}

*/

function trap(heights) {
  let volume = 0;
  let anchor = 0;
  let runner = 1;

  while (anchor < heights.length - 1 && runner < heights.length) {
    while (heights[anchor] <= heights[anchor + 1]) {
      anchor++;
    }

    runner = anchor + 1;
    let heighestSeen = 0;
    let heighestIdx;

    while (runner < heights.length) {
      if (heights[runner] > heighestSeen) {
        heighestSeen = heights[runner];
        heighestIdx = runner;
      }

      if (heighestSeen >= heights[anchor]) break;

      runner++;
    }

    if (heighestSeen === 0) break;

    runner = heighestIdx;
    volume += plumbBasin(anchor, runner, heights);
    anchor = runner;
    runner = anchor + 1;
  }

  return volume;
}

function plumbBasin(start, end, heights) {
  let maxVol = Math.min(heights[start], heights[end]) * (end - (start + 1));

  for (let col = start + 1; col < end; col++) {
    maxVol -= heights[col];
  }

  return maxVol;
}
console.log(trap([0,2,0,3,1,0,1,3,2,1])); //9
console.log(trap([4,2,0,3,2,5])); // 9
console.log(trap([0,2,0])); //0