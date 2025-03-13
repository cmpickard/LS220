"use strict";
/* eslint-disable max-len */
// Given an undirected graph represented by an edge list, determine if
// there is a path between specified source and destination vertices.

// Implement the function `hasPath` that takes three arguments:
// an edge list representing the graph, a source vertex, and a
// destination vertex. The function should return true if a path
// exists between the source and destination, and false otherwise.

function hasPath(edgeList, src, dst) {
  // dfs using stack
  let adjList = createAdjacencyList(edgeList);
  let visited = new Set();
  let stack = [src];
  while (stack.length !== 0) {
    let currNode = stack.pop();
    if (currNode === dst) return true;
    visited.add(currNode);
    let neighbors = adjList.get(currNode);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }

  return false;
}

function hasPathDFSRecursive(edgeList, src, dst) {
  let adjList = createAdjacencyList(edgeList);
  let visited = new Set();

  function checkNode(currNode) {
    visited.add(currNode);
    let neighbors;
    if (adjList.get(currNode)) {
      neighbors = adjList.get(currNode).filter(neighbor => !visited.has(neighbor));
    }

    if (currNode === dst) {
      return true;
    } else {
      return neighbors ? neighbors.some(neighbor => checkNode(neighbor)) : false;
    }
  }

  return checkNode(src);
}


function createAdjacencyList(edges) {
  let adjList = new Map();
  edges.forEach(([node1, node2]) => {
    if (!adjList.has(node1)) adjList.set(node1, []);
    if (!adjList.has(node2)) adjList.set(node2, []);
    adjList.get(node1).push(node2);
    adjList.get(node2).push(node1);
  });

  return adjList;
}

console.log(hasPath([[1, 2], [2, 3], [3, 4]], 1, 4) === true);
console.log(hasPath([[1, 2], [3, 4]], 1, 4) === false);
console.log(hasPath([[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [5, 6]], 1, 6) === true);
console.log(hasPath([], 1, 1) === true);
console.log(hasPath([[1, 2], [1, 3], [4, 5], [6, 7]], 2, 5) === false);
console.log(hasPath([[1, 2], [2, 3], [3, 4], [4, 5], [1, 5], [2, 6], [6, 7], [7, 8], [8, 5]], 1, 8) === true);
console.log(hasPath([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3], [2, 7], [7, 8], [8, 7], [7, 9], [9, 10], [10, 11], [11, 12], [12, 10], [7, 13]], 1, 13) === true);
console.log(hasPath([[1, 2], [2, 3], [3, 1], [4, 5], [5, 6], [6, 4], [7, 8], [8, 9], [9, 10], [10, 7], [11, 12], [13, 14], [14, 15], [15, 13]], 1, 12) === false);
// All test cases should log true

console.log(hasPathDFSRecursive([[1, 2], [2, 3], [3, 4]], 1, 4) === true);
console.log(hasPathDFSRecursive([[1, 2], [3, 4]], 1, 4) === false);
console.log(hasPathDFSRecursive([[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [5, 6]], 1, 6) === true);
console.log(hasPathDFSRecursive([], 1, 1) === true);
console.log(hasPathDFSRecursive([[1, 2], [1, 3], [4, 5], [6, 7]], 2, 5) === false);
console.log(hasPathDFSRecursive([[1, 2], [2, 3], [3, 4], [4, 5], [1, 5], [2, 6], [6, 7], [7, 8], [8, 5]], 1, 8) === true);
console.log(hasPathDFSRecursive([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3], [2, 7], [7, 8], [8, 7], [7, 9], [9, 10], [10, 11], [11, 12], [12, 10], [7, 13]], 1, 13) === true);
console.log(hasPathDFSRecursive([[1, 2], [2, 3], [3, 1], [4, 5], [5, 6], [6, 4], [7, 8], [8, 9], [9, 10], [10, 7], [11, 12], [13, 14], [14, 15], [15, 13]], 1, 12) === false);