/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
// Write a function named findTruckCapacity that determines
// the optimal capacity for a delivery truck to transport
// a series of orders within a given number of trips.

// The function takes two parameters:
// 1. An array of positive integers orderVolumes, where each
// element represents the volume of an order in cubic meters.
// 2. A positive integer maxTrips, representing the maximum
// number of trips the truck can make.

// The truck must deliver orders in the sequence they appear
// in the orderVolumes array. On each trip, the truck is
// loaded with as many consecutive orders as possible without
// exceeding its capacity. The function should return the
// minimum truck capacity in cubic meters.

// Example:
// Input: orderVolumes = [6, 3, 8, 2, 5, 4, 5], maxTrips = 3
// Output: 14
// Explanation: A truck with 14 cubic meters capacity can
//              deliver all orders in 3 trips:
// Trip 1: 6 + 3 = 9 cubic meters
// Trip 2: 8 + 2 = 10 cubic meters
// Trip 3: 5 + 4 + 5 = 14 cubic meters

/*
input: (i) an array of ints, (ii) an int
ouput: an integer
rules: the array of ints represents an ordered list of payload weights. the
second argument, maxTrips, represents the number of trips we have to carry
all those payloads.
- the payloads must to taken IN ORDER -- so e.g., if they are [1, 3, 4, 2]
we can take 1 or 1 + 3 or 1 + 3 + 4, but we can't take 1 + 4 and skip over 3
- the return value is the MINIMUM "truck size" needed to carry all the payloads
in the given number of trips
- each element on input array will be a positive int

Stripping away the real world details, we can think of this problem as asking
us to divide the input array into maxTrips separate arrays -- such that all
the elements are in exactly one array and order is maintained:
e.g. if [1, 2, 3, 4, 5], maxTrips = 3
the goal is find 2 slice points (i.e. maxTrips - 1) such that the maximum sum
among the 3 resulting arrays is as small as we can make it and return that sum

in this case, we should slice like this: [1, 2, 3], [4], [5] with a maxSum of 6

algorithm:
suppose we just want to find a single slice point to mininimize the max sum
[1,2,3,4,8]
it will never make sense to slice at the front or back because that would leave
one subarray with 0 and another with the full sum and the minMaxSum would be
less if any one element was moved into the empty subarry

[1,2,3,4,8]
 L   M   R
start with minMax = Infinity?
with mid at 3, we are doing arr.slice(0, 3) and arr.slice(3, arr.length)
then we sum both subarrs:
6 & 12
find the max: 12
since 12 is less than Infinity, minMax = 12;
Can we rule out the left or right side of our arr?
the question is: is the max smaller when the smaller-summed subarray has one
more element?
SO if the subarray on the left of mid has a smaller sum, left = mid + 1?
and if the subarray on the right has a smaller sum, right = mid - 1?
what if they are the same?
THEN we are in the perfect position, right?

*/

// function findTruckCapacityTwoTrips(orderVolumes) {
//   let minMax = Infinity;
//   let left = 0;
//   let right = orderVolumes.length - 1;
//   while (left <= right) {
//     let mid = Math.floor((left + right) / 2);
//     let leftSum = orderVolumes.slice(0, mid).reduce((sum, num) => sum + num);
//     let rightSum = orderVolumes.slice(mid, orderVolumes.length)
//       .reduce((sum, num) => sum + num);
//     let currMax = Math.max(leftSum, rightSum);
//     if (minMax > currMax) minMax = currMax;
//     if (leftSum < rightSum) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }

//   return minMax;
// }

// console.log(findTruckCapacityTwoTrips([1, 2, 3, 4, 8])); // 10
// console.log(findTruckCapacityTwoTrips([3, 2, 5, 8, 4])); // 12
// console.log(findTruckCapacityTwoTrips([5, 5, 5, 5, 5])); // 15
// console.log(findTruckCapacityTwoTrips([7, 3, 9, 4, 2, 8, 6])); // 20

/*
when maxTrips is one, i can just sum the array
when maxTrips is two, i can use the twoTrips function
I might need recursion to break the problem down into twoTrip chunks

let's start with a 3 trip problem and see if we can work out the logic:
[6, 3, 8, 2, 5, 4, 7], 3

if maxTrips > 2,...

what i want is to iterate through the array, maybe?
e.g.
max of (sum[6] & maxSumTwoTrips([3, 8, 2, 5, 4, 7])) => 16
max of (sum[6, 3] & ...)

No, I probably want to do the same binary search?
[6, 3, 8, 2, 5, 4, 7]
 L        M        R
I'll need to pick a side (left / right) to be the side that doesn't get any
addtl slices. let's say LEFT receives no slices

leftSum = orderVolumes.slice(0, mid).reduce((sum, num) => sum + num);
rightSum = findTruckCapacity(orders.slice(mid, length), maxTrips - 1)

AND then the basecase is maxTrips = 1 -- we just return the sum


SUPPOSE 2 trips, then


ALGORITHM:
-return basecase solution -- maxTrips === 1
-


*/

