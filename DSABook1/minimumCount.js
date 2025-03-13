// Given an array `nums` sorted in ascending order, determine
// the minimum between the count of positive integers and the
// count of negative integers.

// Please note that the number `0` is neither positive nor negative.

// All test cases should log true.

/*
input; sorted arry of nums
out; Minimum of this list: (number of positive ints, number of negative ints)

rules:
-0 is neither positive nor negative
-return 0 if empty array (bc there are 0 pos and negs, and 0 is the min of 0,0)
-

ds
stick with the arr

naive algo
- posCount and negCount set to zero
- iterate through array. for each, assess whether pos or neg or zero
  -increment relevant counter

- return Math.min((posCount, negCount))
*/

function naiveMinimumCount(arr) {
  let posCount = 0;
  let negCount = 0;
  arr.forEach(num => {
    if (num > 0) posCount += 1;
    if (num < 0) negCount += 1;
  });

  return Math.min(posCount, negCount);
}

console.log(naiveMinimumCount([-4, -3, -2, -1, 3, 4]) === 2);
console.log(naiveMinimumCount([-3, 1, 2, 3, 4, 5]) === 1);
console.log(naiveMinimumCount([-5, -4, -3, -2, -1]) === 0);
console.log(naiveMinimumCount([1, 2, 3, 4, 5]) === 0);
console.log(naiveMinimumCount([-2, -1, 1, 2]) === 2);
console.log(naiveMinimumCount([-7, -5, -4, 1, 2, 6, 10]) === 3);
console.log(naiveMinimumCount([-3, -2, -1, 0, 5, 6]) === 2);
console.log(naiveMinimumCount([-1, 0, 1]) === 1);
console.log(naiveMinimumCount([]) === 0);

/*
BINARY SEARCH ALGORITHM

i think i can get away with 2 binary searches?
- one for lastNegative
- one for firstPositive

then i can calculate
countNeg = lastNegative + 1
countPos = arr.length - firstPositive

return Math.min(countNeg, countPos)

Algo for lastNegative:
left = 0
right = arr.length - 1

while (left <= right) {
  mid = Math.floor((left + right) / 2);
  if (arr[mid] < 0 && arr[mid + 1] >= 0) return mid
  else if (arr[mid] < 0) left = mid + 1
  else right = mid - 1;
}

return mid

*/

function minimumCount(arr) {
  let lastNeg = findLastNegative(arr);
  let firstPos = findFirstPositive(arr);
  let numNegs = (lastNeg === -1) ? 0 : lastNeg + 1;
  let numPos = (firstPos === -1) ? 0 : arr.length - firstPos;
  return Math.min(numNegs, numPos);
}

function findLastNegative(arr) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] < 0 && arr[mid + 1] >= 0) {
      return mid;
    } else if (arr[mid] < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return arr[mid] < 0 ? mid : -1;
}

function findFirstPositive(arr) {
  let left = 0;
  let right = arr.length - 1;
  let mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] > 0 && arr[mid - 1] <= 0) {
      return mid;
    } else if (arr[mid] > 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return arr[mid] > 0 ? mid : -1;
}

console.log('binary function results:');
console.log(minimumCount([-4, -3, -2, -1, 3, 4]) === 2);
console.log(minimumCount([-3, 1, 2, 3, 4, 5]) === 1);
console.log(minimumCount([-5, -4, -3, -2, -1]) === 0);
console.log(minimumCount([1, 2, 3, 4, 5]) === 0);
console.log(minimumCount([-2, -1, 1, 2]) === 2);
console.log(minimumCount([-7, -5, -4, 1, 2, 6, 10]) === 3);
console.log(minimumCount([-3, -2, -1, 0, 5, 6]) === 2);
console.log(minimumCount([-1, 0, 1]) === 1);
console.log(minimumCount([]) === 0);
