
// You are given an array of intervals, where each interval is represented
// by an array [start, end] indicating the start and end points. Your task
// is to merge all overlapping intervals and return an array of
// non-overlapping intervals that cover all the original intervals.


// Example 1:

// Input: intervals = [[2,5], [4,8], [10,12], [13,16]]
// Output: [[2,8], [10,12], [13,16]]
// Explanation: Intervals [2,5] and [4,8] overlap, so they are merged into [2,8]

// Example 2:

// Input: intervals = [[3,6], [3,4], [5,8], [7,9]]
// Output: [[3,9]]
// Explanation: All intervals overlap and are merged into a single interval.

/*
input: 2d array, each subarray 2 ints representing an interval
output: 2d array, each subarray 2 ints representing an interval

rules:
- the input may not arrive presorted
- merge all overlapping intervals
- if the last element of one interval === the first element of another interval,
the two should merge (i.e. they count as overlapping)
- an interval can consist of the same num twice
- no negative ints will appear


algorithm:
OPTION 1:
find min and find max.
create array with all nums between min and max inclusive.
allNums = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11

set anchor at 0
set runner at 0

while (runner <= allNums.length) {
  let curr = allNums[runner];
  if !(intervals.some(([first, last]) => first <= curr && last <= curr) {
    results.push([anchor, runner - 1])
    anchor = -1;
  } else if (anchor === -1) {
    anchor = runner;
  }
  runner ++;
}

OPTION 2:
What if we start with them sorted --- by first element?
[7,8], [1,3], [6,11], [2,4] becomes
[1,3], [2,4], [6,11], [7,8]

WHILE intervals.length > 0
(i) check if the first element of second interval is within first interval.
If so, remove first two elements from intervals. merge them, unshift it back.
start over at (i)
If not, shift first element and push it into results.

*/

// sort-based algorithm
function mergeIntervals2(intervals) {
  if (!intervals || intervals.length === 0) return [];

  let sorted = intervals.toSorted((a, b) => a[0] - b[0]);
  let results = [];
  while (sorted.length > 1) {
    if (sorted[1][0] <= sorted[0][1]) {
      sorted.unshift(merge(sorted.shift(), sorted.shift()));
    } else {
      results.push(sorted.shift());
    }
  }

  results.push(sorted.shift());

  return results;
}

function merge(int1, int2) {
  return [Math.min(int1[0], int2[0]), Math.max(int1[1], int2[1])];
}

/*
[2,5], [4,8], [10,12], [13,16]
 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16
[          ]
      [             ]
                        [       ]
                                 [           ]

If currNum is === to the last element of an interval:
  CHECK IF currNum is contained in another interval as well:
    IF YES, keep going
    IF NOT, close out interval


if (!intervals.some(([first, last]) => first <= curr && curr <= last) ||
   (intervals.any(([_, last]) => curr === last) &&
    !intervals.some((first, last) => first <= curr && curr < last)) {
  results.push([allNums[anchor], allNums[runner - 1]]);
  anchor = -1;
} else {
  anchor = runner;
}

runner += 1;

*/
// ANCHOR RUNNER ATTEMPT:
function mergeIntervals(intervals) {
  if (!intervals || intervals.length === 0) return [];

  let lastNums = intervals.map(([_, last]) => last);
  let firstNums = intervals.map(([first, _]) => first);
  let allPossibleNums = getAllNumbers(intervals);
  let results = [];
  let anchor = 0;
  let runner = 0;

  while (runner < allPossibleNums.length) {
    let currNum = allPossibleNums[runner];

    if (lastNums.includes(currNum) && noOverlap(currNum, intervals)) {
      results.push([allPossibleNums[anchor], currNum]);
      anchor = findNextInterval(runner, allPossibleNums, firstNums);
      runner = anchor;
    }

    runner += 1;
  }

  return results;
}

function getAllNumbers(intervals) {
  let min = Math.min(...intervals.flat());
  let max = Math.max(...intervals.flat());
  return Array(1 + max - min).fill().map((_, idx) => idx + min);
}

function noOverlap(num, intervals) {
  return intervals.every(([first, last]) => num < first || num >= last);
}

function findNextInterval(runner, allNums, firstNums) {
  let nextIdx = runner + 1;
  let maxNum = allNums[allNums.length - 1];
  while (allNums[nextIdx] <= maxNum ) {
    if (firstNums.includes(allNums[nextIdx])) break;
    nextIdx += 1;
  }

  return nextIdx;
}

// Test Cases
console.log(mergeIntervals([[7,8], [1,3], [6,11], [2,4]]));
// Expected: [[1,4], [6,11]]

console.log(mergeIntervals([[2,5], [4,8], [10,12], [13,16]]));
// Expected: [[2,8], [10,12], [13,16]]

console.log(mergeIntervals([[3,6], [3,4], [5,8], [7,9]]));
// Expected: [[3,9]]

console.log(mergeIntervals([[1,3], [5,7], [9,11]]));
// Expected: [[1,3], [5,7], [9,11]]

console.log(mergeIntervals([[1,4], [0,4]]));
// Expected: [[0,4]]

console.log(mergeIntervals([[1,4], [2,3]]));
// Expected: [[1,4]]

console.log(mergeIntervals([]));
// Expected: []

console.log(mergeIntervals([[1,4], [4,5]]));
// Expected: [[1,5]]


console.log();


console.log(mergeIntervals2([[7,8], [1,3], [6,11], [2,4]]));
// Expected: [[1,4], [6,11]]

console.log(mergeIntervals2([[2,5], [4,8], [10,12], [13,16]]));
// Expected: [[2,8], [10,12], [13,16]]

console.log(mergeIntervals2([[3,6], [3,4], [5,8], [7,9]]));
// Expected: [[3,9]]

console.log(mergeIntervals2([[1,3], [5,7], [9,11]]));
// Expected: [[1,3], [5,7], [9,11]]

console.log(mergeIntervals2([[1,4], [0,4]]));
// Expected: [[0,4]]

console.log(mergeIntervals2([[1,4], [2,3]]));
// Expected: [[1,4]]

console.log(mergeIntervals2([]));
// Expected: []

console.log(mergeIntervals2([[1,4], [4,5]]));
// Expected: [[1,5]]