const obj = {
  _name: 'Ilya',
  get name() {
    return this._name;
  },
  set name(v) {
    this._name = v.toUpperCase();
  },
};

// console.log(obj.name);
// obj.name = 'test';
// console.log(obj.name);
// console.log(Object.getOwnPropertyDescriptors(obj));
// Object.preventExtensions(obj);
// obj.a = 123;
// console.log(obj.a);
// console.log(Object.getOwnPropertyDescriptors(obj));
// console.log(Object.isExtensible());

/**
 *
 */

// const test = {name: 'Ilya'};
// const test2 = Object.create(test);
// console.log(test.__proto__ === Object.prototype);
// console.log(test2.__proto__ === Object.prototype);
// console.log(test2.__proto__ === test);
// console.log(Object.getOwnPropertyNames(test2)); // all incl non-enumerable
// for (k in test2) console.log(k); // all incl proto

/**
 *
 */

// const myObj = {
//   name: 'Ilya',
//   surname: 'Ischenko',
// };
// Object.defineProperty(myObj, 'name', {
//   enumerable: false,
// });
// console.log(Object.getOwnPropertyNames(myObj)); // all incl non-enumerable
// console.log(Object.keys(myObj)); // without non-enumerable
