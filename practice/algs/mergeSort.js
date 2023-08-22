const arr = [
  32, 18, 47, 5, 72, 91, 10, 63, 26, 54, 78, 2, 41, 89, 13, 60, 36, 80, 25, 59,
  43, 96, 7, 69, 15, 83, 21, 48, 67, 9, 55, 30, 86, 12, 38, 74, 17, 94, 50, 3,
  28, 76, 52, 20, 44, 97, 6, 87, 34, 81, 23, 51, 39, 92, 11, 64, 31, 75, 19, 56,
  40, 98, 8, 66, 27, 84, 22, 49, 37, 95, 14, 61, 33, 77, 16, 42, 29, 85, 24, 53,
  35, 93, 4, 70, 58, 1, 79, 45, 82, 68, 90, 57, 46, 99, 62, 88, 65, 100,
];

function mergeSort(list) {
  if (list.length < 2) {
    return list;
  }

  const middleIndex = Math.floor(list.length / 2);
  const leftPart = mergeSort(list.slice(0, middleIndex));
  const rightPart = mergeSort(list.slice(middleIndex));

  return merge(leftPart, rightPart);
}

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

console.log('arr', mergeSort(arr));