// RECURSIVE SOLUTION
function findTruckCapacityRecursive(orderVolumes, maxTrips) {
  if (maxTrips === 1) {
    return orderVolumes.reduce((sum, num) => sum + num, 0);
  }

  let minMax = Infinity;
  let left = 0;
  let right = orderVolumes.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let leftSum = findTruckCapacityRecursive(orderVolumes.slice(0, mid), 1);
    let rightSum = findTruckCapacityRecursive(orderVolumes.slice(mid, orderVolumes.length), maxTrips - 1);
    let currMax = Math.max(leftSum, rightSum);
    if (minMax > currMax) minMax = currMax;
    if (leftSum < rightSum) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return minMax;
}

// console.log(findTruckCapacityRecursive([6, 3, 8, 2, 5, 4, 7], 3) === 15);
// console.log(findTruckCapacityRecursive([3, 2, 5, 8, 4], 3) === 10);
// console.log(findTruckCapacityRecursive([1, 2, 3, 4, 5], 1) === 15);
// console.log(findTruckCapacityRecursive([10, 20, 30, 40, 50], 5) === 50);
// console.log(findTruckCapacityRecursive([5, 5, 5, 5, 5], 2) === 15);
// console.log(findTruckCapacityRecursive([7, 3, 9, 4, 2, 8, 6], 2) === 20);
// console.log(findTruckCapacityRecursive([100], 1) === 100);
// console.log(findTruckCapacityRecursive([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 3) === 4);
// console.log(findTruckCapacityRecursive([10, 20, 30, 40, 50], 2) === 90);
// console.log(findTruckCapacityRecursive([50, 40, 30, 20, 10], 3) === 60);
// console.log(findTruckCapacityRecursive([5, 10, 15, 20, 25], 1) === 75);
// console.log(findTruckCapacityRecursive([3, 2, 4, 1, 5], 10) === 5);
// console.log(findTruckCapacityRecursive([1000, 1000, 1000, 1000], 3) === 2000);

/*
The hint says the solution has time complexity O(NlogS) --- where S is the sum
of the whole collection. That implies that were doing a binary search on the
collection [0, 1, 2, ..., sum] and, in the worst case, that we have to do that
N times -- where N is the number of volumes.

EX|
[3, 2, 5, 8, 4], 3
[0,..., 11,... ,22]
L      M        R

So it's like: I work out whether there's a solution where the maximum size
is 11 or smaller. If so, I move R to 10. If not, I move L to 12

How do I work out whether there's a solution like that?
initialize divisions at 1
Scan through the collection, adding elements as I go. When adding the next el
would push us over the target sum, we increment our "divisions" count by 1
and then start over at zero at the next index. if we make it to the end and
the number of divisions is <= the maxDivisions, then return true


*/

function findTruckCapacity(orderVolumes, maxTrips) {
  let sizes = new Array(orderVolumes.reduce((sum, num) => sum + num))
    .fill()
    .map((_, idx) => idx + 1);

  if (maxTrips === 1) return sizes.slice(-1)[0];

  let left = 0;
  let right = sizes.length - 1;
  let result = Infinity;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let divisible = canDivide(orderVolumes, maxTrips, mid);
    if (divisible) {
      if (result > mid) result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}

function canDivide(nums, maxDivs, maxSum) {
  let divisions = 1;
  nums.reduce((sum, num) => {
    sum += num;
    if (num > maxSum) {
      divisions = Infinity;
    } else if (sum > maxSum) {
      sum = num;
      divisions += 1;
    }

    return sum;
  }, 0);
  return divisions <= maxDivs;
}

// console.log(canDivide([6, 3, 8, 2, 5, 4, 7], 3, 16) === true);
// console.log(canDivide([6, 3, 8, 2, 5, 4, 7], 3, 15) === true);
// console.log(canDivide([6, 3, 8, 2, 5, 4, 7], 3, 14) === false);


console.log(findTruckCapacity([6, 3, 8, 2, 5, 4, 7], 3) === 15);
console.log(findTruckCapacity([3, 2, 5, 8, 4], 3) === 10);
console.log(findTruckCapacity([1, 2, 3, 4, 5], 1) === 15);
console.log(findTruckCapacity([10, 20, 30, 40, 50], 5) === 50);
console.log(findTruckCapacity([5, 5, 5, 5, 5], 2) === 15);
console.log(findTruckCapacity([7, 3, 9, 4, 2, 8, 6], 2) === 20);
console.log(findTruckCapacity([100], 1) === 100);
console.log(findTruckCapacity([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 3) === 4);
console.log(findTruckCapacity([10, 20, 30, 40, 50], 2) === 90);
console.log(findTruckCapacity([50, 40, 30, 20, 10], 3) === 60);
console.log(findTruckCapacity([5, 10, 15, 20, 25], 1) === 75);
console.log(findTruckCapacity([3, 2, 4, 1, 5], 10) === 5);
console.log(findTruckCapacity([1000, 1000, 1000, 1000], 3) === 2000);