class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

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
