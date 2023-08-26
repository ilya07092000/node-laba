/**
 * according to the measure result which you can see in console after making "node index" command,
 * bubble sort executes fast with arrays up to 10 elements
 * merge sort executes very fast with arrays above 30 elements
 * quick sort is in the middle, it works faster than bubble sort, but slower than merge sort with 30+ elements
 */

const randomArray = [
  32, 18, 47, 5, 72, 91, 10, 63, 26, 54, 78, 2, 41, 89, 13, 60, 36, 80, 25, 59,
  43, 96, 7, 69, 15, 83, 21, 48, 67, 9, 55, 30, 86, 12, 38, 74, 17, 94, 50, 3,
  28, 76, 52, 20, 44, 97, 6, 87, 34, 81, 23, 51, 39, 92, 11, 64, 31, 75, 19, 56,
  40, 98, 8, 66, 27, 84, 22, 49, 37, 95, 14, 61, 33, 77, 16, 42, 29, 85, 24, 53,
  35, 93, 4, 70, 58, 1, 79, 45, 82, 68, 90, 57, 46, 99, 62, 88, 65, 100,
];

const sortedArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 72, 74, 75, 76, 77, 78, 79, 80, 81,
  82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
];

const sortedBackwardArray = [
  199, 198, 197, 196, 195, 194, 193, 192, 191, 190, 189, 188, 187, 186, 185,
  184, 183, 182, 181, 180, 179, 178, 177, 176, 175, 174, 173, 172, 171, 170,
  169, 168, 167, 166, 165, 164, 163, 162, 161, 160, 159, 158, 157, 156, 155,
  154, 153, 152, 151, 150, 149, 148, 147, 146, 145, 144, 143, 142, 141, 140,
  139, 138, 137, 136, 135, 134, 133, 132, 131, 130, 129, 128, 127, 126, 125,
  124, 123, 122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 110,
  109, 108, 107, 106, 105, 104, 103, 102, 101, 100,
];

function bubbleSort(arr) {
  const copyArr = [...arr];
  for (let i = 0; i < copyArr.length; i += 1) {
    for (let j = 0; j < copyArr.length - i; j += 1) {
      if (copyArr[j] > copyArr[j + 1]) {
        const temp = copyArr[j];
        copyArr[j] = copyArr[j + 1];
        copyArr[j + 1] = temp;
      }
    }
  }
  return copyArr;
}
// console.log(bubbleSort(randomArray));

function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivotIdx = Math.floor(arr.length / 2);
  const pivotEl = arr[pivotIdx];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (i === pivotIdx) {
      continue;
    }

    if (arr[i] > pivotEl) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }

  return [...quickSort(left), pivotEl, ...quickSort(right)];
}
// console.log(quickSort(randomArray));

function merge(list1, list2) {
  const cominedLists = [];
  let l1Tracker = 0;
  let l2Tracker = 0;

  while (l1Tracker < list1.length && l2Tracker < list2.length) {
    if (list1[l1Tracker] < list2[l2Tracker]) {
      cominedLists.push(list1[l1Tracker]);
      l1Tracker += 1;
    } else {
      cominedLists.push(list2[l2Tracker]);
      l2Tracker++;
    }
  }

  while (l1Tracker < list1.length) {
    cominedLists.push(list1[l1Tracker]);
    l1Tracker += 1;
  }

  while (l2Tracker < list2.length) {
    cominedLists.push(list2[l2Tracker]);
    l2Tracker += 1;
  }

  return cominedLists;
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const middleIndex = Math.floor(arr.length / 2);
  const leftPart = mergeSort(arr.slice(0, middleIndex));
  const rightPart = mergeSort(arr.slice(middleIndex));

  return merge(leftPart, rightPart);
}
// console.log(mergeSort(randomArray));

const measureFuncPerformance = (func = () => {}) => {
  if (typeof func !== 'function') {
    throw new Error('Bad Argument');
  }
  const start = performance.now();
  func();
  const end = performance.now();
  return end - start;
};

/**
 * returns object with length as key,
 * and array with corresponding length as value
 */
const getDifferentLengthArray = arr => {
  const result = {};
  let idx = 2;

  while (idx < arr.length) {
    result[idx] = arr.slice(0, idx);

    if (idx < 10) {
      idx++;
    } else {
      idx += 10;
    }
  }

  return result;
};

