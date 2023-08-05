const obj = {
  _name: 'Ilya',
  get name() {
    return this._name;
  },
  set name(v) {
    this._name = v.toUpperCase();
  },
};

console.log(obj.name);
obj.name = 'test';
console.log(obj.name);
console.log(Object.getOwnPropertyDescriptors(obj));
Object.preventExtensions(obj);
obj.a = 123;
console.log(obj.a);
console.log(Object.getOwnPropertyDescriptors(obj));
console.log(Object.isExtensible());
