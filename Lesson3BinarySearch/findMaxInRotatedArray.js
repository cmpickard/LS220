"use strict";
/* eslint-disable max-len */
// Write a function `findMax` that finds the maximum element in
// a rotated sorted array.

// A rotated sorted array is an array that was originally sorted
// in ascending order, but has been rotated (shifted) by some
// number of positions. The function should take an array of
// integers as input, representing the rotated sorted array,
// and it should return the maximum element in the array.
// The array is guaranteed to have at least one element.

// The solution should be in O(logN) time complexity.

// Example:
// Input: nums = [8, 9, 10, 2, 5, 6]
// Output: 10
// Explanation: The original sorted array [2, 5, 6, 8, 9, 10]
//              was rotated 3 times.

/*
I think i'm looking for the spot where there are two adjacent elements such
that the left element is larger than the right element. The largest element
in the array will the be left element of that pair.
In one situation will that not be true: when the array was not rotated.
  -- I could check for that by verifying that arr[last] > arr[first], that will
  be true ONLY when there are no rotations

to verify that logic let's look at all possible rotations:
[2, 5, 6, 8, 9, 10] --> what about this situation? SOLVED


It looks like I shold compare nums[mid] with nums[right].
If (nums[mid] < nums[right])
  right = mid - 1
else if (nums[mid] > nums[right])
  left = mid + 1


[10, 2, 5, 6, 8, 9] move RIGHT
        ^
[9, 10, 2, 5, 6, 8] move RIGHT
        ^
[8, 9, 10, 2, 5, 6]
        ^ (SOLVED)
[6, 8, 9, 10, 2, 5] move LEFT
       ^
[5, 6, 8, 9, 10, 2] move LEFT
       ^

How do i know which pointer to shift when nums[mid] is less than nums[mid + 1]?


*/

function findMax(nums) {
  if (nums[nums.length - 1] > nums[0]) return nums[nums.length - 1];
  if (nums.length === 1) return nums[0];

  let left = 0;
  let right = nums.length - 1;
  let mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      break;
    } else if (nums[mid] < nums[nums.length - 1]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return nums[mid];
}

console.log(findMax([8, 9, 10, 2, 5, 6]) === 10);
console.log(findMax([15, 18, 2, 3, 6, 12]) === 18);
console.log(findMax([7, 8, 2, 3, 4, 5, 6]) === 8);
console.log(findMax([3, 1]) === 3);
console.log(findMax([5]) === 5);
console.log(findMax([9, 10, 11, 12, 13, 14, 15, 1, 2, 3]) === 15);
console.log(findMax([4, 5, 1, 2, 3]) === 5);
console.log(findMax([23, 34, 38, 40, 41, 14, 15, 16, 17, 18, 19, 20, 21]) === 41);
console.log(findMax([100, 200, 300, 400, 500]) === 500);
console.log(findMax([45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 44]) === 63);
console.log(findMax([11, 13, 15, 17, 19, 21, 1, 3, 5, 7, 9]) === 21);