/**
 * returns object with array name as key,
 * and object of arrays with different length as a value
 */
const getTestArraysWithDifferentLenght = testArrays => {
  const arraysWithDifferentLength = {};
  Object.entries(testArrays).forEach(([arrName, arr]) => {
    arraysWithDifferentLength[arrName] = getDifferentLengthArray(arr);
  });
  return arraysWithDifferentLength;
};

const measureSortingPerformance = (testFunctions, testArrays) => {
  const testCases = getTestArraysWithDifferentLenght(testArrays);
  const results = {};

  Object.entries(testCases).forEach(([arrName, arrObject]) => {
    results[arrName] = {};
    Object.entries(arrObject).forEach(([arrLength, singleArray]) => {
      results[arrName][arrLength] = {length: arrLength};
      testFunctions.forEach(func => {
        const perfResult = measureFuncPerformance(() => func(singleArray));
        results[arrName][arrLength][func.name] = `${perfResult.toFixed(4)} ms`;
      });
    });
  });

  return results;
};

const makeInput = (arrName, results) => {
  console.log('---------------');
  console.log(arrName);
  console.group();
  console.table(results);
  console.groupEnd();
  console.log('---------------');
};

const testFunctions = [bubbleSort, quickSort, mergeSort];
const testArrays = {
  randomArray,
  sortedArray,
  sortedBackwardArray,
};

const makeTask = () => {
  const sortingPerformance = measureSortingPerformance(
    testFunctions,
    testArrays,
  );

  Object.entries(sortingPerformance).forEach(([arrName, results]) =>
    makeInput(arrName, results),
  );
};
makeTask();

// ---------------
// randomArray
//   ┌─────────┬────────┬─────────────┬─────────────┬─────────────┐
//   │ (index) │ length │ bubbleSort  │  quickSort  │  mergeSort  │
//   ├─────────┼────────┼─────────────┼─────────────┼─────────────┤
//   │    2    │  '2'   │ '0.0729 ms' │ '0.0681 ms' │ '0.0796 ms' │
//   │    3    │  '3'   │ '0.0032 ms' │ '0.0117 ms' │ '0.0095 ms' │
//   │    4    │  '4'   │ '0.1318 ms' │ '0.0082 ms' │ '0.0122 ms' │
//   │    5    │  '5'   │ '0.0031 ms' │ '0.0240 ms' │ '0.0216 ms' │
//   │    6    │  '6'   │ '0.0050 ms' │ '0.0256 ms' │ '0.0081 ms' │
//   │    7    │  '7'   │ '0.0103 ms' │ '0.0073 ms' │ '0.0076 ms' │
//   │    8    │  '8'   │ '0.0036 ms' │ '0.0069 ms' │ '0.0046 ms' │
//   │    9    │  '9'   │ '0.0042 ms' │ '0.0081 ms' │ '0.0080 ms' │
//   │   10    │  '10'  │ '0.0048 ms' │ '0.0088 ms' │ '0.0085 ms' │
//   │   20    │  '20'  │ '0.0182 ms' │ '0.0168 ms' │ '0.0189 ms' │
//   │   30    │  '30'  │ '0.0336 ms' │ '0.0297 ms' │ '0.0289 ms' │
//   │   40    │  '40'  │ '0.0591 ms' │ '0.0431 ms' │ '0.0399 ms' │
//   │   50    │  '50'  │ '0.1263 ms' │ '0.0604 ms' │ '0.0565 ms' │
//   │   60    │  '60'  │ '0.1303 ms' │ '0.0636 ms' │ '0.0598 ms' │
//   │   70    │  '70'  │ '0.1769 ms' │ '0.0780 ms' │ '0.0739 ms' │
//   │   80    │  '80'  │ '0.4642 ms' │ '0.1006 ms' │ '0.1087 ms' │
//   │   90    │  '90'  │ '0.2949 ms' │ '0.1195 ms' │ '0.1032 ms' │
// └─────────┴────────┴─────────────┴─────────────┴─────────────┘

