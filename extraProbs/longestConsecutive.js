/* eslint-disable max-lines-per-function */
// Given an array of integers nums, return the length of the longest
// consecutive sequence of elements that can be formed.

// A consecutive sequence is a sequence of elements in which each element
// is exactly 1 greater than the previous element. The elements do not
// have to be consecutive in the original array.

// You must write an algorithm that runs in O(n) time.

// Example 1:

// Input: nums = [2,20,4,10,3,4,5]

// Output: 4
// Explanation: The longest consecutive sequence is [2, 3, 4, 5].

// Example 2:

// Input: nums = [0,3,2,5,4,6,1,1]

// Output: 7
// Constraints:

// 0 <= nums.length <= 1000
// -10^9 <= nums[i] <= 10^9

// You should aim for a solution as good or better than
// O(n) time and O(n) space, where n is the size of the input array.


/*
input: int array
output: int (length)
rules:
output should equal length of longest 'sequence' in the input
- a sequence is a series of integers such that each element is 1 larger than
the element to the left
- a sequence is present in an array even if the ints aren't in the correct order
in the array -- or even next to each other

algorithm:
[0,3,2,5,4,6,1,1]

- find max and min in input
create Map
for (key from min to max) {
  map.set(key, false)
}
{0: true, 1: true, 2: true; 3: true; 4: true; 5: true, 6: true}

- iterate through input: for each el
  -map.set(el, true)
end

largestSeq = 1;
counter = 0;
iterate from min to max -- idx
  if (!map.get(idx)) {
    counter = 0
  } else {
    counter + 1
    if (largestSeq < counter) largestSeq = counter
  }
end

return largestSeq
*/

function longestConsecutive(nums) {
  let numMap = new Map();
  let min = Math.min(...nums);
  let max = Math.max(...nums);

  for (let num = min; num <= max; num++) {
    numMap.set(num, false);
  }

  for (let num of nums) {
    numMap.set(num, true);
  }

  let longest = 1;
  let count = 0;

  for (let num = min; num <= max; num++) {
    if (numMap.get(num)) {
      count += 1;
      if (longest < count) longest = count;
    } else {
      count = 0;
    }
  }

  return longest;
}

function longestConsecutive2(nums) {
  let seen = new Set();
  let starts = [];

  for (let num of nums) {
    seen.add(num);
  }

  for (let num of nums) {
    if (!seen.has(num - 1)) starts.push(num);
  }


  let longest = 0;

  for (let start of starts) {
    let curr = start;
    let counter = 0;

    while (seen.has(curr)) {
      counter += 1;
      curr += 1;
    }

    if (longest < counter) longest = counter;
  }

  return longest;
}

console.log(longestConsecutive([2,20,4,10,3,4,5])); // 4
console.log(longestConsecutive([0,3,2,5,4,6,1,1])); // 7

console.log(longestConsecutive2([2,20,4,10,3,4,5])); // 4
console.log(longestConsecutive2([0,3,2,5,4,6,1,1])); // 7