/* eslint-disable max-lines-per-function */
function partition(arr, high, low) {
  let mid = Math.floor((high + low) / 2);
  let pivot = low;
  [arr[mid], arr[pivot]] = [arr[pivot], arr[mid]];
  let left = pivot + 1;
  let right = high;

  while (left <= right) {
    while (arr[left] < arr[pivot] && left <= right) {
      left += 1;
    }

    while (arr[right] > arr[pivot] && left <= right) {
      right -= 1;
    }

    if (left > right) {
      [arr[pivot], arr[right]] = [arr[right], arr[pivot]];
    } else {
      [arr[left], arr[right]] = [arr[right], arr[left]];
    }
  }

  return right;
}

function quickSort(arr, high = arr.length - 1, low = 0) {
  if (high <= low) return arr;
  let pivotIdx = partition(arr, high, low);

  quickSort(arr, pivotIdx - 1, 0);
  quickSort(arr, high, pivotIdx + 1);
  return arr;
}


console.log(quickSort([4,7,1,5,2,3])); // [2,3,1,4,5,7]
console.log(quickSort([10, 4,70,-1,15,-21,3, 0]));