// Write a method search_rotated that finds the index of a target value in a
// rotated sorted array. The method should return the index of the target value
// if it exists in the array, or -1 if it doesn't exist.
// Test Cases:
// # ruby
/*
[3, 5, 6, 7, 0, 1, 2, 2.5, 2.7], 1
L         M                R

FIND PEAKIDX && PEAK

if TARGET > FIRST
  Search between 0 and peakIdx
else
  Search between peakIdx and lastIdx

*/

function searchRotated(arr, target) {
  let peak = findPeak(arr);
  let [left, right] = (target > arr[0]) ? [0, peak] : [peak, arr.length - 1];

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

function findPeak(arr) {
  let left = 0;
  let right = arr.length;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] > arr[mid + 1] || mid === arr.length - 1) {
      return mid;
    } else if (arr[mid] < arr[0]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0) === 4);
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3) === -1);
console.log(searchRotated([1], 0) === -1);
console.log(searchRotated([1], 1) === 0);
console.log(searchRotated([3, 1], 1) === 1);