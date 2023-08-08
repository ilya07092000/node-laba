const updateObjDescriptors = (obj, propNames = [], descriptorObj = {}) => {
  propNames.forEach(prop => {
    if (prop in obj) {
      Object.defineProperty(obj, prop, descriptorObj);
    }
  });
};

const handleObjChanges = (obj = {}, propNames = [], cb = () => {}) => {
  propNames.forEach(prop => {
    if (prop in obj) {
      const propName = `_${prop}`;
      obj[propName] = obj[prop];
      Object.defineProperty(obj, prop, {
        get() {
          cb({method: 'get', prop, value: obj[propName]});
          return obj[propName];
        },

        set(value) {
          cb({method: 'set', prop, value});
          obj[propName] = value;
        },
      });
    }
  });
};

const shallowClone = obj =>
  Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj),
  );

const isStrictObj = obj =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

const isObjOrArr = obj => typeof obj === 'object' && obj !== null;

/**
 * TASK 1
 */
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john.doe@example.com',

  updateInfo(newInfo) {
    Object.entries(newInfo).forEach(([key, value]) => {
      if (key in this) {
        const propDescriptor = Object.getOwnPropertyDescriptor(this, key);
        if (propDescriptor.writable && propDescriptor.configurable) {
          this[key] = value;
        }
      }
    });
  },
};
updateObjDescriptors(person, Object.keys(person), {writable: false});

// console.log(Object.getOwnPropertyDescriptors(person));
// person.firstName = 'Ilya';
// console.log(person);
// person.test = null;
// person.updateInfo({firstName: 'Ilya', lastName: 'Ischenko', test: 123});
// console.log(person);
Object.defineProperty(person, 'address', {
  value: {},
  configurable: false,
  enumerable: false,
});
// console.log(Object.getOwnPropertyNames(person));

/**
 * TASK 2
 */
const product = {
  name: 'Laptop',
  price: 1000,
  quantity: 5,
};
updateObjDescriptors(product, ['price', 'quantity'], {
  enumerable: false,
  writable: false,
});
// console.log(Object.getOwnPropertyDescriptors(product));

const getTotalPrice = product => {
  const price = Object.getOwnPropertyDescriptor(product, 'price').value;
  const quantity = Object.getOwnPropertyDescriptor(product, 'price').value;
  if (
    price <= 0 ||
    quantity <= 0 ||
    typeof price !== 'number' ||
    typeof quantity !== 'number'
  ) {
    return 0;
  }

  return (
    Object.getOwnPropertyDescriptor(product, 'price').value *
    Object.getOwnPropertyDescriptor(product, 'quantity').value
  );
};
// console.log(getTotalPrice(product));

const deleteNonConfigurable = (obj, propName) => {
  const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, propName);
  if (!propertyDescriptor) {
    throw new Error('Property Does Not Exist');
  }

  if (!propertyDescriptor.configurable) {
    throw new Error('Property Is Non Configurable');
  }
  delete obj[propName];
};
// deleteNonConfigurable(product, '123'); // error
// deleteNonConfigurable(person, 'address'); // error
deleteNonConfigurable(product, 'name');
// console.log(product);

/**
 * TASK 3
 */
const bankAccount = {
  _balance: 1000,

  get balance() {
    return this._balance;
  },

  set balance(value) {
    this._balance = value;
  },

  get formattedBalance() {
    return `$${this._balance}`;
  },

  transfer(from, to, amount) {
    if (from.balance < amount) {
      throw new Error('Not enough money');
    }
    to.balance += amount;
    from.balance -= amount;
  },
};

const acc1 = shallowClone(bankAccount);
const acc2 = shallowClone(bankAccount);
acc1.transfer(acc1, acc2, 500);
// console.log(acc1.formattedBalance);
// console.log(acc2.formattedBalance);

/**
 * TASK 4
 */
const test = {
  test: 123,
  name: {
    inner1: {
      someValue: 2,
      inner2: {
        bla: 3,
        array: [1, 2, 3, {test: 123}, [1, {anotherTest: 789}]],
      },
    },
  },
};

