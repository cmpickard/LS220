// Write a function named `minLengthForTargetSum` that
// determines the minimal length of a contiguous subarray
// within an array of positive integers, `nums`. This
// subarray should have a sum that is greater than or
// equal to a specified positive integer, `target`.
// The function should return the length of this
// subarray. If no such subarray exists, return 0.

// The time complexity of your solution should be O(NlogN).

// Example:
// Input: nums = [4, 2, 5, 7], target = 10
// Output: 2
// Explanation: In this example, the shortest subarray that
//              meets or exceeds the target sum of 10 is [5, 7].
//              This subarray sums to 12, which is greater than
//              the target sum of 10. The length of this subarray is 2.

/*
input: UNSORTED array of ints; target value
output: integer -- either positive lenght or 0, if no subarray meets criteria
rules:
- the input array is unsorted
- the goal is to find a subarray such that: (1) the sum of the els of the sub-
array is greater than OR EQUAL TO the target num, (2) the number of els in the
sub-array is the smaller than or equal to all other subarrays that satisfy (1)
- return the length of the subarray(s) that meet the 2 criteria above

ALGORITHM:
Consider:
([1, 2, 5, 4, 3], 9)
the answer is 2 becuase [5,4] is the smallest subarray that sum to 9+

How would we find [5,4] w/ a binary search?
let's do a binsearch where we presume that the middle element is part of the
solution -- so, we're trying to use a binary search to find the smallest subarr
that includes 5 and meets condition 1
[1, 2, 5, 4, 3]

Suppose:
[6,4,2,1,2,7], 10 -> 2 because [6,4]
--> this array blocks a "find max" strategy since 7,2,2 is larger than 6,4

Worst Case:
you can perform a binary search on the length of the array, this way you
can eliminate half the lengths on each iteration

[6,4,2,1,2,7], 10
Lengths:
[0,1,2,3,4,5,6]
 ^     ^     ^
Check if there are any size-3 windows that are greater than or equal to the
target.
If yes, right = mid - 1
If no, left = mid + 1
What is the condition for saying, "Yep, 3 is the right answer?"
since the array contains ONLY positive ints, we know that 3 is the correct
answer when all the windows of size MID that are greater than or equal to the
target are EXACTLY EQUAL to the target -- such that a smaller window would
be guaranteed to be insufficient


*/
function minLengthForTargetSum(nums, target) {
  let possLengths = new Array(nums.length).fill().map((_, idx) => idx + 1);
  let left = 0;
  let right = possLengths.length - 1;
  let mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    let result = findWindowSum(nums, target, possLengths[mid]);
    if (result === 0) {
      return possLengths[mid];
    } else if (result === -1) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return 0;
}

function findWindowSum(nums, target, windowSize) {
  let anchor = 0;
  let runner = 0;
  let currSum = 0;
  let found = false;

  while (runner < windowSize) {
    currSum += nums[runner];
    runner += 1;
  }

  while (runner <= nums.length) {
    if (currSum >= target) return 1;
    if (currSum === target) found = true;
    currSum -= nums[anchor];
    currSum += nums[runner];
    anchor++;
    runner++;
  }

  return found ? 0 : -1;
}


console.log(minLengthForTargetSum([1, 2, 3], 5) === 2);
console.log(minLengthForTargetSum([1, 1, 1], 4) === 0);
console.log(minLengthForTargetSum([8, 2, 1, 4], 8) === 1);
console.log(minLengthForTargetSum([1, 2, 5, 4, 3], 9) === 2);
console.log(minLengthForTargetSum([1, 4, 1, 3, 6, 2], 9) === 2);
console.log(minLengthForTargetSum([1, 2, 3, 4], 10) === 4);
console.log(minLengthForTargetSum([1, 2, 6, 1, 1, 7], 9) === 3);
console.log(minLengthForTargetSum([4, 2, 2, 1, 5, 2], 14) === 5);

// All test cases should log true