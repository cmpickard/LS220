// Given an array of integers, find the maximum distance between two equal
// elements. If no such pair exists, return -1.

// # Example:
// # Input: [3, 2, 1, 2, 3]
// # Output: 4 (distance between the first and last elements, both 3)

// # Input: [1, 2, 3, 4, 5]
// # Output: -1 (no equal elements)
// This problem requires you to track element positions and compare
// distances when you find matching elements.
/*
Anchor / Runner ?
-- the input is unsorted, so a start/end approach would seemingly encounter an
issue where I wouldn't know which pointer to move at each step

Single Pointer + Map?

[3, 2, 1, 2, 3]
 P

 create Map
 create largestGap -- set equal to -1
iterate through array WITH INDEX. On each iteration:
  -- if map does not contain curr el, add it using the curr index as val and
  the int as the key
  -- if map does have el, note distance between curr idx and map saved idx
    -- if that gap is larger than largestGap, update largestGap


won't need to alter the map els once set because i only care about the LONGEST
gap between duplicate els, and so i will always want the first time encountered
position to maximize the distance
*/

function maxDistance(arr) {
  let seen = new Map();
  let largestGap = -1;
  for (let idx = 0; idx < arr.length; idx++) {
    let el = arr[idx];
    if (!seen.has(el)) {
      seen.set(el, idx);
    } else {
      let distance = idx - seen.get(el);
      if (largestGap < distance) largestGap = distance;
    }
  }

  return largestGap;
}

console.log(maxDistance([3,2,1,2,3]) === 4); // 4
console.log(maxDistance([2,2,2,2,2]) === 4); // 1
console.log(maxDistance([2,9,-1,0,1,3,2,1,2,3]) === 8); // 8
console.log(maxDistance([1,2,3,4,5]) === -1); // -1
console.log(maxDistance([1]) === -1); // -1
console.log(maxDistance([]) === -1); // -1