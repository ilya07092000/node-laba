const {BinarySearchTree} = require('../bst');

/**
 * traverse tree and define whether it is bst or not using dfs pre order alg
 */
const isBinarySearchTree = root => {
  if (!root) {
    return false;
  }

  const traverse = node => {
    if (!node) {
      return true;
    }

    if (
      (node.right && node.right.value < node.value) ||
      (node.left && node.left.value > node.value)
    ) {
      return false;
    }

    if (!traverse(node.left) || !traverse(node.right)) {
      return false;
    }

    return true;
  };

  return traverse(root);
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

const notBstTree = {
  root: {
    value: 10,
    right: {
      value: 15,
      right: {
        value: 20,
      },
    },
    left: {
      value: 5,
      right: {
        value: 10,
        right: {
          value: 8, // not bst, comment this line to get bst tree
        },
      },
    },
  },
};

console.log(isBinarySearchTree(myTree.root));
console.log(isBinarySearchTree(notBstTree.root));
