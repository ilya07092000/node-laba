/**
 * first in first out
 */
class Queue {
  constructor() {
    this.items = [];
  }

  /**
   * Add item to queue
   * O(1)
   */
  enqueue(item) {
    this.items.push(item);
  }

  /**
   * Get item from queue
   * O(n) in case with array realization,
   * It's possible to create queue with help of linked list,
   * then complexity will be O(1)
   */
  dequeue() {
    return this.items.shift();
  }

  /**
   * return the last element in queue
   */
  peek() {
    return this.items[this.items.length - 1];
  }
}

const myQueue = new Queue();
myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);
myQueue.enqueue(4);
console.log(myQueue.peek());
console.log(myQueue);
console.log(myQueue.dequeue());
console.log(myQueue);
