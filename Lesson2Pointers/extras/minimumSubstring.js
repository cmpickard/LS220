// Given two strings, string and pattern, find the minimum substring in string
// that contains all characters from pattern.

// # Example:
// # Input: string = "ADOBECODEBANC", pattern = "ABC"
// # Output: "BANC"
// #
// # Input: string = "aaaaaaaaaaaabbbbbcdd", pattern = "abcdd"
// # Output: "abbbbbcdd"

function minimumSubstring(str, pattern) {
  if (str.length < pattern.length) return '';
  let charCount = countChars(pattern);
  let anchor = 0;
  let minWin = pattern.length;
  let runner = minWin - 1; // minimum window size
  let result = str;
  while (runner < str.length) {
    let window = str.slice(anchor, runner + 1);
    if (hasAllCharsFrom(charCount, window)) {
      anchor += 1;
      if (result.length > window.length) result = window;

    } else {
      runner += 1;
    }
  }

  return result;
}

function countChars(str) {
  return [...str].reduce((count, char) => {
    if (count[char]) {
      count[char] += 1;
    } else {
      count[char] = 1;
    }

    return count;
  }, {});
}

function hasAllCharsFrom(charCount, string) {
  let stringChars = countChars(string);
  return Object.entries(charCount).every(([char, count]) => {
    return count <= stringChars[char];
  });
}

console.log(minimumSubstring('ADOBECODEBANC','ABC') === 'BANC');
console.log(minimumSubstring("aaaaaaaaaaaabbbbbcdd",'abcdd') === 'BANC');