const createImmutableObject = obj => {
  if (!isObjOrArr(obj)) {
    return;
  }

  if (isStrictObj(obj)) {
    const props = Object.getOwnPropertyNames(obj);
    updateObjDescriptors(obj, props, {
      writable: false,
      configurable: false,
    });
    props.forEach(key => {
      const curr = obj[key];
      if (isObjOrArr(curr)) {
        createImmutableObject(curr);
      }
    });
  } else if (Array.isArray(obj)) {
    obj.forEach(item => {
      if (isObjOrArr(item)) {
        createImmutableObject(item);
      }
    });
  }
};
createImmutableObject(test);
// console.log(Object.getOwnPropertyDescriptors(test));
// console.log(Object.getOwnPropertyDescriptors(test.name));
// console.log(Object.getOwnPropertyDescriptors(test.name.inner1));
// console.log(Object.getOwnPropertyDescriptors(test.name.inner1.inner2));
// console.log(Object.getOwnPropertyDescriptors(test.name.inner1.inner2.array[3]));
// console.log(
//   Object.getOwnPropertyDescriptors(test.name.inner1.inner2.array[4][1]),
// );

/**
 * TASK 5
 */
const observeObject = (obj, cb = () => {}) => {
  if (!isStrictObj(obj) || typeof cb !== 'function') {
    return;
  }

  handleObjChanges(obj, Object.keys(obj), cb);

  return obj;
};
const personObserver = observeObject(person, console.log);
// personObserver.firstName = 'Ilya';
// personObserver.age;

/**
 * TASK 6
 */
const objForClone = {
  test: 123,
  name: {
    inner1: {
      someValue: 2,
      inner2: {
        bla: 3,
        array: [1, 2, 3, {test: 123}, [1, {anotherTest: 789}]],
      },
    },
  },
};

// const objForClone = {
//   test: 123,
//   name: {
//     inner1: {
//       inner2: {
//         array: [],
//       },
//     },
//   },
// };

const deepCloneObject = obj => {
  const refs = new Set();

  if (!isStrictObj(obj)) {
    return {};
  }

  const makeClone = cloneObj => {
    if (!isObjOrArr(cloneObj)) {
      return null;
    }
    if (refs.has(cloneObj)) {
      return cloneObj;
    }
    refs.add(cloneObj);

    const currClone = Array.isArray(cloneObj) ? [] : {};
    for (key in cloneObj) {
      const currValue = cloneObj[key];

      if (!isObjOrArr(currValue)) {
        currClone[key] = currValue;
      } else {
        currClone[key] = makeClone(currValue);
      }
    }

    return currClone;
  };

  return makeClone(obj);
};

objForClone.name.inner1.inner2.array.push(objForClone.name); // circular dependency
const clonedObj = deepCloneObject(objForClone);
// console.log('clonedObj', clonedObj);
// console.log(clonedObj === objForClone);
// console.log(clonedObj.name === objForClone.name);
// console.log(
//   clonedObj.name.inner1.inner2.array[3] ===
//     objForClone.name.inner1.inner2.array[3],
// );

/**
 *
 * TASK 7
 */
const objToValidate = {
  name: 'Ilya',
  surname: 'Ischenko',
  age: 22,
  greeting: () => console.log('hello'),
  interests: ['swimming', 'walking', ''],
};
const schema = {
  name: {
    type: 'string',
  },
  surname: {
    type: 'string',
  },
  age: {
    type: 'number',
    minValue: 18,
  },
  greeting: {
    type: 'function',
  },
  interests: {
    type: 'array',
    minLength: 2,
  },
};

const typeChecker = (value, desiredType) => {
  if (desiredType === 'object') {
    return isStrictObj(value);
  }

  if (desiredType === 'array') {
    return Array.isArray(value);
  }

  if (desiredType === 'null') {
    return value === null;
  }

  return typeof value === desiredType;
};

const arrayChecker = (arr = [], schema) => {
  if (!typeChecker(arr, 'array')) return false;

  if (arr.length < schema?.minLength) {
    return false;
  }

  if (arr.length > schema?.maxLength) {
    return false;
  }

  return true;
};

const validateObject = (obj, schema) => {
  return Object.entries(schema).every(([key, value]) => {
    if (!(key in obj) || !typeChecker(obj[key], value.type)) return false;
    if (value.type === 'array' && !arrayChecker(obj[key], value)) {
      return false;
    }

    return true;
  });
};
// console.log(validateObject(objToValidate, schema));
