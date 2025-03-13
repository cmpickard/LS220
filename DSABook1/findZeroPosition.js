// Write a function named `findZeroPosition` that takes in a
// sorted array of distinct integers as input.
// The function should return the index where the value 0 is
// found in the array, or the index where it would be inserted if
// it were not found.

// If the value 0 is found in the array, the function should
// return the index of the value 0. If the value 0 is not found,
// the function should return the index where it would be inserted
// while maintaining the sorted order of the array.

// Example:
// Input: nums = [-7, -5, -3, 0, 2]
// Output: 3

// Example:
// Input: nums = [3, 5, 7, 9, 11]
// Output: 0

/*
input: int array, in asc order
output: int corresponding to index or position where 0 would be placed
rules:
- check arr for 0 and return the index, if found.
- if 0 is not found, return the index where it would be inserted to maintain
sorted order

naive algo:
- initialize last seen as -Infinity
iterate through the array with idx and el. for each iteration:
  -check if el = 0. if so return current idx
  -if not, check if lastSeen < 0 < el. if so, return idx. if not, lastSeen = el

*/

// NAIVE SOLUTION
function findZeroPosition(arr) {
  let lastSeen = -Infinity;
  for (let idx = 0; idx < arr.length; idx++) {
    let el = arr[idx];
    if (el ===  0 || (lastSeen < 0 && 0 < el)) return idx;
    lastSeen = el;
  }

  return arr.length - 1;
}

console.log(findZeroPosition([-10, -1, 2, 3])); // 2
console.log(findZeroPosition([2, 3, 5, 10])); // 0
console.log(findZeroPosition([-10, -1, 0, 3])); // 2

// BINARY SEARCH SOLUTION
/*
algorithm:
- left = 0;
- right = arr.length - 1;

while loop: while left <= right:
  calc mid as avg of left and right, rounded down (Math.floor(left + right / 2))
  if (mid === 0) return mid
  if (mid > 0) right = mid - 1;
  if (mid < 0) left = mid + 1;
end

return mid;
*/

function binaryFindZeroPosition(arr) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  while (left <= right) {
    mid = Math.floor((right + left) / 2);
    let midVal = arr[mid];
    if (midVal === 0) {
      return mid;
    } else if (midVal < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

console.log(binaryFindZeroPosition([-10, -1, 2, 3])); // 2
console.log(binaryFindZeroPosition([2, 3, 5, 10])); // 0
console.log(binaryFindZeroPosition([-10, -8, -8, -5, -3, -1])); // 6
console.log(binaryFindZeroPosition([-10, -1, 0, 3])); // 2