const a = [1, 2, 3];
const it = a[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log([{name: 'Ilya'}, [], 1].toString());
