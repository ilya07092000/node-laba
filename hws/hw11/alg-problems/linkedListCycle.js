const {LinkedList} = require('../linkedList');

/**
 * define whether LL is cycle or not,
 * using floyd's cycle detection algorithm
 */
const isCycleLinkedList = head => {
  let slowPointer = head;
  let fastPointer = head;

  while (slowPointer && fastPointer) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer?.next?.next;

    if (slowPointer === fastPointer) {
      return true;
    }
  }

  return false;
};

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

// console.log(isCycleLinkedList(myLinkedList.head)); // no cycle

// const randomNode = myLinkedList.getByValue(6);
// myLinkedList.tail.next = randomNode; // create cycled linked list
// console.log(isCycleLinkedList(myLinkedList.head));
