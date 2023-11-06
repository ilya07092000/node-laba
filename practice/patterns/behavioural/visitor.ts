interface Animal {
  accept(operation: AnimalOperation);
}

interface AnimalOperation {
  visitMonkey(monkey: Monkey);
  visitLion(lion: Lion);
  visitDolphin(dolphin: Dolphin);
}

class Monkey implements Animal {
  accept(operation: AnimalOperation) {
    operation.visitMonkey(this);
  }
}

class Lion implements Animal {
  accept(operation: AnimalOperation) {
    operation.visitLion(this);
  }
}

class Dolphin implements Animal {
  accept(operation: AnimalOperation) {
    operation.visitDolphin(this);
  }
}

class Speak implements AnimalOperation {
  visitMonkey(monkey: Monkey) {
    console.log('oaoao');
  }

  visitLion(lion: Lion) {
    console.log('rrrr');
  }

  visitDolphin(dolphin: Dolphin) {
    console.log('tutututu');
  }
}

const monkey = new Monkey();
const lion = new Lion();
const dolphin = new Dolphin();

const speak = new Speak();
monkey.accept(speak);
