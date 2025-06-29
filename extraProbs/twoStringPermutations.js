/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */

// You are given two strings s1 and s2.

// Return true if s2 contains a permutation of s1, or false otherwise.
// That means if a permutation of s1 exists as a substring of s2, then
// return true.

// Both strings only contain lowercase letters.

// Example 1:
// Input: s1 = "abc", s2 = "lecabee"
// Output: true
// Explanation: The substring "cab" is a permutation of "abc" and is
// present in "lecabee".

// Example 2:
// Input: s1 = "abc", s2 = "lecaabee"
// Output: false

/*
input: str1, str2
output: boolean
rules:
- check whether there is any substr of str2 that is a permutation of str1, if so
return TRUE, else FALSE
- a 'permutation' of str1 is any string which contains all and only the same
token chars, but in any order.
- if str1 === '' return TREU

algo:

maybe create a map with a count of all chars in str1
-- that map is constant size (no more than 26!) so space complexity, O(1)
-- then scan through str2, using anchor/runner, starting at 0, going until
runner - anchor === str1.length || runner > str2.length
^
NOT 1 + ...
b/c we'll check this at the beginning of the loop, so the runner will actually
be one index ahead of the end of the substr we're looking for

FOR EACH ITERATION
  -- LOOKUP the count of str2[runner] in our map:
    -- if it returns undefined, shift anchor & runner to runner + 1 & RESET MAP
    -- if it returns 0,:
      -- WHILE str2[anchor] !== str2[runner]:
        -- count of str2[anchor] + 1
        -- anchor++
      -- THEN (once str2[anchor] === str2[runner]),
        -- anchor++
    -- if it returns > 0, subtract 1 from count and keep going

THIS BASICALLY WORKS, BUT WE NEED TO FIGURE OUT HOW TO CHECK FOR A PERM IN A
SPACE / TIME EFFICIENT WAY:
- we are looking at a static window of size === str1.length b/c every valid
permutation must have that length.
- so, we should just be able to slide a window of that size across str2
- let winSize = str1.length;
- let right = winSize - 1;

while (right < str2.length) {
  // CHECK IF CURR WINDOW IS A PERMUTATION, IS SO RETURN TRUE
  left++
  right++
}

RETURN FALSE

HELPER:


*/

function checkInclusion(str1, str2) {
  let chars = new Map();
  for (let char of str1) {
    chars.set(char, 1 + (chars.get(char) || 0));
  }

  let anchor = 0;
  let runner = 0;

  while ((runner - anchor < str1.length) && runner < str2.length) {
    let currChar = str2[runner];
    let currCount = chars.get(currChar);
    if (currCount === undefined) {
      while (anchor < runner) {
        chars.set(str2[anchor], 1 + chars.get(str2[anchor]));
        anchor++;
      }
      anchor++;
    } else if (currCount > 0) {
      chars.set(currChar, chars.get(currChar) - 1);
    } else {
      while (str2[anchor] !== str2[runner]) {
        chars.set(str2[anchor], 1 + chars.get(str2[anchor]));
        anchor++;
      }
      anchor++;
    }
    runner++;
  }

  return (runner - anchor === str1.length);
}

console.log(checkInclusion('abc', 'lecabee') === true);
console.log(checkInclusion('abc', 'lecaabee') === false);
console.log(checkInclusion('', 'lecaabee') === true);
console.log(checkInclusion('a', 'lecabee') === true);
console.log(checkInclusion('abc', 'abc') === true);
console.log(checkInclusion('aaa', 'lecaabee') === false);
console.log(checkInclusion('abcdefghijk', 'kjihgfedcba') === true);