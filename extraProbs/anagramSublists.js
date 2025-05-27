// Given an array of strings strs, group all anagrams together into sublists
// You may return the output in any order.

// An anagram is a string that contains the exact same characters as another
// string, but the order of the characters can be different.

// Example 1:

// Input: strs = ["act","pots","tops","cat","stop","hat"]

// Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]
// Example 2:

// Input: strs = ["x"]

// Output: [["x"]]
// Example 3:

// Input: strs = [""]

// Output: [[""]]
// Constraints:

// 1 <= strs.length <= 1000.
// 0 <= strs[i].length <= 100
// strs[i] is made up of lowercase English letters.

// You should aim for a solution with O(m * n) time and O(m) space
// where m is the number of strings and n is the length of the longest string.

/*
input: arr of string
output: multi-d array, inner arrays have strings
rules:
-each subarry in the output should have words that are all anagrams
-could get an empty string as input -> return [['']]

algorithm:

-create result -> Map, with a Map as a key and an array of words that use the
key-Map as the value

iterate through input, using forEach?
  -create a Map with all letters from currWord
  -check if that new Map has the same content as any of the existing tranches in
  the results Map. if so, add the currWord to the array val for that map in
  results. if not, create a new entry in the results map with the currMap as
  the key and [currWord] as the val
end

return retuls

*/

function groupAnagrams(strs) {
  let result = new Map();

  strs.forEach((string) => {
    let wordMap = wordToMap(string);
    let key = [...wordMap.entries()].sort().join('');

    if (result.has(key)) {
      result.get(key).push(string);
    } else {
      result.set(key, [string]);
    }
  });

  return [...result.values()];
}

function wordToMap(str) {
  let result = new Map();
  for (let char of str) {
    if (result.has(char)) {
      result.set(char, result.get(char) + 1);
    } else {
      result.set(char, 1);
    }
  }

  return result;
}

// console.log(wordToMap('aabbccdeg'));
console.log(groupAnagrams(['aabb', 'baba', 'bbaa', 'abb', 'bab']));