// Write a function `findPeakInTerrain` that finds any peak in a
// given hilly terrain. A peak is an element that is strictly
// greater than its neighbors. The first and last elements can
// be peaks if they are strictly greater than their single neighbor.
// Adjacent elements in the terrain cannot be equal.

// The function should take an array of integers as input,
// representing the elevations of spots in the terrain.
// It should return the index of any peak in the terrain.
// There is guaranteed to be at least one peak in the input array.

// Example:
// Input: terrain = [1, 3, 2, 1, 4, 5]
// Output: 1 or 5
// Explanation: Both index 1 (elevation 3) and index 5
//              (elevation 5) are peaks.

function findPeakInTerrain(terrain) {
  // binary search
  // set left 0 and right terrain.length - 1
  // while left <= right? -- but also have a break condition
  // calc mid
  // check if mid is both larger than mid - 1 and mid + 1, if so, return mid
  // if not... what do I do?
  // we want to "climb the hill", so
  // we want to shift to the side that is larger than mid
  // but what if they are both larger than mid?
  // then there's a peak on either side, so it doesn't matter which way we go
  // WHAT HAPPENS AT THE EDGE?
  let left = 0;
  let right = terrain.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (terrain[mid] > terrain[mid - 1] && terrain[mid] > terrain[mid + 1]) {
      return mid;
    } else if (terrain[mid] < terrain[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return (left === terrain.length) ? right : left;
}

console.log(findPeakInTerrain([1]) === 0);
console.log(findPeakInTerrain([1, 2, 1]) === 1);
console.log(findPeakInTerrain([1, 3, 4, 1]) === 2);
console.log(findPeakInTerrain([3, 2, 1]) === 0);
console.log(findPeakInTerrain([1, 2, 3]) === 2);
console.log([1, 4].includes(findPeakInTerrain([1, 3, 2, 1, 5, 4])));
console.log(findPeakInTerrain([1, 2, 3, 4, 5, 7, 3]) === 5);
console.log(findPeakInTerrain([1, 2, 3, 4, 3, 2, 1]) === 3);
console.log([0, 8].includes(findPeakInTerrain([5, 4, 3, 2, 1, 2, 3, 4, 5])));
console.log(findPeakInTerrain([1, 2, 3, 4, 5, 4, 3, 2, 1]) === 4);
console.log(findPeakInTerrain([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]) === 0);
console.log(findPeakInTerrain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === 9);

// All test cases should log true