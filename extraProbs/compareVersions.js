// To look at the steps of this problem solving approach in depth, we will work
// through a problem and see how to apply each step in the process. The problem
// we will look at compares software version numbers.

// While version numbers often appear to be decimal numbers, they are, in fact,
// a convenient notation for a more complicated number system. The following are
// all legal version numbers:

// 1
// 1.0
// 1.2
// 3.2.3
// 3.0.0
// 4.2.3.0
// Write a function that takes any two version numbers in this format and
// compares them, with the result of this comparison showing whether the first
// is less than, equal to, or greater than the second version:

// If version1 > version2, we should return 1.
// If version1 < version2, we should return -1.
// If version1 === version2, we should return 0.
// If either version number contains characters other than digits and
// the . character, we should return null.
// Here is an example of version number ordering:
// 0.1 < 1 = 1.0 < 1.1 < 1.2 = 1.2.0.0 < 1.18.2 < 13.37

/*
input: 2 version numbers, as strings
output: 1 OR 0 OR -1 OR NULL
rules:
-if input has chars outside of [0-9.], return null
-return null if either input otherwise has incorrect form:
  -- e.g. more than 1 period in a row
  -- leading period
  -- trailing period
  -- 2+ zeroes in a row?
- if the first input str is > the second, return 1, if less than return -1,
if equal, return 0
  --RULES FOR COMPARISON:
    -imagine the version num as a sequence of nums, each separated by a comma
    -first we compare the first num in the sequence from each input:
      --if one is smaller than the other, the smaller one is the smaller vers
      number, ELSE they must be equal
      -if they were equal, compaare the second nums. same rules as before
      -this keeps going until we either hit a pair of nums that are unequal or
      we run out of nums. -- in the latter case we conclude the two are equal
      -if the two vers have diff amounts of nums, assume the smaller one has
      0's for all the missing slots:
      2.3, 2.3.0.12
      ^
      2.3.0.0 vs. 2.3.0.12

DATA STRUCUTRE
an array of nums for each input
OR: two pointers -> two for each? (an anchor runner?)

ALGORITHM
1) Validate input
  -check for chars that aren't in [0-9.]
  -check for leading periods
  -check for trailing periods
  -check for doubled+ periods
RETURN NULL IF INVALID

2) Convert each to an array of nums
  -- split on '.'
  -- map strs to nums
3) if one arr is shorter, fill it out with zeroes
4) iterate through one array, with index. Use for loop so we can return early
  -compare arr1[idx] with arr2[idx]
    -- if arr1[idx] smaller, return -1
    -- if lerger, return 1
    -- if same, continue
5) return 0 (if we make it to this point, they are the same)

*/

function compareVersions(vers1, vers2) {
  if (isInvalid(vers1) || isInvalid(vers2)) return null;

  let pointer1 = 0;
  let nextNum1;
  let pointer2 = 0;
  let nextNum2;

  while (vers1[pointer1] !== undefined || vers2[pointer2] !== undefined) {
    [nextNum1, pointer1] = getNextNum(vers1, pointer1);
    [nextNum2, pointer2] = getNextNum(vers2, pointer2);
    if (nextNum1 < nextNum2) {
      return -1;
    } else if (nextNum1 > nextNum2) {
      return 1;
    }
  }

  return 0;
}

function getNextNum(vers, start) {
  if (vers[start] === undefined) return [0, start];

  let pointer = start;
  let result = '';

  while (vers[pointer] !== '.' && vers[pointer] !== undefined) {
    result += vers[pointer];
    pointer++;
  }

  return [Number(result), pointer + 1];
}

function isInvalid(vers) {
  if (/[^.0-9]/.test(vers) || /\.\./.test(vers) || vers[0] === '.' ||
  vers[vers.length - 1] === '.' || vers.length === 0) {
    return true;
  } else {
    return false;
  }
}

// bad input tests
console.log(compareVersions('k', '') === null);
console.log(compareVersions('k', 'm') === null);
console.log(compareVersions('', '') === null);
console.log(compareVersions() === null);
console.log(compareVersions('.0.1', '1') === null);
console.log(compareVersions('0.1', '1.') === null);
console.log(compareVersions('1..1', '1') === null);
console.log(compareVersions('1a', '1.9b') === null);

// // good input tests
console.log(compareVersions('1.0', '1') === 0);
console.log(compareVersions('1.0', '1.1') === -1);
console.log(compareVersions('1.0.0', '1.1') === -1);
console.log(compareVersions('1.0.0.0', '1') === 0);
console.log(compareVersions('1', '0.1') === 1);
console.log(compareVersions('1.1', '1.0.1') === 1);
console.log(compareVersions('1.1', '1.2') === -1);
console.log(compareVersions('1.2', '1.2.0.0') === 0);
console.log(compareVersions('1.2.0.0', '1.18.2') === -1);
console.log(compareVersions('13.37', '1.18.2') === 1);
