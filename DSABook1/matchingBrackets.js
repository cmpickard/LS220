// this assignment, you will apply what we've learned so far in this lesson to
// solve the "Matching Brackets" problem. First, identify which data structure
// could help you solve this problem. Feel free to use an array either as a
// stack or a queue, depending on what you find most suitable.

// Make sure to apply the PEDAC process. In this challenge, it's important to
// understand the problem well and break down the logical rules of matching
// brackets to be able to apply these rules to a solution.

// Problem Description
// Write a function `areMatched` that takes a string as an argument
// and returns true if all types of brackets (parentheses (),
// square brackets [], and curly braces {}) in the string are
// properly matched. For the brackets to be considered
// matched, every opening bracket must have a corresponding
// closing bracket of the same type, and the brackets must be
// correctly nested.
/*
input: string
output: boolean
rules:
-empty string return true
-assume string will have only grouping marks
-return true when the string's use of parens, brackets, and braces is 'balanced'
meaning, basically syntactically coherent; else false
- here are the algorithmic rules for when a string is balanced:

  -the first char can be any opening grouper -- but a closing grouper is invalid
  -the second char can be any opening grouper OR
  the closing grouper for the last UNCLOSED opening grouper
  if closing grouper, the openeing grouper it's paired with counts as CLOSED

  -the last char must be a closing grouper that CLOSES out the last open grouper
  remaining


datastructrue:
stack

algorithm:
-return true if ''
-initialize stack array []
-iterate through each char. for each char -- use FOR... loop
  -if stack is empty and char is any closing grouper, return false
  -if stack is non-empty
    -and char NON-MATCHING closing grouper for arr[-1], return false
    -and char MATCHING closing grouper for arr[-1], pop arr
    -and char is opening grouper, push currChar onto arr

arr.length === 0
*/

function areMatched(str) {
  const CLOSERS = [')', '}', ']'];
  const MATCHES = { '{': '}', '[': ']', '(':')'};
  let stack = [];

  for (let char of str) {
    if ((MATCHES[stack.slice(-1)] === char)) {
      stack.pop();
    } else if (CLOSERS.includes(char)) {
      return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}

console.log(areMatched("()"));              // Output: true
console.log(areMatched("([()]{})"));        // Output: true
console.log(areMatched("([((}]({}))"));     // Output: false
console.log(areMatched("{{[[(())]]}}"));    // Output: true
console.log(areMatched(""));                // Output: true
console.log(areMatched("([)]"));            // Output: false
