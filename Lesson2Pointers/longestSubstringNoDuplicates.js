// Write a function `longestSubstringLength` that finds the
// length of the longest substring without duplicates in a
// given string. The function should take a string as input
// and return an integer representing the length of the longest
// substring without any repeating characters. The input
// string will only contain lowercase characters.

// Example:
// Input: s = "helloworld"
// Output: 5
// Explanation: The longest substring without repeating characters is "world",
// which has a length of 5.

/*
input: string
output: integer
rules:
- output should equal the length of the longest substring of the input where
the substring contain only needs characters, no repeats
- all chars will be lowercase letters

algorithm:

           A   R
 a b c d a a f g
           A       R
 h e l l o w o r l d

 anchor = 0
 runner = 1
 maxLength = 0

 while (runner <= string.length) {
  let substring = string.slice(anchor, runner)
  if (hasDuplicates(substring)) {
    anchor++
  } else {
   if (maxLength < substr.length) maxLength = substr.length
   runner++
 }

 return maxLength

*/

function longestSubstringLength(string) {
  let anchor = 0;
  let runner = 1;
  let maxLen = 0;

  while (runner <= string.length) {
    let substr = string.slice(anchor, runner);
    if (hasDuplicates(substr)) {
      anchor += 1;
    } else {
      if (maxLen < substr.length) maxLen = substr.length;
      runner += 1;
    }
  }

  return maxLen;
}

function hasDuplicates(str) {
  let seen = new Set();
  [...str].forEach(char => seen.add(char));
  return seen.size !== str.length;
}

console.log(longestSubstringLength("a") === 1);
console.log(longestSubstringLength("aa") === 1);
console.log(longestSubstringLength("ab") === 2);
console.log(longestSubstringLength("abba") === 2);
console.log(longestSubstringLength("abc") === 3);
console.log(longestSubstringLength("helloworld") === 5);
console.log(longestSubstringLength("dvdf") === 3);
console.log(longestSubstringLength("tmmzuxt") === 5);
console.log(longestSubstringLength("thisishowwedoit") === 6);
console.log(longestSubstringLength("longestsubstring") === 8);
console.log(longestSubstringLength("aabbccddeffghijklmno") === 10);
console.log(longestSubstringLength("abcdefghijklmnopqrstuvwxyz") === 26);