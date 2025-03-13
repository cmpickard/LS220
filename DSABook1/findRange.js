// Implement a function `findRange` that takes in an array of
// integers sorted in ascending order. The function should
// return an array containing the starting and ending
// positions of the number 3 within the array. If the number 3
// is not found, return [-1, -1].

// Example:
// Input: nums = [1, 2, 3, 3, 3, 3, 3, 4, 5]
// Output: [2, 6]

// Example:
// Input: nums = [1, 2, 5, 5, 6, 9, 10]
// Output: [-1, -1]

/*
input: int array, sorted asc
output: 2-element array
rules:
- the output array should have 2 elements: the first is the index where 3 first
appears in the input array. The second is the index where 3 last appears in the
input array. (since the input is sorted, all 3s will be adjacent)
- if there are no 3s, return [-1, -1]


naive algorithm:
- let result = []
arr.forEach (el, idx) -> check if el is 3, if so result.push(idx)
for... loop -> from result[0] to arr.length - 1:
  - if arr[idx] is 3 next
  - if arr[idx] is ~3, result.push(idx - 1)

return result
  */

function naiveFindRange(arr) {
  let result = [];
  for (let idx = 0; idx < arr.length; idx++) {
    if (arr[idx] === 3) {
      result.push(idx);
      break;
    }
  }

  if (result.length === 0) return [-1, -1];

  for (let idx = result[0]; idx < arr.length; idx++) {
    if (arr[idx] !== 3) {
      result.push(idx - 1);
      break;
    }
  }

  if (result.length === 1) result.push(arr.length - 1);
  return result;
}

console.log(naiveFindRange([1, 2, 3, 4])); // [2, 2]
console.log(naiveFindRange([1, 2, 4])); // [-1, -1]
console.log(naiveFindRange([1, 2, 3, 3, 3, 4])); // [2, 4]
console.log(naiveFindRange([1, 2, 3, 3, 3, 3])); // [2, 5]

/*
binary search algorithm:
-pass arr to two helper functions and return results as array:
  findFirst
    input: arr
    output: index of first 3, or -1
  findLast
    input: arr
    output: index of last 3, or -1

findFirst:
left = 0
right = arr.length - 1
while (left <= right) {
  mid = Math.floor((left + right) / 2);
  if arr[mid] is 3 and arr[mid - 1] is not three, return mid
  else if (arr[mid - 1] is 3 OR arr[mid] > 3) right = mid - 1
  else, left = mid + 1
}

return mid === 3 ? mid : -1
*/

function findRange(arr) {
  return [findFirst(arr), findLast(arr)];
}

function findFirst(arr) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === 3 && arr[mid - 1] !== 3) {
      return mid;
    } else if (arr[mid] >= 3) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return (mid === 3) ? mid : -1;
}

function findLast(arr) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === 3 && arr[mid + 1] !== 3) {
      return mid;
    } else if (arr[mid] <= 3) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return (mid === 3) ? mid : -1;
}

console.log(findFirst([1, 2, 3, 3, 3, 4])); // 2
console.log(findFirst([3, 3, 3])); // 0
console.log(findFirst([3, 3, 3, 4])); // 0
console.log(findFirst([0, 1, 2, 3])); // 3
console.log(findFirst([-3, -3, -3])); // -1

console.log(findLast([1, 2, 3, 3, 3, 4])); // 4
console.log(findLast([3, 3, 3])); // 2
console.log(findLast([3, 3, 3, 4])); // 2
console.log(findLast([0, 1, 2, 3])); // 3
console.log(findLast([-3, -3, -3])); // -1

console.log(findRange([1, 2, 3, 3, 3, 4])); // [2, 4]
console.log(findRange([3, 3, 3])); // [0, 2]
console.log(findRange([3, 3, 3, 4])); // [0, 2]
console.log(findRange([0, 1, 2, 3])); // [3, 3]
console.log(findRange([-3, -3, -3])); // [-1, -1]
