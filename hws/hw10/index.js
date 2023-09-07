const getUniqueId = () =>
  Math.floor(Date.now() * Math.random() + 10 - Math.random() * 10);

/**
 * PART 1
 */
/**
 * @classdesc Abstract class representing a book.
 * @class
 * @constructor
 * @param{string} title - The title of the book.
 * @param{string} author - The author of the book.
 * @param{string} isbn - The isbn of the book.
 * @param{number} price - The price of the book.
 * @param{boolean} availability - The availability of the book.
 */
class Book {
  #id;

  constructor({title, author, isbn, price, availability} = {}) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
    this.#id = getUniqueId();
  }

  printGenreDescription() {
    throw new Error('Method is not implemented');
  }

  printGenreOverview() {
    throw new Error('Method is not implemented');
  }

  get id() {
    return this.#id;
  }
}

/**
 * @classdesc Abstract class representing a fiction book.
 */
class FictionBook extends Book {
  printGenreDescription() {
    console.log(`${this.title} finction book was writtten by ${this.author}`);
  }

  printGenreOverview() {
    console.log(`Very interesting book, suitable for children`);
  }
}

/**
 * @classdesc Abstract class representing a horror book.
 */
class HorrorBook extends Book {
  printGenreDescription() {
    console.log(
      `${this.title} is a horror book which was writtten by ${this.author}, books in this genre are very interesting`,
    );
  }

  printGenreOverview() {
    console.log(
      `Not-suuitable for children, works for adults, not suitable for old people`,
    );
  }
}

/**
 * @classdesc Abstract class representing a thriller book.
 */
class ThrillerBook extends Book {
  printGenreDescription() {
    console.log(`Such books suitable for boys, girls do not like them`);
  }

  printGenreOverview() {
    console.log(`Thriller`);
  }
}

class User {
  #id;

  constructor({name, email} = {}) {
    this.name = name;
    this.email = email;
    this.#id = getUniqueId();
  }

  get id() {
    return this.#id;
  }
}

class Cart {
  #id;
  #items;

  constructor({userId}) {
    this.#items = [];
    this.#id = getUniqueId();
    this.userId = userId;
  }

  addItem(item) {
    if (!item?.availability) {
      throw new Error(`Item with id ${item.id} is not available`);
    }
    this.#items.push(item);
  }

  removeItem(item) {
    const itemIdx = this.#items.findIndex(currItem => currItem.id === item.id);
    if (itemIdx === -1) {
      throw new Error(`Item with id ${item.id} does not exist in the cart`);
    }
    this.#items.splice(itemIdx, 1);
  }

  getTotalPrice() {
    return this.#items.reduce((acc, item) => acc + item.price, 0);
  }

  getDescription() {
    return `${this.#items.reduce(
      (acc, item, idx) => `${acc}${idx === 0 ? '' : ','} ${item?.title}`,
      '',
    )}`;
  }

  get items() {
    return this.#items;
  }

  get id() {
    return this.#id;
  }
}

class Order {
  #cart;
  #id;
  #user;

  constructor({user, cart}) {
    this.#user = user;
    this.#cart = cart;
    this.#id = getUniqueId();
  }

  getOrderItems() {
    return this.#cart.items;
  }

  printOrderInfo() {
    console.log('*******');
    console.group();
    console.log(`Order: id ${this.#id}`);
    console.log(`User - name: ${this.#user.name}, email: ${this.#user.email}`);
    console.log(`Order - ${this.#cart.getDescription()}`);
    console.log(`Price: ${this.#cart.getTotalPrice()}`);
    console.groupEnd();
    console.log('*******');
  }

  get id() {
    return this.#id;
  }
}

/**
 * PART 2
 */

