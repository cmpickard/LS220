// In this assignment, we'll again apply the techniques learned so far by
// solving the "Reverse Consonants" problem. Try to solve the problem
// using the naive (brute-force) approach first, and then see if you can
// optimize the solution.

// Problem Description
// Given a string `str`, reverse all the consonants in the string and return it.
// Consonants are all alphabetic characters except for the
// vowels `'a'`, `'e'`, `'i'`,
// `'o'`, and `'u'`, which can appear in both lower and upper cases.
// The consonants can appear more than once in the string.

// console.log(reverseConsonants("") === "");
// console.log(reverseConsonants("s") === "s");
// console.log(reverseConsonants("HELLO") === "LELHO");
// console.log(reverseConsonants("leetcode") === "deectole");
// console.log(reverseConsonants("example") === "elapmxe");
// console.log(reverseConsonants("Consonants") === "sotnonasnC");

// All test cases should log true

/*
input: string
output: string
rules:
- case doesn't matter
- each vowel stays in the same spot where it appears
- the first consonant swaps places with teh last consonant; the second consonant
swaps places with the second-to-last, etc.
- if there is an odd number of consonants, the middle consonant stays put
- vowels are aeiou and AEIOU
- each particular consonant can occur any number of times

datastructure:
array of chars

BRUTE FORCE algorithm:
-convert input string into array of chars
- use delete operator to remove consonants and leave an empty slot. save each
consonant we delete in a separate array. reverse that array. then iterate back
through the char array, inserting the next consonant is each empty slot

-return reversed array after joining
*/

function reverseConsonants(str) {
  let chars = [...str];
  let consonants = [];
  const CONSONANT_LIST = /[bcdfghjklmnpqrstvwxyz]/i;

  chars.forEach((char, idx) => {
    if (CONSONANT_LIST.test(char)) {
      consonants.push(char);
      chars[idx] = undefined;
    }
  });

  for (let idx = 0; idx < chars.length; idx++) {
    if (!chars[idx]) {
      chars[idx] = consonants.pop();
    }
  }

  return chars.join('');
}

console.log(reverseConsonants("") === "");
console.log(reverseConsonants("s") === "s");
console.log(reverseConsonants("HELLO") === "LELHO");
console.log(reverseConsonants("leetcode") === "deectole");
console.log(reverseConsonants("example") === "elapmxe");
console.log(reverseConsonants("Consonants") === "sotnonasnC");

// POINTER approach
/*
Algorithm:

S             E
l e e t c o d e

-start at 0; end at chars.length - 1
-increment start if chars[start] is vowel; decrement end if chars[end] is vowel
-if both are consonants, swap positions then increment / decrement

*/

function pointerReverseConsonants(str) {
  let chars = [...str];
  let start = 0;
  let end = chars.length - 1;
  const CONSONANT_LIST = /[bcdfghjklmnpqrstvwxyz]/i;

  while (start <= end) {
    if (!CONSONANT_LIST.test(chars[start])) start += 1;
    if (!CONSONANT_LIST.test(chars[end])) end -= 1;
    if (CONSONANT_LIST.test(chars[start]) && CONSONANT_LIST.test(chars[end])) {
      [chars[start], chars[end]] = [chars[end], chars[start]];
      start += 1;
      end -= 1;
    }
  }

  return chars.join('');
}

console.log(pointerReverseConsonants("") === "");
console.log(pointerReverseConsonants("s") === "s");
console.log(pointerReverseConsonants("HELLO") === "LELHO");
console.log(pointerReverseConsonants("leetcode") === "deectole");
console.log(pointerReverseConsonants("example") === "elapmxe");
console.log(pointerReverseConsonants("Consonants") === "sotnonasnC");