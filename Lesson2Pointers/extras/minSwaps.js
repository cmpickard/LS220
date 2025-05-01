// Given an array of integers, calculate the minimum number of swaps required
// to sort the array in ascending order.

// # Example:
// # Input: [4, 3, 1, 2]
// # Output: 3
// # Explanation:
// # Swap 4 and 1: [1, 3, 4, 2]
// # Swap 3 and 2: [1, 2, 4, 3]
// # Swap 4 and 3: [1, 2, 3, 4]

// # Input: [1, 3, 5, 2, 4, 6, 7]
// # Output: 3 (swap 5 & 4, swap 2 and 3, swap 3 and 4)

/*
ca i just do a selection sort and count the swaps?
-- it's possible that two elements are in EACH OTHER'S position
(or will become that way after making other nec swaps) in which case we get
two elements correctly positioned for the price of one swap, and i don't THINK
that fact will show up in a selection sort?
Or, it might, but that's no guarantee?

*/

function minSwaps(arr) {
  let count = 0;

  for (let curr = 0; curr < arr.length - 1; curr++) {
    let minIdx = curr;
    for (let scanIdx = curr + 1; scanIdx < arr.length; scanIdx++) {
      if (arr[scanIdx] < arr[minIdx]) minIdx = scanIdx;
    }

    if (minIdx !== curr) {
      count += 1;
      [arr[curr], arr[minIdx]] = [arr[minIdx], arr[curr]];
    }
  }

  return count;
}

console.log(minSwaps([4, 3, 1, 2]));
console.log(minSwaps([1, 3, 5, 2, 4, 6, 7]));