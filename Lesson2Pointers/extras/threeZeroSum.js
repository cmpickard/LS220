// Given an array of integers, find all unique triplets in the array that
// sum to zero.
// # ruby

// # Example:
// # Input: [-1, 0, 1, 2, -1, -4]
// # Output: [[-1, -1, 2], [-1, 0, 1]]
// #
// # Input: [0, 0, 0, 0]
// # Output: [[0, 0, 0]]


function threeZeroSum(arr) {
  arr.sort((a, b) => a - b);
  let results = [];
  arr.forEach((first,idx) => {
    let target = (first === 0) ? 0 : -1 * first;
    let pairs = twoSumToTarget(arr.toSpliced(idx, 1), target);
    if (pairs) pairs.forEach((pair) => {
      let newPair = ([first].concat(pair)).sort((a, b) => a - b);
      if (lacksTrio(results, newPair)) results.push(newPair);
    });
  });

  return results;
}

function lacksTrio(arrs, trio) {
  return !arrs.some((arr) => arr.every((el, idx) => el === trio[idx]));
}

function twoSumToTarget(arr, target) {
  let results = [];
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let sum = arr[start] + arr[end];
    if (sum > target) {
      end -= 1;
    } else if (sum < target) {
      start += 1;
    } else {
      results.push([arr[start], arr[end]]);
      start += 1;
    }
  }

  return results;
}

console.log(threeZeroSum([-1, 0, 1, 2, -1, -4])); // [[-1, -1, 2], [-1, 0, 1]]
console.log(threeZeroSum([0, 0, 0, 0])); // [[0,0,0]]