/* eslint-disable max-len */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
// You are given two strings. Your task is to find the length of
// the longest subsequence that is shared between both strings.

// A subsequence is a sequence that can be derived from another
// sequence by deleting some or no elements without changing the
// order of the remaining elements. For example, "ace" is a
// subsequence of "abcde".

// Implement a function `longestSharedSubsequence` that takes
// two strings as input and returns the length of the longest
// shared subsequence between them.

// Example 1:
// Input: str1 = "abcde", str2 = "ace"
// Output: 3
// Explanation: The longest shared subsequence is "ace" and its length is 3.

// Example 2:
// Input: str1 = "abcbdab", str2 = "bdcaba"
// Output: 4
// Explanation: There are three shared subsequences with length 4.
//              'bcab', 'bcba', and 'bdab'.

// Example 3:
// Input: str1 = "xmjyauz", str2 = "mzjawxu"
// Output: 4
// Explanation: The longest shared subsequence is "mjau".

/*
input: two strings
output: an integer
rules:
-the output should equal the length of the longest subsequence between the two
input strings
- a subsequence is a series of characters that appears in the same order in
both strs but NOT nec in the same place in the string NOR nec with the same
intervening letters e.g. 'abc' and 'gqanjbc' both have 'abc' as a subseq

algorithm:
*/

function longestSharedSubsequenceRecursive(s1, s2) {
  // Implementation goes here
}

function longestSharedSubsequenceIterative(s1, s2) {
  const rows = s1.length + 1;
  const cols = s2.length + 1;
  const dp = Array(rows).fill().map(() => Array(cols).fill(0));

  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      if (s1[row - 1] === s2[col - 1]) {
        dp[row][col] = 1 + dp[row - 1][col - 1];
      } else {
        dp[row][col] = Math.max(dp[row][col - 1], dp[row - 1][col]);
      }
    }
  }

  return dp[rows - 1][cols - 1];
}
/*
  a a
a 1 1
a 1 2
a 1 
a 1
*/
// Test cases
// console.log(longestSharedSubsequenceRecursive("abcde", "ace") === 3);
// console.log(longestSharedSubsequenceRecursive("abcbdab", "bdcaba") === 4);
// console.log(longestSharedSubsequenceRecursive("xmjyauz", "mzjawxu") === 4);
// console.log(longestSharedSubsequenceRecursive("abcdgh", "aedfhr") === 3);
// console.log(longestSharedSubsequenceRecursive("aggtab", "gxtxayb") === 4);
// console.log(longestSharedSubsequenceRecursive("aaaa", "aa") === 2);
// console.log(longestSharedSubsequenceRecursive("aaaa", "bb") === 0);
// console.log(longestSharedSubsequenceRecursive("", "abcd") === 0);
// console.log(longestSharedSubsequenceRecursive("abcd", "") === 0);
// console.log(longestSharedSubsequenceRecursive("", "") === 0);
// console.log(longestSharedSubsequenceRecursive("a", "a") === 1);
// console.log(longestSharedSubsequenceRecursive("zyxwvutsrqp", "abcdefghijklmnop") === 1);
// console.log(longestSharedSubsequenceRecursive("abcabcabc", "acbacbacb") === 6);
// console.log(longestSharedSubsequenceRecursive("aaaaabbbbb", "bbbbbaaaaa") === 5);
// console.log(longestSharedSubsequenceRecursive("abcdabcdabcd", "abcdabcdabcd") === 12);

console.log(longestSharedSubsequenceIterative("abcde", "ace") === 3);
console.log(longestSharedSubsequenceIterative("abcbdab", "bdcaba") === 4);
console.log(longestSharedSubsequenceIterative("xmjyauz", "mzjawxu") === 4);
console.log(longestSharedSubsequenceIterative("abcdgh", "aedfhr") === 3);
console.log(longestSharedSubsequenceIterative("aggtab", "gxtxayb") === 4);
console.log(longestSharedSubsequenceIterative("aaaa", "aa") === 2);
// console.log(longestSharedSubsequenceIterative("aaaa", "bb") === 0);
// console.log(longestSharedSubsequenceIterative("", "abcd") === 0);
// console.log(longestSharedSubsequenceIterative("abcd", "") === 0);
// console.log(longestSharedSubsequenceIterative("", "") === 0);
// console.log(longestSharedSubsequenceIterative("a", "a") === 1);
// console.log(longestSharedSubsequenceIterative("zyxwvutsrqp", "abcdefghijklmnop") === 1);
// console.log(longestSharedSubsequenceIterative("abcabcabc", "acbacbacb") === 6);
// console.log(longestSharedSubsequenceIterative("aaaaabbbbb", "bbbbbaaaaa") === 5);
// console.log(longestSharedSubsequenceIterative("abcdabcdabcd", "abcdabcdabcd") === 12);

// // All test cases should log true