/* eslint-disable max-lines-per-function */
/* eslint-disable id-length */
// Given an integer array nums and an integer k, return the k most frequent
// elements within the array.

// The test cases are generated such that the answer is always unique.

// You may return the output in any order.

// Example 1:

// Input: nums = [1,2,2,3,3,3], k = 2

// Output: [2,3]
// Example 2:

// Input: nums = [7,7], k = 1

// Output: [7]
// Constraints:

// 1 <= nums.length <= 10^4.
// -1000 <= nums[i] <= 1000
// 1 <= k <= number of distinct elements in nums.

/*
You should aim for a solution with O(n) time and O(n) space,
where n is the size of the input array.

algorithm:

*/

function topKElements(nums, k) {
  let count = new Map();
  for (let num of nums) {
    if (count.has(num)) {
      count.set(num, count.get(num) + 1);
    } else {
      count.set(num, 1);
    }
  }

  let buckets = new Array(nums.length).fill().map(_ => []);
  let counts = count.entries().toArray();
  counts.forEach(([num, currCount]) => buckets[currCount].push(num));

  let result = [];
  let idx = buckets.length - 1;
  while (result.length < k && idx > -1) {
    result = result.concat(buckets[idx]);
    idx--;
  }

  return result;
}

console.log(topKElements([1,2,2,3,3,3], 2));