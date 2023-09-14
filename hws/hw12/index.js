/**
 * I consider this hash function as good one,
 * because even one characted in a string affects on result very much
 */
const customHash = s => {
  const MAX_LENGTH = 1e10 + 7;
  let result = 0;
  let coefficient = 2;

  for (let i = 0; i < s.length; i++) {
    result += (s.charCodeAt(i) * coefficient) % MAX_LENGTH;
    coefficient += (coefficient * coefficient) % MAX_LENGTH;
  }
  return result;
};
// console.log(customHash('my string')); // 18837529818
// console.log(customHash('my sfring')); // 18791841630

/**
 * HASH TABLE
 */
class CustomHashTable {
  constructor(hashFunc = customHash) {
    this.hasTable = {};
    this.hashFunc = hashFunc;
  }

  hash(key) {
    return this.hashFunc(key);
  }

  insert(key, value) {
    const hash = this.hash(key);
    if (!(hash in this.hasTable)) {
      this.hasTable[hash] = [];
    }
    this.hasTable[hash].push([key, value]);
  }

  get(key) {
    const hash = this.hash(key);
    if (!(hash in this.hasTable)) {
      return null;
    }
    return this.hasTable[hash].find(([k]) => k === key) || null;
  }

  delete(key) {
    const hash = this.hash(key);
    if (!(hash in this.hasTable)) {
      return false;
    }

    const itemIdx = this.hasTable[hash].findIndex(([k]) => k === key);
    if (itemIdx < 0) {
      return false;
    }

    if (this.hasTable[hash].length === 1) {
      delete this.hasTable[hash];
    } else {
      this.hasTable[hash].splice(itemIdx, 1);
    }
    return true;
  }
}

const myHashTable = new CustomHashTable();
myHashTable.insert('name', 'Ilya');
myHashTable.insert('age', '23');
myHashTable.insert('sex', 'm');
myHashTable.insert('city', 'Kyiv');
for (let i = 0; i < 200; i += 1) {
  myHashTable.insert(`key-${i}`, `value-${i}`);
}

/**
 * 1
 */
// console.table(myHashTable.hasTable);
// console.log(myHashTable.get('key-100'));
// console.log(myHashTable.get('city'));

/**
 * 2
 */
// console.log(myHashTable.delete('key-100')); // true (key was deleted)
// console.log(myHashTable.delete('key-100')); // false (key does not exist anymore)
// console.log(myHashTable.get('key-100')); // null (key was not found)
