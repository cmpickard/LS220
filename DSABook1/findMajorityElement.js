// In this assignment, we'll practice the techniques learned so far using
// the "Find a Majority Element" problem. Try to solve the problem using the
// naive (brute-force) approach first, and then see if you can optimize the
// solution.

// Problem Description

// Given an array of numbers, return its majority element.

// The majority element is the value in the array that appears
// as at least half of the elements in the array.

// It is guaranteed that only one majority element exists in the array.
/*
input: array of ints?
ouput: single int, element of input array
rules:
- our funciton must return the 'majority element' which is defined as the
element that appears X or more times in the array where X is
Math.ceil(array.length / 2)
-

qs:
-no input? too many inputs?
-input not array?
-array sparse? -- does that affect length, as calced for this prob?
-array can contain... negative nums? fractional nums? infinities? NaNs? other
types?
-guaranteed to have a majority element? if not what return?
-empty array?

data structure:
object with all numbers in array as properties and the count of the numbers
as values

algorithm:
-calc minRepetitions -> Math.ceil(array.length / 2)
-reduce the array, using an empty object as acc. for each iteration:
  -check if currNum already in object. if so, increment val by 1; if not,
  add currNum to object and set val = 1
-filter reduction object (using Object.entries?) for a property with count
>= minRepetitions

*/
function findMajority(arr) {
  let minRepetitions = Math.ceil(arr.length / 2);
  let countMap = arr.reduce((countMap, currNum) => {
    if (countMap.has(currNum)) {
      countMap.set(currNum, countMap.get(currNum) + 1);
    } else {
      countMap.set(currNum, 1);
    }
    return countMap;
  }, new Map());

  let entries = countMap.entries();
  for (let idx = 0; idx < countMap.size; idx++) {
    let [num, count] = entries.next().value;
    if (count >= minRepetitions) return num;
  }

  return null;
}

// Test Cases:

console.log(findMajority([6, 4, 4, 6, 4]) === 4);
console.log(findMajority([4, 5, 2, 5, 5, 5, 1]) === 5);
console.log(findMajority([1, 2, 1, 2, 2, 1, 2]) === 2);
console.log(findMajority([1, 2, 3, 1, 4, 4, 1, 1]) === 1);
console.log(findMajority([5, 5, 5]) === 5);

// All test cases should log true