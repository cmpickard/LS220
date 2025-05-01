/* eslint-disable max-lines-per-function */
// A mountain array is defined as an array that:
// •   Has at least 3 elements
// •   Has an element that is strictly larger than its adjacent elements
// •   All elements to the left of the peak are in decreasing order
// •   All elements to the right of the peak are in decreasing order
// Find the length of the longest "mountain" subarray within a given array of
// integers.

// # Example:
// # Input: [2, 1, 4, 7, 3, 2, 5]
// # Output: 5 (the mountain subarray is [1, 4, 7, 3, 2])

// # Input: [2, 2, 2]
// # Output: [] (no mountain subarray exists)
// This problem requires identifying ascending and descending patterns using
// pointers.
/*
[2, 1, 2, 1, 4, 5, 4, 7, 10, 1, 1]
    S                        E

[2, 1, 2, 1, 4, 5, 4, 7, 10, 1, 1]
    AR

WHILE (RUnner < arr.length)
FIND L FOOTHILLS PHASE:
  WHILE (A + 1 IS SMALLER THAN OR EQUAL TO A): increment A & R

FIND PEAK PHASE:
  let peaked = false;
  Keep advancing runner until: runner + 1 is < runner
    -- If runner + 1 is = runner (PLATEAU)
      - set anchor = runner + 1,
      - runner = anchor
    -- ELSE
      - set peaked to true

FIND R FOOTHILLS PHASE:
  keep advancing runner until runner + 1 >= runner, then:
    -slice arr from anchor to runner + 1, exclusive
    -calc length of slice
    -if length > currResult.length, currResult = slice.
    -set anchor = runner + 1


*/
function findMountain(arr) {
  let anchor = 0;
  let runner = 0;
  let result = [];
  let peaked = false;

  while (runner < arr.length) {
    if (arr[anchor] >= arr[anchor + 1]) {
      anchor += 1;
      runner += 1;
    } else if (!peaked) {
      if (arr[runner] === arr[runner + 1]) {
        anchor = runner + 1;
      } else if (arr[runner] > arr[runner + 1]) {
        peaked = true;
      }

      runner += 1;
    } else {
      while (arr[runner] > arr[runner + 1]) {
        runner += 1;
      }

      let mountain = arr.slice(anchor, runner + 1);
      if (mountain.length > result.length) result = mountain;
      peaked = false;
      anchor = runner;
    }
  }

  return result;
}

console.log(findMountain([2, 1, 2, 1, 4, 5, 7])); // [1, 2, 1]
console.log(findMountain([2, 1, 2, 1, 4, 5, 4, 7, 10, 1])); // [1, 4, 5, 4]
console.log(findMountain([1, 2, 4, 5, 3, 1])); // [1, 2, 4, 5, 3, 1]
console.log(findMountain([2, 1, 4, 7, 3, 2, 5])); // [1, 4, 7, 3, 2]
console.log(findMountain([2, 2, 2])); // []
console.log(findMountain([2, 1, 2])); // []
console.log(findMountain([2, 1, 0])); // []
console.log(findMountain([2])); // []
console.log(findMountain([1, 2, 4, 4, 3, 1])); // []
