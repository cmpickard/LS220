/* eslint-disable max-len */
// You're a clever thief planning a heist in a neighborhood
// where houses are arranged in a line. Each house contains a
// certain amount of valuable loot. However, the houses have a
// unique security system: if two adjacent houses are robbed, it
// triggers a neighborhood-wide alarm.

// Given an array of integers representing the value of loot in
// each house, determine the maximum amount of loot you can
// steal without triggering the alarm system.

// Example 1:
// Input: houses = [3,1,4,1,5]
// Output: 12
// Explanation: Rob house 1 (loot = 3), house 3 (loot = 4), and house 5 (loot = 5).
// Total loot stolen = 3 + 4 + 5 = 12.

// Example 2:
// Input: houses = [6,2,7,9,3,1]
// Output: 16
// Explanation: Rob house 1 (loot = 6), house 3 (loot = 7), and house 5 (loot = 3).
// Total loot stolen = 6 + 7 + 3 = 16.

/*
input: array of ints
output: int
rules:
- we are trying to find the maximum sum of elements from the input array such
that none of the elements being summed are adjacent

RECURSIVE DP:
base case: [] -- return 0
 OR [n] -- return n
n = 1 => [n] -> return max of (n)
n = 2 => [n, m] -> return max of {n = 0}LIST + m, {n = 1}LIST -> (n, m)
n = 3 => [n, m, o] -> return max of {n = 1}LIST + o, {n = 2}LIST -> (n + o, m)
n = 4 => [n, m, o, p] -> return max of (n + o, n + p, m + p)
n = 5 => [n, m, o, p, q] -> return max of (n + o + q, n + p, m + p, m + q)

FOR (n = 5), examine
LIST(n = 3) + newEl and LIST(n = 4) ->
(n + o + q) & (m + q) & (n + o) & (n + p) & (m + p)
--we can ignore (n + o) b/c it will always be <= (n + o + q)

SO
suppose max3 is the max value from n = 3
suppose max4 is the max value from n = 4
max5 = Math.max(max3 + houses[5 - 1], max4);

maxN = Math.max(maxes(N - 2) + houses[N - 1], maxes(N - 1))

ITERATIVE SOLUTION:
let maxes = [0, houses[0]]
max2 = Math.max(0 + houses[1], houses[0])

for (let idx = 2; idx <= houses.length; idx++) {
  maxes.push(Math.max(maxes[idx - 2] + houses[idx - 1], maxes[idx - 1]));
}

return maxes[maxes.length - 1];

n = 4
list =
i) 4th element + each item from the n = 2 list -> (p + n) & (p + m)
ii) 3rd element + each item from the n = 1 list -> o + n

n = 5
i) 5th element + each el from n = 3 list -> (q + n + o), (q + m)
ii) 4th element + each el from n = 2 list -> (p + n), (p + m)

for an array of size N, we're creating the following LIST:
  (i) LIST(N - 2) with arr[N] added to each element
    CONCATTED ONTO
  (ii) LIST(N - 3) with arr[N - 1] added to each element

Find MAX of LIST


[3,1,4,1,5]
N = 0: [] -> 0
N = 1: [3] -> 3
N = 2: [3,1] -> 3
N = 3: [3,1,4] -> 7 CHECK:
N = 4: [3,1,4,1] -> 7 CHECK:
N = 5: [3,1,4,1,5] -> 12 CHECK: MAX of ((N=3) + arr.last), N=4)

*/

function maximizeLootRecursive(houses) {
  let cache = new Map();

  function findMax(houses) {
    if (houses.length === 0) return 0;
    if (houses.length === 1) return houses[0];
    if (cache.has(houses.length)) return cache.get(houses.length);

    let firstMax = findMax(houses.slice(0, -2)) + houses[houses.length - 1];
    let secondMax = findMax(houses.slice(0, -1));
    let max = Math.max(firstMax, secondMax);

    cache.set(houses.length, max);
    return max;
  }

  return findMax(houses);
}

function maximizeLootIterative(houses) {
  let maxes = [0, houses[0]];

  for (let idx = 2; idx <= houses.length; idx++) {
    maxes.push(Math.max(maxes[idx - 2] + houses[idx - 1], maxes[idx - 1]));
  }

  return maxes[maxes.length - 1] ? maxes[maxes.length - 1] : 0;
}

// Test cases
console.log(maximizeLootRecursive([3,1,4,1,5]) === 12);
console.log(maximizeLootRecursive([6,2,7,9,3,1]) === 16);
console.log(maximizeLootRecursive([2,1,1,2]) === 4);
console.log(maximizeLootRecursive([1,2,3,1]) === 4);
console.log(maximizeLootRecursive([2,7,9,3,1]) === 12);
console.log(maximizeLootRecursive([1,1,1,1,1,1,1,1,1,1]) === 5);
console.log(maximizeLootRecursive([10,1,1,10]) === 20);
console.log(maximizeLootRecursive([5,3,4,11,2]) === 16);
console.log(maximizeLootRecursive([1]) === 1);
console.log(maximizeLootRecursive([]) === 0);


console.log(maximizeLootIterative([3,1,4,1,5]) === 12);
console.log(maximizeLootIterative([6,2,7,9,3,1]) === 16);
console.log(maximizeLootIterative([2,1,1,2]) === 4);
console.log(maximizeLootIterative([1,2,3,1]) === 4);
console.log(maximizeLootIterative([2,7,9,3,1]) === 12);
console.log(maximizeLootIterative([1,1,1,1,1,1,1,1,1,1]) === 5);
console.log(maximizeLootIterative([10,1,1,10]) === 20);
console.log(maximizeLootIterative([5,3,4,11,2]) === 16);
console.log(maximizeLootIterative([1]) === 1);
console.log(maximizeLootIterative([]) === 0);
// All test cases should log true