// books
const book1 = new HorrorBook({
  title: 'Book-1',
  author: 'Author-1',
  isbn: 'ISBN-11',
  price: 7.6,
  availability: true,
});
const book2 = new FictionBook({
  title: 'Book-2',
  author: 'Author-2',
  isbn: 'ISBN-22',
  price: 2.82,
  availability: true,
});
const book3 = new FictionBook({
  title: 'Book-3',
  author: 'Author-3',
  isbn: 'ISBN-33',
  price: 4.73,
  availability: true,
});
const book4 = new HorrorBook({
  title: 'Book-4',
  author: 'Author-4',
  isbn: 'ISBN-44',
  price: 7.27,
  availability: true,
});
const book5 = new ThrillerBook({
  title: 'Book-5',
  author: 'Author-5',
  isbn: 'ISBN-55',
  price: 5.71,
  availability: true,
});
const book6 = new ThrillerBook({
  title: 'Book-6',
  author: 'Author-6',
  isbn: 'ISBN-66',
  price: -1.32,
  availability: true,
});
const book7 = new FictionBook({
  title: 'Book-7',
  author: 'Author-7',
  isbn: 'ISBN-77',
  price: 1.31,
  availability: true,
});
const book8 = new FictionBook({
  title: 'Book-8',
  author: 'Author-8',
  isbn: 'ISBN-88',
  price: 11.77,
  availability: true,
});
const book9 = new ThrillerBook({
  title: 'Book-9',
  author: 'Author-9',
  isbn: 'ISBN-99',
  price: 10.22,
  availability: true,
});
const book10 = new HorrorBook({
  title: 'Book-10',
  author: 'Author-10',
  isbn: 'ISBN-1010',
  price: 0.56,
  availability: true,
});
const book11 = new ThrillerBook({
  title: 'Book-11',
  author: 'Author-11',
  isbn: 'ISBN-1111',
  price: 13.03,
  availability: true,
});
const book12 = new HorrorBook({
  title: 'Book-12',
  author: 'Author-12',
  isbn: 'ISBN-1212',
  price: 11.31,
  availability: true,
});
const book13 = new FictionBook({
  title: 'Book-13',
  author: 'Author-13',
  isbn: 'ISBN-1313',
  price: 8.0,
  availability: true,
});
const book14 = new ThrillerBook({
  title: 'Book-14',
  author: 'Author-14',
  isbn: 'ISBN-1414',
  price: 2.9,
  availability: true,
});
const book15 = new HorrorBook({
  title: 'Book-15',
  author: 'Author-15',
  isbn: 'ISBN-1515',
  price: 10.1,
  availability: true,
});
const book16 = new ThrillerBook({
  title: 'Book-16',
  author: 'Author-16',
  isbn: 'ISBN-1616',
  price: 7.14,
  availability: true,
});
const book17 = new HorrorBook({
  title: 'Book-17',
  author: 'Author-17',
  isbn: 'ISBN-1717',
  price: 4.13,
  availability: true,
});
const book18 = new FictionBook({
  title: 'Book-18',
  author: 'Author-18',
  isbn: 'ISBN-1818',
  price: 1.61,
  availability: true,
});
const book19 = new FictionBook({
  title: 'Book-19',
  author: 'Author-19',
  isbn: 'ISBN-1919',
  price: 1.47,
  availability: true,
});
const book20 = new HorrorBook({
  title: 'Book-20',
  author: 'Author-20',
  isbn: 'ISBN-2020',
  price: 2.36,
  availability: true,
});

/**
 * SCENARIO 1
 */
const user1 = new User({name: 'Ilya', email: 'test@email.com'});
const cart1 = new Cart({userId: user1.id});
cart1.addItem(book10);
cart1.addItem(book1);
cart1.addItem(book2);
cart1.addItem(book5);
cart1.addItem(book12);
const order = new Order({user: user1, cart: cart1});
order.printOrderInfo();

/**
 * SCENARIO 2
 */
const user2 = new User({name: 'User Name', email: 'user-email@email.com'});
const cart2 = new Cart({userId: user2.id});
cart2.addItem(book9);
cart2.addItem(book2);
cart2.addItem(book10);
cart2.addItem(book5);
cart2.addItem(book1);
cart2.addItem(book8);
cart2.addItem(book12);
cart2.removeItem(book1);
const order2 = new Order({user: user2, cart: cart2});
order2.printOrderInfo();
