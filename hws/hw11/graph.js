/**
 * graph was implemented with help of adjacency matrix
 */
class Graph {
  constructor() {
    this.adjMatrix = {};
  }

  addVertex(vertex) {
    if (!(vertex in this.adjMatrix)) {
      this.adjMatrix[vertex] = [];
      return true;
    }
    return false;
  }

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

  bst(vertex) {
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

// graph.removeEdge('e', 'd');
// graph.removeVertex('a');

// console.log(graph);
console.log(graph.dfs('a'));
console.log(graph.bst('a'));
