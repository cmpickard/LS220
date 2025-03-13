// In this assignment, we'll challenge you with a variation of the
// well-known "Two Sum" problem. Try solving it independently using the
// PEDAC approach we've covered in previous assignments. If you find yourself
// stuck after an hour, feel free to reference our walkthrough. Once you have
// the solution, reverse-engineer it to ensure you understand it fully.
// In a few days, attempt to solve the problem again without looking at the
// answer. This strategy will help with all the remaining practice problems.

// Remember, problem-solving should be enjoyable! Good luck, and have fun!

// Problem Description
// Given a list of numbers,
// find two numbers in the list that add up to ten
// and return them. If no such pair exists, return null.

// It is guaranteed that there is either exactly one pair of numbers
// that satisfies the condition, or no pairs at all.

/*
Input: an array of numbers

Output: either null or a 2-element array

Rules:
- the returned array should have 2 numbers from the input array that sum to 10
- the input array is guaranteed to have either exactly 1 pair of nums that sum
to 10 OR no pairs that sum to 10.
- if no pairs sum to 10 return null
- array can contain negative nums

Questions:
-No input?
-Too many args?
-Input not an array?
-empty array?
-Sparse array?
-Array contains non-numbers?
-Array contains Infinities / NaNs?
-fractional nums?
-

Data Structure:
create a 2D array with allPairs

Algo:
- pass input array to allPairs
- filter allPairs arry: keep all and only those elements that sum to 10
- if filtered result has 1 element return it. if empty return null


HELPERFUNCTION: allPairs
-input: array of nums
-output: 2D array, with each element a 2-element array of nums

create empty result array

iterate through all the elements of the input arr except the last one. for each:
iterate through all of the elements with an index larger than the index of the
element the outer loop is iterating on. For each inner loop:
create an array using the current outerloop element and teh current inner loop
element and push it into the result array

return the result array

*/

function findPair(array) {
  let pairs = allPairs(array);
  let tens = pairs.filter(([num1, num2]) => num1 + num2 === 10);
  return tens[0] || null;
}

function allPairs(array) {
  let result = [];
  for (let outerIdx = 0; outerIdx < array.length - 1; outerIdx++) {
    for (let innerIdx = 1 + outerIdx; innerIdx < array.length; innerIdx++) {
      result.push([array[outerIdx], array[innerIdx]]);
    }
  }

  return result;
}

// Test Cases:
console.log(findPair([2, 3, 9, 7])); // Output: [3, 7]
console.log(findPair([10, 6, -1, 2])); // null
console.log(findPair([1, 2, 5, 6])); // null
console.log(findPair([1, 3, 6, 10, 4, 5])); // [6, 4]
console.log(findPair([4, -5, 3, 15, 5])); // [-5, 15]
console.log(findPair([])); // null

// REFACTORING:
function findPair2(array) {
  for (let outerIdx = 0; outerIdx < array.length - 1; outerIdx++) {
    let first = array[outerIdx];
    for (let innerIdx = 1 + outerIdx; innerIdx < array.length; innerIdx++) {
      let second = array[innerIdx];
      if (first + second === 10) return [first, second];
    }
  }
  return null;
}

console.log(findPair2([2, 3, 9, 7])); // Output: [3, 7]
console.log(findPair2([10, 6, -1, 2])); // null
console.log(findPair2([1, 2, 5, 6])); // null
console.log(findPair2([1, 3, 6, 10, 4, 5])); // [6, 4]
console.log(findPair2([4, -5, 3, 15, 5])); // [-5, 15]
console.log(findPair2([])); // null
