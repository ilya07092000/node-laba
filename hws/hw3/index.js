const prop = propName => obj => obj[propName];
const getAverage = (arr = []) => makeSum(arr) / arr.length;
const getDiscountedValue = (value, discount) => value * (discount / 100);
const addUniqueString = (arr, str) => (arr.includes(str) ? arr : [...arr, str]);
const sortByPredicate = (predicate, arr) => arr.sort(predicate);
const greaterThanPredicate = (a, b) => a > b;
const makeSum = (arr = []) => arr.reduce(add, 0);
const splitBy = (sign = '', arr) => arr.split(sign);
const badParamsError = () => {
  throw new Error('Bad Params');
};
const isObject = obj => typeof obj === 'object' && obj !== null;
const makeSumByProp = (arr = [], property) =>
  arr.reduce((acc, curr) => add(acc, prop(property)(curr)), 0);
const add = (x, y) => x + y;
const unary =
  fn =>
  (...args) =>
    fn(args[0]);
/**
 * Task 1
 */

/**
 * 1.1
 */
const productsList = [
  {
    name: 'product 1',
    price: 100,
  },
  {
    name: 'product 2',
    price: 123,
  },
  {
    name: 'product 3',
    price: 43,
  },
  {
    name: 'product 4',
    price: 190,
  },
];

const getDiscountedProduct = (p, discount) => {
  const currPrice = prop('price')(p);
  return {
    ...p,
    price: currPrice - getDiscountedValue(currPrice, discount),
  };
};
const calculateDiscountedPrice = (products = [], discount = 0) =>
  Array.isArray(products) && typeof discount === 'number'
    ? products.map(p => getDiscountedProduct(p, discount))
    : badParamsError();
// console.log(calculateDiscountedPrice(productsList, 10));

/**
 * 1.2
 */
const calculateTotalPrice = (products = []) =>
  Array.isArray(products) ? makeSumByProp(products, 'price') : badParamsError();
// console.log(calculateTotalPrice(productsList));

/**
 * TASK 2
 */

/**
 * 2.1
 */
const getFullName = user =>
  isObject(user)
    ? `${prop('firstName')(user)} ${prop('lastName')(user)}`
    : badParamsError();
// console.log(getFullName({firstName: 'Ilya', lastName: 'Ischenko'}));

/**
 * 2.2
 */
const str = 'one two three three two one five';
const filterUniqueWords = string =>
  typeof string === 'string'
    ? sortByPredicate(
        greaterThanPredicate,
        splitBy(' ', string).reduce(addUniqueString, []),
      )
    : badParamsError();
// console.log(filterUniqueWords(str));

/**
 * 2.3
 */
const gradesList = [
  {
    name: 'Ilya',
    grades: [10, 12, 11, 9, 2, 10, 9, 1],
  },
  {
    name: 'Sasha',
    grades: [10, 12, 11, 9, 2, 10, 9],
  },
  {
    name: 'Alina',
    grades: [10, 12, 11, 9, 2, 10, 9],
  },
  {
    name: 'Oleg',
    grades: [10, 11, 9, 2, 10, 9, 8, 7],
  },
  {
    name: 'Stefan',
    grades: [10, 12, 11, 9, 2, 10, 9, 1, 2],
  },
];

const pipe =
  (...fns) =>
  input =>
    fns.reduce((mem, fn) => fn(mem), input);
const getGrades = student => prop('grades')(student);
const getStudentResult = student => average => ({...student, average});
const getAverageGradePerStudent = student =>
  pipe(unary(getGrades), getAverage, getStudentResult(student))(student);

const getAverageGrade = arr =>
  Array.isArray(arr) ? arr.map(getAverageGradePerStudent) : badParamsError();
// console.log(getAverageGrade(gradesList));

/**
 * TASK 3
 */

/**
 * 3.1
 */

const createCounter = () => {
  let counter = 0;
  return () => counter++;
};
// const counter1 = createCounter();
// const counter2 = createCounter();
// console.log(counter1());
// console.log(counter1());
// console.log(counter1());
// console.log(counter1());
// console.log(counter2());
// console.log(counter2());
// console.log(counter2());
// console.log(counter2());

/**
 * 3.2
 */
const repeatFunction = (fn, number) => {
  typeof fn !== 'function' && badParamsError();

  fn();
  number < 0
    ? repeatFunction(fn, (number -= 1))
    : number === 0
    ? ''
    : repeatFunction(fn, (number -= 1));
};
// repeatFunction(console.log, 10);
// repeatFunction(console.log, -1);

/**
 * TASK 4
 */
/**
 * 4.1
 */
const calculateFactorial = (number, result = 1) =>
  typeof number === 'number' && typeof result === 'number'
    ? number === 1
      ? result
      : calculateFactorial(number - 1, result * number)
    : badParamsError();
// console.log(calculateFactorial(1000));

/**
 * 4.2
 */
const power = (base, exponent, result = base) =>
  typeof base === 'number' &&
  typeof exponent === 'number' &&
  typeof result === 'number'
    ? exponent === 1
      ? result
      : power(base, exponent - 1, result * base)
    : badParamsError();
// console.log(power(2, 3));
// console.log(power(5, 3));

/**
 * TASK 5
 */
/**
 * 5.1
 */
const lazyMap = (arr, mapFunc) => {
  !(Array.isArray(arr) && typeof mapFunc === 'function') && badParamsError();

  let counter = 0;
  const arrLength = arr.length;

  return () => {
    const result = counter < arrLength ? mapFunc(arr[counter]) : false;
    counter++;
    return result;
  };
};
const myLazyMap = lazyMap(gradesList, getAverageGradePerStudent);
// console.log(myLazyMap());
// console.log(myLazyMap());
// console.log(myLazyMap());
// console.log(myLazyMap());
// console.log(myLazyMap());

/**
 * 5.2
 */
const fibonacciGenerator = () => {
  const list = [0, 1, 1];
  let counter = 0;
  let result = 0;

  return () => {
    result = counter <= 2 ? list[counter] : list[counter] + list[counter - 1];
    counter >= 2 && list.push(result);
    counter++;
    return result;
  };
};
const fibbonaccySequence = fibonacciGenerator();
// console.log(fibbonaccySequence());
// console.log(fibbonaccySequence());
// console.log(fibbonaccySequence());
// console.log(fibbonaccySequence());
// console.log(fibbonaccySequence());
// console.log(fibbonaccySequence());
// console.log(fibbonaccySequence());
// console.log(fibbonaccySequence());
