const {Graph} = require('../graph');

const weighGraph = {};
weighGraph.a = {b: 2, c: 1};
weighGraph.b = {f: 7};
weighGraph.c = {d: 5, e: 2};
weighGraph.d = {f: 2};
weighGraph.e = {f: 1};
weighGraph.f = {g: 1};
weighGraph.g = {};

/**
 * Algorithm to find the lowest path in weight graph
 * O((V+E)logV) using adjacency list representation of graph
 * O(V 2) using the adjacency matrix representation of graph
 *
 * I used adjacency list
 */
const dijkstraAlg = (graph, start, end) => {
  const paths = {};
  const visited = [];
  let neighbors = {};

  Object.keys(graph).forEach(vertex => {
    if (vertex !== start) {
      const value = graph[start][vertex];
      paths[vertex] = value || Number.MAX_VALUE;
    }
  });

  let vertex = findMinPath(paths, visited);
  while (vertex) {
    const path = paths[vertex];
    neighbors = graph[vertex];
    Object.keys(neighbors).forEach(neighbor => {
      const newPath = path + neighbors[neighbor];
      if (newPath < paths[neighbor]) {
        paths[neighbor] = newPath;
      }
    });
    visited.push(vertex);
    vertex = findMinPath(paths, visited);
  }
  return paths;
};

const findMinPath = (paths, visited) => {
  let lowestPath = Number.MAX_VALUE;
  let lowestVertex;

  Object.keys(paths).forEach(vertex => {
    let currPath = paths[vertex];
    if (currPath < lowestPath && !visited.includes(vertex)) {
      lowestPath = currPath;
      lowestVertex = vertex;
    }
  });
  return lowestVertex;
};

// console.log(dijkstraAlg(weighGraph, 'a', 'g'));

const graph = new Graph();
graph.addVertex('a');
graph.addVertex('b');
graph.addVertex('c');
graph.addVertex('d');
graph.addVertex('e');
graph.addVertex('f');
graph.addEdge('a', 'c');
graph.addEdge('a', 'b');
graph.addEdge('a', 'f');
graph.addEdge('f', 'c');
graph.addEdge('f', 'e');
graph.addEdge('c', 'b');
graph.addEdge('c', 'd');
graph.addEdge('e', 'd');
graph.addEdge('d', 'b');

/**
 * Algorithm to find the lowest path in graph with help of BFS algorithm
 * O(V+E)
 */
const findPathWithBfs = (graph, start, end) => {
  const queue = [[start]];
  const visited = new Set();

  while (queue.length) {
    let path = queue.shift();
    let vertexName = path[path.length - 1];
    if (vertexName === end) {
      return path;
    }

    graph.adjMatrix[vertexName].forEach(vertex => {
      if (!visited.has(vertex)) {
        const newPath = [...path, vertex];
        queue.push(newPath);
      }
    });
    visited.add(vertexName);
  }
  return false;
};
// console.log(graph);
// console.log(findPathWithBfs(graph, 'a', 'e'));
