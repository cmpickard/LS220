// Write a function named `minLengthForTargetSum` that
// determines the minimal length of a contiguous subarray
// within an array of positive integers, `nums`. This
// subarray should have a sum that is greater than or
// equal to a specified positive integer, `target`. The
// function should return the length of this subarray.
// If no such subarray exists, return 0.

// Example:
// Input: nums = [4, 2, 5, 7], target = 10
// Output: 2
// Explanation: In this example, the shortest subarray that
//              meets or exceeds the target sum of 10 is [5, 7].
//              This subarray sums to 12, which is greater than
//              the target sum of 10. The length of this
//              subarray is 2.

/*
input: int array + target
output int
rules;
- given an unsorted array of ints and a minimum sum (target), look through
the subarrays of the input and find the shortest subarry whose sum is >= the
min sum.
- if no such subarr exists, return 0
  -- i.e. if adding all the nums in the array together is still not enough to
  be >= target

algorithm:
let minLength = 0;
Not sorted, so best to use anchor/runner?
anchor = 0
runner = 0

Loop (until anchor reaches the last element?)
  Slice array from anchor,runner + 1
  calc sum of slice array
  if sum >= target:
    compare length of slice array to minLength. if minLength >, minLength change
    anchor ++
    runner = anchor
  else if sum < target:
    runner++

  check if runner > array.length
    if so, anchor++, runner = anchor
*/

function minLengthForTargetSum(nums, target) {
  let minLength = Infinity;
  let anchor = 0;
  let runner = 0;

  while (runner < nums.length) {
    let subarr = nums.slice(anchor, runner + 1);
    let sum = subarr.length === 0 ? 0 : subarr.reduce((acc, num) => acc + num);
    if (sum >= target) {
      if (minLength > subarr.length) minLength = subarr.length;
      if (minLength === 1) return minLength;
      anchor += 1;
    } else {
      runner += 1;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

console.log(minLengthForTargetSum([1, 2, 3], 5) === 2);
console.log(minLengthForTargetSum([1, 1, 1], 4) === 0);
console.log(minLengthForTargetSum([8, 2, 1, 4], 8) === 1);
console.log(minLengthForTargetSum([1, 2, 3, 4, 5], 9) === 2);
console.log(minLengthForTargetSum([1, 4, 1, 3, 6, 2], 9) === 2);
console.log(minLengthForTargetSum([1, 2, 3, 4], 10) === 4);
console.log(minLengthForTargetSum([1, 2, 6, 1, 1, 7], 9) === 3);
console.log(minLengthForTargetSum([4, 2, 2, 1, 5, 2], 14) === 5);

// All test cases should log true