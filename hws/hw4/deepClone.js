const isStrictObj = obj =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

const isObjOrArr = obj => typeof obj === 'object' && obj !== null;

const objForClone = {
  test: 123,
  name: {
    another: 3,
    innerSome: {
      other: 123,
    },
    inner1: {
      someValue: 2,
      inner2: {
        bla: 3,
        array: [1, 2, 3, {test: 123}, [1, {anotherTest: 789}]],
      },
    },
  },
};

const deepCloneObject = obj => {
  const refs = new Set();

  if (!isStrictObj(obj)) {
    return {};
  }

  const makeClone = cloneObj => {
    const currClone = {};

    for (key in cloneObj) {
      const currValue = cloneObj[key];
      const stack = [];

      if (!isObjOrArr(currValue)) {
        currClone[key] = currValue;
      } else {
        const outerClone = Array.isArray(currValue) ? [] : {}; // reference obj
        currClone[key] = outerClone; // reference to obj
        stack.push([currValue, outerClone]); // [value, objRefForClone]

        while (stack.length) {
          const [value, ref] = stack.pop();
          refs.add(value);

          for (innerKey in value) {
            const innerValue = value[innerKey];
            if (!isObjOrArr(innerValue)) {
              ref[innerKey] = innerValue;
            } else {
              if (refs.has(innerValue)) {
                ref[innerKey] = innerValue;
              } else {
                const objRefForClone = Array.isArray(innerValue) ? [] : {};
                ref[innerKey] = objRefForClone;
                stack.push([innerValue, objRefForClone]);
              }
            }
          }
        }
      }
    }
    return currClone;
  };

  return makeClone(obj);
};

objForClone.name.inner1.inner2.array.push(objForClone.name); // circular dependency
const clonedObj = deepCloneObject(objForClone);
// console.log('clonedObj', clonedObj);
// console.log('clonedObj', clonedObj.name.inner1.inner2.array);
// console.log('clonedObj', clonedObj);
// console.log(clonedObj === objForClone);
// console.log(clonedObj.name === objForClone.name);
// console.log(
//   clonedObj.name.inner1.inner2.array[3] ===
//     objForClone.name.inner1.inner2.array[3],
// );
