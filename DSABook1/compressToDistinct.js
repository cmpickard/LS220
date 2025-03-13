/* eslint-disable max-len */
// In this assignment, we'll practice the techniques learned so far using the
// "Compress to Distinct" problem. Try to solve the problem using the naive
// (brute-force) approach first, and then see if you can optimize the solution.

// Problem Description
// Given a sorted array of integers, your task is to implement a function
// `compressToDistinct` that modifies the array in-place to ensure
// it starts with a sequence of distinct elements in their original order.
// After making these modifications, the function should return
// the count of these distinct elements.

// The elements in the latter part of the array, after the distinct ones,
// are not important.

// Example:

// If the input array is [3, 3, 5, 7, 7, 8], there are four distinct
// elements: 3, 5, 7, and 8.
// After modifying the array to place these distinct elements at the beginning,
// the resulting array should look like this -> [3, 5, 7, 8, _, _].
// The underscores (_) represent the elements that are no longer important.

// You should name the function `compressToDistinct` for the tests to work
// correctly.

function testCompressToDistinct(array, expectedLength) {
  const originalReference = array;
  const resultLength = compressToDistinct(array);
  const isSameObject = originalReference === array;
  const isLengthCorrect = resultLength === expectedLength;
  const isModifiedCorrectly = array.slice(0, expectedLength).every((val, idx, arr) => idx === 0 || val > arr[idx - 1]);

  return isSameObject && isLengthCorrect && isModifiedCorrectly;
}

console.log(testCompressToDistinct([3, 3, 5, 7, 7, 8], 4));
console.log(testCompressToDistinct([1, 1, 2, 2, 2, 3, 4, 4, 5], 5));
console.log(testCompressToDistinct([0], 1));
console.log(testCompressToDistinct([-5, -3, -3, -1, 0, 0, 0, 1], 5));
console.log(testCompressToDistinct([6, 6, 6, 6, 6, 6, 6], 1));

// All tests should log true.

/*
Input: array of ints
output: an int representing the count of distinct ints
rules:
- the array should be modifed in place -- hence why we're returning a count
rather than the array
- all the distinct numbers present in the input should be pushed to the left,
in the order they appear -- i.e. duplicates don't get moved forward but the
first time we encounter a number, it does get moved forward
- it doesn't matter what values appear at the end of the array, after the list
of distinct elements is complete
  -- e.g. [1, 2, 4, 1, 5, 5, 1, 3] should result in
          [1, 2, 4, 5, 3, ?, ?, ?] where it doesn't matter what the ?s are
          and return 5


datastrucutre:
an int for the count, but otherwise keep the original array for mutation

naive algorithm:
- reduce to arr with uniques
- iterate through input, replacing input[idx] with uniques[idx]
- return size of uniques

*/
//Naive
// function compressToDistinct(arr) {
//   let uniques = arr.reduce((uniques, elem) => {
//     if (!uniques.includes(elem)) uniques.push(elem);
//     return uniques;
//   }, []);

//   uniques.forEach((uniq, idx) => {
//     arr[idx] = uniq;
//   });

//   return uniques.length;
// }

/*
AR
[1, 1, 3, 1, 4]
   A   R
[1, 1, 3, 1, 4]
       A     R
[1, 3, 1, 1, 4]

[1, 3, 4, 1, 1]

Pointer algo:
- set anchor and runner = 0
- let count = 0;
- let seen = [];
while (runner < arr.length):
if seen does not include runner:
  runner value is added to seen
  anchor and runner switch places
  anchor + 1
end
ALWAYS runner + 1;

*/
function compressToDistinct(arr) {
  let anchor = 0;
  let runner = 0;
  let seen = [];

  while (runner < arr.length) {
    if (!seen.includes(arr[runner])) {
      seen.push(arr[runner]);
      [arr[runner], arr[anchor]] = [arr[anchor], arr[runner]];
      anchor += 1;
    }

    runner += 1;
  }

  return seen.length;
}

let unsorted = [1, 1, 4, 1, 5, 9, 9, 10];
console.log(compressToDistinct(unsorted)); // 5
console.log(unsorted); // [1, 4, 5, 9, 10, _, _, _]