// ---------------
// sortedArray
//   ┌─────────┬────────┬─────────────┬─────────────┬─────────────┐
//   │ (index) │ length │ bubbleSort  │  quickSort  │  mergeSort  │
//   ├─────────┼────────┼─────────────┼─────────────┼─────────────┤
//   │    2    │  '2'   │ '0.0735 ms' │ '0.0723 ms' │ '0.0808 ms' │
//   │    3    │  '3'   │ '0.0030 ms' │ '0.0101 ms' │ '0.0086 ms' │
//   │    4    │  '4'   │ '0.1463 ms' │ '0.0081 ms' │ '0.0110 ms' │
//   │    5    │  '5'   │ '0.0055 ms' │ '0.0224 ms' │ '0.0205 ms' │
//   │    6    │  '6'   │ '0.0088 ms' │ '0.0323 ms' │ '0.0085 ms' │
//   │    7    │  '7'   │ '0.0025 ms' │ '0.0064 ms' │ '0.0040 ms' │
//   │    8    │  '8'   │ '0.0028 ms' │ '0.0062 ms' │ '0.0045 ms' │
//   │    9    │  '9'   │ '0.0031 ms' │ '0.0039 ms' │ '0.0052 ms' │
//   │   10    │  '10'  │ '0.0036 ms' │ '0.0076 ms' │ '0.0078 ms' │
//   │   20    │  '20'  │ '0.0107 ms' │ '0.0145 ms' │ '0.0171 ms' │
//   │   30    │  '30'  │ '0.0217 ms' │ '0.0256 ms' │ '0.0264 ms' │
//   │   40    │  '40'  │ '0.0374 ms' │ '0.1423 ms' │ '0.0644 ms' │
//   │   50    │  '50'  │ '0.0864 ms' │ '0.0518 ms' │ '0.0465 ms' │
//   │   60    │  '60'  │ '0.1296 ms' │ '0.0836 ms' │ '0.0574 ms' │
//   │   70    │  '70'  │ '0.1136 ms' │ '0.0628 ms' │ '0.0668 ms' │
//   │   80    │  '80'  │ '0.1440 ms' │ '0.0783 ms' │ '0.0833 ms' │
//   │   90    │  '90'  │ '0.4394 ms' │ '0.1156 ms' │ '0.0948 ms' │
//   └─────────┴────────┴─────────────┴─────────────┴─────────────┘
// ---------------

// sortedBackwardArray
//   ┌─────────┬────────┬─────────────┬─────────────┬─────────────┐
//   │ (index) │ length │ bubbleSort  │  quickSort  │  mergeSort  │
//   ├─────────┼────────┼─────────────┼─────────────┼─────────────┤
//   │    2    │  '2'   │ '0.0745 ms' │ '0.0718 ms' │ '0.0848 ms' │
//   │    3    │  '3'   │ '0.0036 ms' │ '0.0100 ms' │ '0.0056 ms' │
//   │    4    │  '4'   │ '0.1543 ms' │ '0.0080 ms' │ '0.0077 ms' │
//   │    5    │  '5'   │ '0.0035 ms' │ '0.0208 ms' │ '0.0253 ms' │
//   │    6    │  '6'   │ '0.0056 ms' │ '0.0302 ms' │ '0.0076 ms' │
//   │    7    │  '7'   │ '0.0036 ms' │ '0.0061 ms' │ '0.0041 ms' │
//   │    8    │  '8'   │ '0.0041 ms' │ '0.0063 ms' │ '0.0072 ms' │
//   │    9    │  '9'   │ '0.0048 ms' │ '0.0069 ms' │ '0.0081 ms' │
//   │   10    │  '10'  │ '0.0057 ms' │ '0.0076 ms' │ '0.0061 ms' │
//   │   20    │  '20'  │ '0.0200 ms' │ '0.0148 ms' │ '0.0177 ms' │
//   │   30    │  '30'  │ '0.0430 ms' │ '0.0249 ms' │ '0.0270 ms' │
//   │   40    │  '40'  │ '0.0792 ms' │ '0.0357 ms' │ '0.0376 ms' │
//   │   50    │  '50'  │ '0.1621 ms' │ '0.0461 ms' │ '0.0482 ms' │
//   │   60    │  '60'  │ '0.1732 ms' │ '0.0513 ms' │ '0.0574 ms' │
//   │   70    │  '70'  │ '0.2326 ms' │ '0.0663 ms' │ '0.0718 ms' │
//   │   80    │  '80'  │ '0.5411 ms' │ '0.0877 ms' │ '0.0817 ms' │
//   │   90    │  '90'  │ '0.3771 ms' │ '0.0942 ms' │ '0.1340 ms' │
//   └─────────┴────────┴─────────────┴─────────────┴─────────────┘
