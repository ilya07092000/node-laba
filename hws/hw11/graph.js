/**
 * graph was implemented with help of adjacency list
 */
class Graph {
  constructor() {
    this.adjMatrix = {};
  }

  /**
   * Add new vertex to graph
   */
  addVertex(vertex) {
    if (!(vertex in this.adjMatrix)) {
      this.adjMatrix[vertex] = [];
      return true;
    }
    return false;
  }

  /**
   * Add new edge to graph
   */
  addEdge(vertex1, vertex2) {
    if (
      vertex1 &&
      vertex2 &&
      vertex1 in this.adjMatrix &&
      vertex2 in this.adjMatrix
    ) {
      this.adjMatrix[vertex1].push(vertex2);
      this.adjMatrix[vertex2].push(vertex1);
      return true;
    }
    return false;
  }

  /**
   * remove edge
   */
  removeEdge(vertex1, vertex2) {
    if (
      vertex1 &&
      vertex2 &&
      this.adjMatrix?.[vertex1]?.includes(vertex2) &&
      this.adjMatrix?.[vertex2]?.includes(vertex1)
    ) {
      this.adjMatrix[vertex1] = this.adjMatrix[vertex1].filter(
        v => v !== vertex2,
      );
      this.adjMatrix[vertex2] = this.adjMatrix[vertex2].filter(
        v => v !== vertex1,
      );
      return true;
    }
    return false;
  }

  /**
   * Remove vertex
   */
  removeVertex(vertex) {
    if (vertex in this.adjMatrix) {
      this.adjMatrix[vertex].forEach(v => {
        this.adjMatrix[v] = this.adjMatrix[v].filter(
          currVertex => currVertex !== vertex,
        );
      });
      this.adjMatrix[vertex] = [];
    }
    return false;
  }

  /**
   * Depth-first search
   * O(V+E) - vertices, edges
   */
  dfs(vertex) {
    const visited = new Set();
    if (!(vertex in this.adjMatrix)) {
      return visited;
    }

    const stack = [vertex];
    while (stack.length) {
      const vertexName = stack.pop();
      this.adjMatrix[vertexName].forEach(vertex => {
        if (!visited.has(vertex)) {
          stack.push(vertex);
        }
      });
      visited.add(vertexName);
    }
    return Array.from(visited);
  }

  /**
   * Breadth-first search
   * O(V+E) - vertices, edges
   */
  bfs(vertex) {
    const visited = new Set();
    if (!(vertex in this.adjMatrix)) {
      return visited;
    }

    const queue = [vertex];
    while (queue.length) {
      const vertexName = queue.shift();
      this.adjMatrix[vertexName].forEach(vertex => {
        if (!visited.has(vertex)) {
          queue.push(vertex);
        }
      });
      visited.add(vertexName);
    }
    return Array.from(visited);
  }
}

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

// console.log(graph); // graph

// graph.removeEdge('e', 'd');
// graph.removeVertex('a');
// console.log(graph); // graph after remove edge and vertex

// console.log(graph.dfs('a'));
// console.log(graph.bfs('a'));

module.exports = {
  Graph,
};
