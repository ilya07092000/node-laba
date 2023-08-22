// O(n^2)  -  worst

const arr = [
  32, 18, 47, 5, 72, 91, 10, 63, 26, 54, 78, 2, 41, 89, 13, 60, 36, 80, 25, 59,
  43, 96, 7, 69, 15, 83, 21, 48, 67, 9, 55, 30, 86, 12, 38, 74, 17, 94, 50, 3,
  28, 76, 52, 20, 44, 97, 6, 87, 34, 81, 23, 51, 39, 92, 11, 64, 31, 75, 19, 56,
  40, 98, 8, 66, 27, 84, 22, 49, 37, 95, 14, 61, 33, 77, 16, 42, 29, 85, 24, 53,
  35, 93, 4, 70, 58, 1, 79, 45, 82, 68, 90, 57, 46, 99, 62, 88, 65, 100,
];

function quickSort(list) {
  if (list.length < 2) {
    return list;
  }

  const pivotIdx = Math.floor(list.length / 2);
  const pivotEl = list[pivotIdx];
  const leftList = [];
  const rightList = [];

  for (let i = 0; i < list.length; i += 1) {
    if (i === pivotIdx) {
      continue;
    }

    if (list[i] > pivotEl) {
      rightList.push(list[i]);
    } else {
      leftList.push(list[i]);
    }
  }

  return [...quickSort(leftList), pivotEl, ...quickSort(rightList)];
}

console.log('arr', quickSort(arr));
