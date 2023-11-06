/**
 * Decorator is a structural design pattern that lets you attach new behaviors to objects
 * by placing these objects inside special wrapper objects that contain the behaviors.
 */

interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class SimpleCoffee implements Coffee {
  getCost(): number {
    return 2;
  }

  getDescription(): string {
    return 'Very tasty simple coffee';
  }
}

class MilkCoffee implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost(): number {
    return this.coffee.getCost();
  }

  getDescription(): string {
    return this.coffee.getDescription() + ' with milk';
  }
}

class VanillaCoffee implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost(): number {
    return this.coffee.getCost();
  }

  getDescription(): string {
    return this.coffee.getDescription() + ' with vanilla';
  }
}

class WhiskeyCoffee implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost(): number {
    return this.coffee.getCost();
  }

  getDescription(): string {
    return this.coffee.getDescription() + ' with whiskey';
  }
}

let coffee = new SimpleCoffee();
coffee = new VanillaCoffee(coffee);
console.log(coffee.getDescription());
