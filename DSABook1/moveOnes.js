// Given an array of positive integers, our task is
// to move all ones to the end of the array while preserving
// the relative order of non-one elements. The goal is to solve
// this problem in linear time complexity.

// If no ones are present in the array, no changes are needed.

// Example:
// Input: nums = [1, 2, 1, 4, 8]
// Output: [2, 4, 8, 1, 1]

// BRUTE FORCE APPROACH
/*
algorithm:
- declare coutn = 0
- copy array
- iterate through nums w/ index. for each num:
  -check if === 1. if so, splice out of copy and increment counter

concat remaining array with new array that is just 1, count times in a row
*/

function bruteForceMoveOnes(arr) {
  let count = 0;
  let copy = arr.slice();
  copy.forEach((num, idx) => {
    if (num === 1) {
      count += 1;
      copy.splice(idx, 1);
    }
  });

  return copy.concat(new Array(count).fill(1));
}

let arr = [1,2,1,4,8];
console.log(bruteForceMoveOnes(arr)); // [2,4,8,1,1]

// Pointer Solution
/*
Where does anchor start?
where does runner start?
when does anchor move?
when does runner move?
do anchor and runner do anything else?
when do we stop?

Anchor starts at idx = 0, with the first element?
runner starts at idx = 1

      A     R
1, 1, 3, 2, 1
3, 1, 1, 2, 1
3, 2, 1, 1, 1

Check if anchor is 1
  if not, increment both anchor and runner by 1 START OVER
  if so,
    check if runner is 1:
    if so, increment runner by one and ^ recheck if runner is 1
    if not, swap element at runner with element at anchor
    then increment anchor by 1 and reset runner to new anchor position + 1

  STOP when runner = array.length
*/

function pointersMoveOnes(input) {
  let anchor = 0;
  let runner = 1;
  let arr = input.slice();
  while (runner < arr.length) {
    if (arr[anchor] !== 1) {
      anchor += 1;
      runner += 1;
    } else if (arr[runner] === 1) {
      runner += 1;
    } else {
      [arr[anchor], arr[runner]] = [arr[runner], arr[anchor]];
      anchor += 1;
      runner = anchor + 1;
    }
  }

  return arr;
}

console.log(pointersMoveOnes(arr));
let arr2 = [2, 3, 1, 4];
console.log(pointersMoveOnes(arr2));