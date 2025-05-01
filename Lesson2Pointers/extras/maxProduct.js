// Given a sorted array of integers (both positive and negative), find the
// air of elements that gives the maximum product.
// # ruby

// # Example:
// # Input: [-10, -3, 0, 1, 3, 8]
// # Output: [-10, -3] with product 30
// # Input: [1, 2, 3, 4, 5]
// # Output: [4, 5] with product 20

function maxProduct(arr) {
  if (arr.length < 2) return null;
  return Math.max(arr[0] * arr[1], arr[arr.length - 1] * arr[arr.length - 2]);
}

console.log(maxProduct([-10, -3, 0, 1, 3, 8]) === 30);
console.log(maxProduct([1, 2, 3, 4, 5]) === 20);
console.log(maxProduct([1, 1]) === 1);
console.log(maxProduct([1]) === null);
console.log(maxProduct([]) === null);
console.log(maxProduct([-10, -5, 1, 1, 2, 2, 3, 4, 5, 6]) === 50);