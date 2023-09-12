class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Insert new node
   * O(1)
   */
  insert(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;
    return true;
  }

  /**
   * Delete node by value
   * O(n)
   */
  delete(value) {
    if (!this.length) {
      return false;
    }
    if (this.length === 1 && this.head.value === value) {
      const temp = this.head;
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return temp;
    }

    let currNode = this.head;
    let prevNode = null;
    while (currNode) {
      if (currNode.value === value) {
        const temp = currNode;
        if (currNode === this.head) {
          this.head = this.head.next;
          temp.next = null;
        } else if (currNode === this.tail) {
          prevNode.next = null;
          this.tail = prevNode;
        } else {
          prevNode.next = currNode.next;
          currNode.next = null;
        }
        this.length -= 1;
        return temp;
      } else {
        prevNode = currNode;
        currNode = currNode.next;
      }
    }
    return false;
  }

  /**
   * Get node by value
   * O(n)
   */
  getByValue(value) {
    if (this.length === 0) {
      return false;
    }

    let currNode = this.head;
    while (currNode) {
      if (currNode.value === value) {
        return currNode;
      }
      currNode = currNode.next;
    }
    return false;
  }

  print() {
    const result = {
      length: this.length,
      items: [],
    };
    let currNode = this.head;
    while (currNode) {
      result.items.push(currNode.value);
      currNode = currNode.next;
    }
    console.log(result);
  }
}

const myLinkedList = new LinkedList();
myLinkedList.insert(1);
myLinkedList.insert(2);
myLinkedList.insert(3);
myLinkedList.insert(4);
myLinkedList.insert(5);
myLinkedList.insert(6);
myLinkedList.insert(7);
myLinkedList.insert(8);
myLinkedList.insert(9);
myLinkedList.insert(10);

// myLinkedList.print(); // inital linked list

myLinkedList.delete(5);
myLinkedList.delete(1);
myLinkedList.delete(10);

// myLinkedList.print(); // linked list after remove three elements

// console.log(myLinkedList.getByValue(6));

module.exports = {LinkedList};
