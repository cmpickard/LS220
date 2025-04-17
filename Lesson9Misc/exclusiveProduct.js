// You are given an array of integers. Your task is to create a new array
// where each element is the product of all numbers in the original array
// except the number at that index.

// Implement a function that takes an integer array as input and returns
// a new array where the element at index i is the product of all
// elements in the input array except the element at index i.


// Example 1:

// Input: [2, 3, 4, 5]
// Output: [60, 40, 30, 24]
// Explanation:
// For index 0: 3 * 4 * 5 = 60
// For index 1: 2 * 4 * 5 = 40
// For index 2: 2 * 3 * 5 = 30
// For index 3: 2 * 3 * 4 = 24

// Example 2:

// Input: [-2, 1, -3, 4]
// Output: [-12, 24, -8, 6]
// Explanation:
// For index 0: 1 * (-3) * 4 = -12
// For index 1: (-2) * (-3) * 4 = 24
// For index 2: (-2) * 1 * 4 = -8
// For index 3: (-2) * 1 * (-3) = 6

// Note: Your solution must have a time complexity of O(n).

/*
input; array of ints
output: array of ints, same size
rules:
-solution has time complexity O(N)
-the int at position i of output should = product of all ints in input except
the value at position i in input

algorithm:
can i just do a reduce to find total product, then a map?
for each map iteartion:
  return (maxProduct / nums[idx])?

NOT QUITE
what if the input has 1 zero in it? then the 'max product' will be zero, but
for the single 0 element, there will be a non-zero value

*/

function exclusiveProduct(nums) {
  let firstZeroIdx = nums.findIndex(el => el === 0);
  let maxProduct = nums.reduce((product, num, idx) => {
    return (idx === firstZeroIdx) ? product : product * num;
  }, 1);

  if (firstZeroIdx === -1) {
    return nums.map(num => ((maxProduct / num) ? maxProduct / num : 0));
  } else {
    return nums.map((_, idx) => (idx === firstZeroIdx ? maxProduct : 0));
  }
}

function exclusiveProduct2(nums) {
  let total = 1;
  let prefix = [1];
  for (let idx = 0; idx < nums.length - 1; idx++) {
    total *= nums[idx];
    prefix.push(total);
  }

  total = 1;
  let suffix = [1];
  for (let idx = nums.length - 1; idx > 0; idx--) {
    total *= nums[idx];
    suffix.unshift(total);
  }

  return prefix.map((num, idx) => num * suffix[idx]);
}

// Test cases
console.log(exclusiveProduct([2, 3, 4, 5]));
// Expected: [60, 40, 30, 24]

console.log(exclusiveProduct([-2, 1, -3, 4]));
// Expected: [-12, 24, -8, 6]

console.log(exclusiveProduct([1, 2, 3, 4]));
// Expected: [24, 12, 8, 6]

console.log(exclusiveProduct([0, 1, 2, 3]));
// Expected: [6, 0, 0, 0]

console.log(exclusiveProduct([0, 0, 2, 3]));
// Expected: [0, 0, 0, 0]

console.log(exclusiveProduct([1, 1, 1, 1]));
// Expected: [1, 1, 1, 1]

console.log(exclusiveProduct([2, 1, 5, 3]));
// Expected: [15, 30, 6, 10]

console.log(exclusiveProduct([-1, -1, -1, -1]));
// Expected: [-1, -1, -1, -1]

console.log(exclusiveProduct([10]));
// Expected: [1]

console.log();
console.log(exclusiveProduct2([2, 3, 4, 5]));
// Expected: [60, 40, 30, 24]

console.log(exclusiveProduct2([-2, 1, -3, 4]));
// Expected: [-12, 24, -8, 6]

console.log(exclusiveProduct2([1, 2, 3, 4]));
// Expected: [24, 12, 8, 6]

console.log(exclusiveProduct2([0, 1, 2, 3]));
// Expected: [6, 0, 0, 0]

console.log(exclusiveProduct2([0, 0, 2, 3]));
// Expected: [0, 0, 0, 0]

console.log(exclusiveProduct2([1, 1, 1, 1]));
// Expected: [1, 1, 1, 1]

console.log(exclusiveProduct2([2, 1, 5, 3]));
// Expected: [15, 30, 6, 10]

console.log(exclusiveProduct2([-1, -1, -1, -1]));
// Expected: [-1, -1, -1, -1]

console.log(exclusiveProduct2([10]));
// Expected: [1]