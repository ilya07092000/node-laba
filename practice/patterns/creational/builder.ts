/**
 * for complex creational logic
 */
class Burger {
  private size: number;
  private cheese: boolean;
  private lettuce: boolean;
  private bacon: boolean;
  private tomato: boolean;

  constructor(builder: BurgerBuilder) {
    this.size = builder.size;
    this.bacon = builder.bacon;
    this.cheese = builder.cheese;
    this.lettuce = builder.lettuce;
    this.tomato = builder.tomato;
  }
}

class BurgerBuilder {
  public size;
  public cheese = false;
  public lettuce = false;
  public bacon = false;
  public tomato = false;

  constructor(size: number) {
    this.size = size;
  }

  addCheese() {
    this.cheese = true;
    return this;
  }

  addLettuce() {
    this.lettuce = true;
    return this;
  }

  addBacon() {
    this.bacon = true;
    return this;
  }

  addTomato() {
    this.tomato = true;
    return this;
  }

  build(): Burger {
    return new Burger(this);
  }
}

let burger = new BurgerBuilder(2).addBacon().addCheese().build();
console.log('burger', burger);
