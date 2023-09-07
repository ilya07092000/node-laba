class User {
  #name;

  constructor(name) {
    this.#name = name;
    this.test = name;
  }

  getName() {
    return this.#name;
  }
}

const myUser = new User('Ilya');
console.log(myUser.constructor === User);
console.log(myUser.getName());
console.log(myUser.name);
