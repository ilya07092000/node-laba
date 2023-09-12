const {Stack} = require('../stack');

/**
 * min max stack by creating addinitional stack
 * and storing min max values in form of [min, max] records
 */
class MinMaxStack {
  constructor() {
    this.minMaxStack = new Stack();
    this.stack = new Stack();
  }

  push(item) {
    if (this.stack.isEmpty()) {
      this.stack.push(item);
      this.minMaxStack.push([item, item]);
    } else {
      const lastMinMaxCopy = [...this.minMaxStack.peek()];
      if (item < lastMinMaxCopy[0]) {
        lastMinMaxCopy[0] = item;
      }
      if (item > lastMinMaxCopy[1]) {
        lastMinMaxCopy[1] = item;
      }
      this.minMaxStack.push(lastMinMaxCopy);
      this.stack.push(item);
    }
  }

  pop() {
    if (this.stack.isEmpty()) {
      return false;
    }

    this.minMaxStack.pop();
    return this.stack.pop();
  }

  getMin() {
    if (!this.stack.isEmpty()) {
      return this.minMaxStack.peek()[0];
    }
  }

  getMax() {
    if (!this.stack.isEmpty()) {
      return this.minMaxStack.peek()[1];
    }
  }
}

const myStack = new MinMaxStack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
myStack.push(5);
myStack.push(6);
myStack.push(7);
myStack.push(8);
myStack.push(9);
myStack.push(123);
myStack.push(10);
myStack.push(11);
myStack.push(12);
myStack.push(13);
myStack.push(0);
myStack.push(14);
myStack.push(15);
myStack.push(16);
myStack.push(17);
myStack.push(18);
myStack.push(19);
myStack.push(20);

// myStack.pop();
// myStack.pop();
// myStack.pop();
// myStack.pop();
// myStack.pop();
// myStack.pop();
// myStack.pop();
// myStack.pop();
// myStack.pop();
// myStack.pop();
// myStack.pop();
// myStack.pop();
// myStack.pop();

// console.log('Min: ', myStack.getMin(), 'Max: ', myStack.getMax());
