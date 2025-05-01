// You are given a circular array of integers where each integer represents a
// jump of its value in the array. For instance, if you're at position i and
// nums[i] = 3, you jump forward 3 positions. If nums[i] = -2, you jump
// backward 2 positions.
// Determine whether the array contains a "cycle" that can be formed by
// following these jumps.

// The cycle must:
// •   Consist of at least two distinct positions
// •   Follow only forward jumps or only backward jumps
// (all positive or all negative)
// •   Return to the starting position

// # Example:
// # Input: [2, -1, 1, 2, 2]
// # Output: true
// # Explanation: There is a cycle from index 0 -> 2 -> 3 -> 0

// # Input: [-1, 2]
// # Output: false
// # Explanation: Can't form a cycle of at least 2 distinct positions

/*
input: array
output: boolean
rules:
- false if input has < 2 els
- false if all cycles involve only 1 elem --> e.g. [-1, 3, 3] has 2 cycles but
both only involve 1 element
- all elems will be either a neg or pos int
- a given element is part of a cycle if we get back to the element after
starting from it e.g. [1, 1, 2] -> only the second and third elements are part
of a cycle, even though we can ENTER that cycle from the first element

algo:
ANCHOR / RUNNER?
-- check each el to see if it results in a valid cycle -- use anchor to keep
track of which elem we're checking and use runner to follow the instrucutions

let anchor = 0;
let runner = 0;
while (anchor < arr.length) {
  runner = followStep(arr, runner)
}
*/

function hasCycle(arr) {
  if (arr.length < 2) return false;
  let anchor = 0;
  let runner = 0;
  let currCycle = [];

  while (anchor < arr.length) {
    while (!currCycle.includes(runner)) {
      currCycle.push(runner);
      runner = followStep(arr, runner);
    }

    if (currCycle.length > 1 && currCycle[0] === runner) return true;
    anchor += 1;
    runner = anchor;
    currCycle = [];
  }

  return false;
}

function followStep(arr, runner) {
  let distance = arr[runner];

  let total = runner + distance;
  let nextIdx;
  if (total > arr.length - 1) {
    nextIdx = total % arr.length;
  } else if (total < 0) {
    nextIdx = total;
    while (nextIdx < 0) {
      nextIdx = arr.length + total;
    }
  } else {
    nextIdx = total;
  }
  return nextIdx;
}

console.log(hasCycle([]) === false);
console.log(hasCycle([1]) === false);
console.log(hasCycle([-1, 3, 3]) === false);
console.log(hasCycle([1, 1, 2]) === true);
console.log(hasCycle([2, -1, 1, 2, 2]) === true);
console.log(hasCycle([1, -1]) === true);
console.log(hasCycle([2, 3, 1, 3, 1]) === true);
