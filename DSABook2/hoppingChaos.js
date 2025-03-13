// A puppy named Chaos is eager to reach a bowl of
// treats at the top of a series of n stacks of
// crates. Each stack is higher by one crate than
// the previous one, forming a structure similar
// to stairs. Each time, Chaos can hop either one
// stack or two stacks upward in his excitement. In
// how many distinct ways can Chaos reach the bowl?

// Write a function `hoppingChaos` that, given a
// number `N` as the input, determines the number
// of distinct ways Chaos can reach the bowl.

// The minimum amount of stacks is one, and the maximum is 50.

// Example 1:

// Input: 2
// Output: 2

// Chaos can reach the top of the stack in two distinct ways:

// 1. Hop 1 stack, then hop 1 more stack.
// 2. Hop 2 stacks in one go.

// Example 2:

// Input: 4
// Output: 5

// Chaos can reach the top of the stack in five distinct ways:

// 1. Hop 1 stack, hop 1 stack, hop 1 stack, then hop 1 stack.
// 2. Hop 1 stack, hop 1 stack, then hop 2 stacks in one go.
// 3. Hop 1 stack, then hop 2 stacks in one go, then hop 1 stack.
// 4. Hop 2 stacks in one go, hop 1 stack, then hop 1 stack.
// 5. Hop 2 stacks in one go, then hop 2 stacks in one go again.

/*
input: number of boxes, int
output: number of possible ways to reach top
rules:
-at each position, can move forward 1 or 2 places
- (1, 2) and (2, 1 ) count as distinct trips
-
suppose 6 -> 13?
can we think of this as a 3 then 3 trip?
(1,1,1) (1,2) (2,1) X (111) (12) (21) -> NOPE

(111111)X
(11112)X (11121)X (11211)X (12111) (21111)X
(1122)X (1212) (2112)X (2121)X (2211)X (1221)
(222)X
What about dividing it up into even-numberd sub trips?
2 X 4? or 2 X 2 X 2
(11)(2)
(1111)(112)(121)(211)(22)

missing: (12111) (1212) (1221)

it's the fibonacci sequence:
0: 1
1: 1 (1)
2: 2 (11)(2)
3: 3 (111)(21)(12)
4: 5 (1111)(211)(121)(112)(22)
5: 8
6: 13

So for totalTrips(n) boxes, the answer is:
totalTrips(n - 1) + totalTrips(n - 2)

algorithm:
let knownTrips = new Map();
knownTrips.set(1,1).set(2,2).set(3,3).set(4,5)

nested recursive function:
function trips(boxes, knownTrips) {
  -if knownTrips.has(boxes) return boxes
  else:
  neededTrips = trips(boxes - 1, knownTrips) + trips(boxes - 2, knownTrips)
  knownTrips.set(boxes, needed trips)
  return neededTrips
end


- knownTripCounts needs to be passed around through each call but how do i
do that w/o changing the function signature? global var?
  -- Function INSIDE the function


*/

function hoppingChaos(boxes) {
  let knownTrips = new Map().set(1,1).set(2,2);

  function trips(boxes) {
    if (knownTrips.has(boxes)) return knownTrips.get(boxes);
    let neededTrips = trips(boxes - 1) + trips(boxes - 2);
    knownTrips.set(boxes, neededTrips);
    return neededTrips;
  }

  return trips(boxes);
}


console.log(hoppingChaos(2) === 2);
console.log(hoppingChaos(3) === 3);
console.log(hoppingChaos(4) === 5);
console.log(hoppingChaos(8) === 34);
console.log(hoppingChaos(13) === 377);
console.log(hoppingChaos(17) === 2584);
console.log(hoppingChaos(21) === 17711);
console.log(hoppingChaos(50) === 20365011074);

// Iterative solution -- w/ space complexity O(1)
function hoppingChaos2(boxes) {
  let prevprevHop = null;
  let prevHop = 1;
  let currHop = 2;
  for (let idx = 2; idx < boxes; idx++) {
    prevprevHop = prevHop;
    prevHop = currHop;
    currHop = prevHop + prevprevHop;
  }

  return currHop;
}

console.log(hoppingChaos2(2) === 2);
console.log(hoppingChaos2(3) === 3);
console.log(hoppingChaos2(4) === 5);
console.log(hoppingChaos2(8) === 34);
console.log(hoppingChaos2(13) === 377);
console.log(hoppingChaos2(17) === 2584);
console.log(hoppingChaos2(21) === 17711);
console.log(hoppingChaos2(50) === 20365011074);