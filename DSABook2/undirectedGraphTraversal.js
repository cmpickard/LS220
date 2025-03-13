// Implement a function `dfs` that accepts two arguments: an adjacency
// list representing an undirected graph, and a starting vertex (source).
// The function should print the vertices in preorder depth-first
// traversal order.

function dfs(adjList, source) {
  // recursive
  let visited = new Set();

  function visitNode(currNode) {
    visited.add(currNode);
    console.log(currNode);
    let neighbors = adjList.get(currNode);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) dfs(adjList, neighbor);
    }
  }

  visitNode(source);
}

function dfs2(adjList, source) {
  // stack
  let visited = new Set();
  let stack = [source];
  while (stack.length !== 0) {
    let currNode = stack.pop();
    console.log(currNode);
    let neighbors = adjList.get(currNode);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
}

const adjList2 = new Map();
adjList2.set(1, []);
adjList2.set(2, [1, 3, 4]);
adjList2.set(3, [5]);
adjList2.set(4, [6]);
adjList2.set(5, []);
adjList2.set(6, []);
adjList2.set(7, [6]);

dfs(adjList2, 2); // 2, 4, 6, 3, 5, 1 or 2, 1, 3, 5, 4, 6
console.log('\n');
dfs2(adjList2, 2); // 2, 4, 6, 3, 5, 1 or 2, 1, 3, 5, 4, 6

// Now do it breadth-firth
function bfs(adjList, source) {
  let visited = new Set();
  let queue = [source];
  while (queue.length > 0) {
    let currNode = queue.pop();
    if (visited.has(currNode)) continue;
    visited.add(currNode);
    console.log(currNode);
    let neighbors = adjList.get(currNode);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.unshift(neighbor);
      }
    }
  }
}

const adjList = new Map();
adjList.set(1, [2, 3]);
adjList.set(2, [1, 4]);
adjList.set(3, [1, 4, 5]);
adjList.set(4, [2, 3]);
adjList.set(5, [3, 6]);
adjList.set(6, [5]);

console.log('\n');
bfs(adjList, 1); // 1, 2, 3, 4, 5, 6 or 1, 3, 2, 5, 4, 6