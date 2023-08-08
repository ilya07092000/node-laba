const {PerformanceObserver, performance} = require('node:perf_hooks');

const testArr = [
  {
    age: 22,
  },
  {
    age: 10,
  },
  {
    age: 15,
  },
  {
    age: 21,
  },
  {
    age: 21,
  },
  {
    age: 21,
  },
  {
    age: 78,
  },
  {
    age: 78,
  },
  {
    age: 78,
  },
  {
    age: 23,
  },
  {
    age: 12,
  },
  {
    age: 28,
  },
  {
    age: 44,
  },
];

const findObjInArr = (arr, obj) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (JSON.stringify(arr[i]) === JSON.stringify(obj)) {
      return arr[i];
    }
  }
  return null;
};

/**
 * TASK 1
 */
const customFilterUnique = (arr, cb) => {
  if (!Array.isArray(arr) || typeof cb !== 'function') {
    throw new Error('Bad Arguments');
  }
  const result = [];
  arr.forEach(item => {
    if (cb(item) && !findObjInArr(result, item)) {
      result.push(item);
    }
  });
  return result;
};

// console.log(customFilterUnique(testArr, item => item.age >= 20));

/**
 * TASK 2
 */
const chunkArray = (arr, chunkSize) => {
  if (!Array.isArray(arr) || arr.length < chunkSize) {
    throw new Error('Bad Arguments');
  }

  const result = [];
  const partsCount = Math.ceil(arr.length / chunkSize);
  for (let i = 0; i < partsCount; i += 1) {
    const startIdx = i * chunkSize;
    result.push(arr.slice(startIdx, startIdx + chunkSize));
  }
  return result;
};
// console.log(chunkArray(testArr, 2));
// console.log(chunkArray(testArr, 3));
// console.log(chunkArray(testArr, 4));

/**
 * TASK 3
 */
const customShuffle = arr => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
// console.log(customShuffle(testArr));

/**
 * TASK 4
 */
const arrForTest1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arrForTest2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 4, 1, 2, 90];

const getArrayUnion = (arr1, arr2) => [
  ...arr1.filter(item => arr2.includes(item)),
  ...arr2.filter(item => arr1.includes(item)),
];

const getArrayIntersection = (arr1, arr2) =>
  Array.from(
    new Set([
      ...arr1.filter(item => arr2.includes(item)),
      ...arr2.filter(item => arr1.includes(item)),
    ]),
  );
// console.log(getArrayUnion(arrForTest1, arrForTest2));
// console.log(getArrayIntersection(arrForTest1, arrForTest2));

/**
 * TASK 5
 */

const perfObserver = new PerformanceObserver(items => {
  items.getEntries().forEach(entry => {
    console.log(entry);
  });
});
perfObserver.observe({entryTypes: ['measure'], buffer: true});

const measureArrayPerformance = (func, name = '') => {
  performance.mark('start');
  func();
  performance.mark('end');
  performance.measure(name, 'start', 'end');
};

// measureArrayPerformance(
//   () => customFilterUnique(testArr, item => item.age >= 20),
//   'custom filter',
// );
// measureArrayPerformance(
//   () => testArr.filter(item => item.age >= 20),
//   'built in filter',
// );
