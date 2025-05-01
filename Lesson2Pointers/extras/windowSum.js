/* eslint-disable max-lines-per-function */
// Given an array of integers and a target value, find the contiguous
// subarray whose sum is closest to the target value. Return the sum of
// this subarray.

// # Example:
// # Input: [4, 9, 3, 7, 8], target = 15
// # Output: 15 (from the subarray [7, 8])

// # Input: [2, 3, 5, 8, 1, 3], target = 12
// # Output: 12 (from the subarray [8, 1, 3])

/*
input is not sorted, so maybe can't use start/end strat
OR, maybe i need to do a sort step first
TARGET: 15
ANS: 15

[4,9,3,7,8]
       A R

under what conditions would I know to move the anchor?
ANSWER: when the currSum is larger than target

ALGO:
--sort
--anchor = 0
--runner = 0
let sum = 0;
let result = Infinity;

while (runner < arr.length) {
  sum += arr[runner];
  if (Math.abs(target - sum) < Math.abs(target - result)) result = sum;

  if (sum > target) {
    sum -= array[anchor];
    anchor += 1;
  }

  runner++;
}

*/

function findClosestSum(arr, target) {
  if (!arr || arr.length === 0) return null;
  let result = arr[0];
  let anchor = 0;
  let runner = 0;
  let curSum = arr[0];

  while (runner < arr.length) {

    if (Math.abs(target - result) > Math.abs(target - curSum)) result = curSum;

    if (curSum > target) {
      curSum -= arr[anchor];
      anchor += 1;
    } else {
      runner += 1;
      curSum += arr[runner];
    }

    if (runner < anchor) {
      runner = anchor;
      curSum = arr[runner];
    }
  }

  return result;
}

console.log(findClosestSum([4,9,3,7,8], 15) === 15);
console.log(findClosestSum([2,3,5,8,1,3], 12) === 12);
console.log(findClosestSum([2,3,5,8,1,3], 10) === 10);
console.log(findClosestSum([8,4,5,6,7], 1) === 4);
console.log(findClosestSum([4], 100) === 4);
console.log(findClosestSum([], 10) === null);