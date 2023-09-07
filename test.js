// function F() {
// 	return F;
// }

// console.log(new F() instanceof F);
// console.log(new F() instanceof Function);
// console.log(F.prototype);

/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1, m, nums2, n) {
  const result = [];
  let firstTracker = 0;
  let secondTracker = 0;

  while (firstTracker < n && secondTracker < n) {
    if (nums1[firstTracker] < nums2[secondTracker]) {
      if (nums1[firstTracker] !== 0) {
        result.push(nums1[firstTracker]);
      }
      firstTracker += 1;
    } else {
      if (nums2[secondTracker] !== 0) {
        result.push(nums2[secondTracker]);
      }
      secondTracker += 1;
    }
  }
  console.log(result);

  while (firstTracker < n) {
    result.push(nums1[firstTracker]);
    firstTracker += 1;
  }

  while (secondTracker < n) {
    result.push(nums2[secondTracker]);
    secondTracker += 1;
  }

  for (let i = 0; i < result.length; i += 1) {
    nums1[i] = result[i];
  }
}

console.log(merge([1, 2, 4, 5, 6, 0]));
