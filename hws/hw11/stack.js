/**
 * last in first out
 */
class Stack {
  constructor() {
    this.items = [];
  }

  /**
   * Add new element
   * O(1)
   */
  push(item) {
    this.items.push(item);
  }

  /**
   * Delete and return last el
   * O(1)
   */
  pop() {
    return this.items.pop();
  }

  /**
   * Return last el
   */
  peek() {
    return this.items[this.items.length - 1];
  }

  /**
   * Returns boolean value
   * Defines wheter stack is empty or not
   */
  isEmpty() {
    return !this.items.length;
  }
}

const myStack = new Stack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
// console.log(myStack.peek());
// console.log(myStack);
// console.log(myStack.pop());
// console.log(myStack);

module.exports = {
  Stack,
};
