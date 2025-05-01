// Write a method first_occurrence that takes a sorted array and a target value
// The method should return the index of the first occurrence of the target valu
// in the array, or -1 if the target doesn't exist.
// Test Cases:
// p first_occurrence([1, 2, 2, 3, 3, 3, 4, 5], 3) == 3
// p first_occurrence([1, 2, 2, 2, 3, 4, 5], 2) == 1
// p first_occurrence([1, 2, 3, 4, 5], 6) == -1
// p first_occurrence([5, 5, 5, 5, 5], 5) == 0
// p first_occurrence([], 5) == -1

function firstOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target && (mid === 0 || arr[mid - 1] !== target)) {
      return mid;
    } else if (arr[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

console.log(firstOccurrence([1, 2, 2, 3, 3, 3, 4, 5], 3) === 3);
console.log(firstOccurrence([1, 2, 2, 3, 3, 3, 4, 5], 2) === 1);
console.log(firstOccurrence([1, 2, 2, 3, 3, 3, 4, 5], 5) === 7);
console.log(firstOccurrence([1, 2, 3, 4, 5], 6) === -1);
console.log(firstOccurrence([5, 5, 5, 5, 5], 5) === 0);
console.log(firstOccurrence([], 3) === -1);
