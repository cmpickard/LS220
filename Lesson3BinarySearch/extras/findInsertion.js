// Write a function searchInsertPosition that takes a sorted array and a
// target value.
// The function should return the index where the target should be inserted
// to maintain the sorted order.

// javascript

/*
put the new element BEFORE any idential elements
*/

function searchInsertPosition(arr, target) {
  let left = 0;
  let len = arr.length;
  let right = len - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < target && (arr[mid + 1] >= target || mid === len - 1)) {
      return mid + 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

console.log(searchInsertPosition([1, 3, 5, 6], 5) === 2);
console.log(searchInsertPosition([1, 3, 5, 6], 2) === 1);
console.log(searchInsertPosition([1, 3, 5, 6], 7) === 4);
console.log(searchInsertPosition([1, 3, 5, 6], 0) === 0);