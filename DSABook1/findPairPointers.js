// Given a sorted array in ascending order, our task is to find two numbers
// in the array that sum up to a target number, and return them.

// If you don't find a pair that adds up to the target, return null.

// The order of the output array matters, and the number that appears first
// should be the first one in the output array.

// The problem guarantees that there will be either one
// unique pair that matches the target sum or no pairs at all.

/*
algo:
-init start at index 0
-init end at index arr.length - 1;
LOOP:
  - evaluate startNum + endNum:
    -if equal return [startNum, endNum]
    -if < target, increment start
    -if > target, decrement end

return null
*/
function findPair(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let currSum = arr[start] + arr[end];
    if (currSum === target) return [arr[start], arr[end]];
    if (currSum < target) start += 1;
    if (currSum > target) end -= 1;
  }

  return null;
}

// Test Cases:
const nums1 = [1, 3, 6, 7, 8, 12];
const target1 = 14;
console.log(findPair(nums1, target1)); // Output: [6, 8]

const nums2 = [2, 6, 8, 10];
const target2 = 17;
console.log(findPair(nums2, target2)); // null