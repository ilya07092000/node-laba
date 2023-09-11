class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  insert(value) {
    const node = new Node(value);
    if (this.root === null) {
      this.root = node;
    } else {
      const insertionNode = this.findInsertionNode(node);
      if (!insertionNode) {
        return false;
      }
      if (node.value > insertionNode.value) {
        insertionNode.right = node;
      } else {
        insertionNode.left = node;
      }
    }
    return true;
  }

  findInsertionNode(nodeToInsert) {
    let currNode = this.root;
    if (!currNode) {
      return null;
    }

    while (true) {
      if (currNode.value === nodeToInsert.value) {
        return null;
      }

      if (currNode.value > nodeToInsert.value) {
        if (currNode.left === null) {
          return currNode;
        }
        currNode = currNode.left;
      }

      if (currNode.value < nodeToInsert.value) {
        if (currNode.right === null) {
          return currNode;
        }
        currNode = currNode.right;
      }
    }
  }

  getNodeByValue(value) {
    let currNode = this.root;
    while (true) {
      if (currNode === null) {
        return null;
      }

      if (currNode?.value === value) {
        return currNode;
      }

      if (currNode.value > value) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
  }
}

const bsftTraversal = root => {
  if (!root) {
    throw new Error('Bad Argument');
  }

  const stack = [root];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.value);

    if (node.left) {
      stack.push(node.left);
    }

    if (node.right) {
      stack.push(node.right);
    }
  }
  return result;
};

const dfsPreOrder = root => {
  const result = [];

  const traverse = node => {
    result.push(node.value);
    if (node.left) {
      traverse(node.left);
    }
    if (node.right) {
      traverse(node.right);
    }
  };
  traverse(root);
  return result;
};

const dfsPostOrder = root => {
  const result = [];

  const traverse = node => {
    if (node.left) {
      traverse(node.left);
    }
    if (node.right) {
      traverse(node.right);
    }
    result.push(node.value);
  };
  traverse(root);
  return result;
};

const dfsInOrder = root => {
  const result = [];

  const traverse = node => {
    if (node.left) {
      traverse(node.left);
    }
    result.push(node.value);
    if (node.right) {
      traverse(node.right);
    }
  };
  traverse(root);
  return result;
};

const myTree = new BinarySearchTree();
myTree.insert(10);
myTree.insert(20);
myTree.insert(5);
myTree.insert(4);
myTree.insert(12);
myTree.insert(150);
myTree.insert(72);
myTree.insert(64);
myTree.insert(99);
myTree.insert(105);
myTree.insert(1);
myTree.insert(2);
myTree.insert(3);
myTree.insert(213);
console.log('myTree', myTree);
console.log(myTree.getNodeByValue(12));
console.log(bsftTraversal(myTree.root));
console.log(dfsPreOrder(myTree.root));
console.log(dfsPostOrder(myTree.root));
console.log(dfsInOrder(myTree.root));
