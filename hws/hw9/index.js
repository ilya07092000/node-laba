/**
 * returns an array with promises based on income params
 */
const getPromises = ({fulfilledCount = 0, rejectedCount = 0} = {}) => {
  const promises = [];

  for (let i = 1; i < fulfilledCount + 1; i += 1) {
    const promiseSuccess = new Promise(resolve => {
      setTimeout(() => resolve(`promise ${i} resolved successfully`), i * 100);
    });
    promises.push(promiseSuccess);
  }

  for (let i = 1; i < rejectedCount + 1; i += 1) {
    const promiseReject = new Promise((_, reject) => {
      setTimeout(() => reject(`promise ${i} rejected`), i * 100);
    });
    promises.push(promiseReject);
  }

  return promises;
};

/**
 *
 * Task 1: Implement promiseAll Function
 *
 */
const promiseAll = promises =>
  new Promise((resolve, reject) => {
    const results = [];
    const promisesAmount = promises.length;
    let settledPromises = 0;

    for (let i = 0; i < promises.length; i += 1) {
      promises[i]
        .then(result => {
          results[i] = result;
          settledPromises += 1;
          settledPromises === promisesAmount && resolve(results);
        })
        .catch(reject);
    }
  });

// promiseAll(getPromises({fulfilledCount: 20, rejectedCount: 0})) // all fulfilled
//   .then(console.log)
//   .catch(console.log);

// promiseAll(getPromises({fulfilledCount: 10, rejectedCount: 1})) // returns an error because at least one promise was rejected
//   .then(console.log)
//   .catch(console.log);

/**
 *
 * Task 2: Implement promiseAllSettled Function
 *
 */
const promiseAllSettled = promises =>
  new Promise(resolve => {
    const results = [];
    const promisesAmount = promises.length;
    let settledPromises = 0;

    for (let i = 0; i < promises.length; i += 1) {
      promises[i]
        .then(result => {
          results[i] = {status: 'fulfilled', value: result};
        })
        .catch(e => {
          results[i] = {status: 'rejected', reason: e};
        })
        .finally(() => {
          settledPromises += 1;
          settledPromises === promisesAmount && resolve(results);
        });
    }
  });
// promiseAllSettled([
//   Promise.resolve('1'),
//   Promise.reject('2'),
//   Promise.resolve('3'),
// ]).then(console.log);
// promiseAllSettled(getPromises({fulfilledCount: 10, rejectedCount: 0}))
//   .then(console.log)
//   .catch(console.log);

// promiseAllSettled(getPromises({fulfilledCount: 10, rejectedCount: 5})).then(
//   console.log,
// );

/**
 *
 * Task 3: Implement Chaining of Promises as a Separate Function
 *
 */
function asyncFunction1() {
  return Promise.resolve('Result from asyncFunction1');
}

function asyncFunction2(data) {
  return Promise.resolve(data + ' - Result from asyncFunction2');
}

function asyncFunction3(data) {
  return Promise.resolve(data + ' - Result from asyncFunction3');
}

const chainPromises = promiseFuncs =>
  new Promise(resolve => {
    let resultPromise = Promise.resolve();
    for (let i = 0; i < promiseFuncs.length; i += 1) {
      resultPromise = resultPromise.then(promiseFuncs[i]).catch(err => {
        throw new Error(err);
      });
    }
    resolve(resultPromise);
  });
const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];
// chainPromises(functionsArray)
//   .then(result => {
//     console.log('Chained promise result:', result);
//     // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
//   })
//   .catch(error => {
//     console.error('Chained promise error:', error);
//   });

/**
 * Task 4: Implement promisify Function
 */

function callbackStyleFunction(value, callback) {
  setTimeout(() => {
    if (value > 0) {
      callback(null, value * 2);
    } else {
      callback('Invalid value', null);
    }
  }, 1000);
}

const promisify = func => {
  if (typeof func !== 'function') {
    throw new Error('Bad Argument');
  }

  return (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) => {
        result ? resolve(result) : reject(err);
      }),
    );
};

const promisedFunction = promisify(callbackStyleFunction);
// promisedFunction(3)
//   .then(result => {
//     console.log('Promised function result:', result); // Expected: 6
//   })
//   .catch(error => {
//     console.error('Promised function error:', error);
//   });
// promisedFunction(-1)
//   .then(result => {
//     console.log('Promised function result:', result);
//   })
//   .catch(error => {
//     console.error('Promised function error:', error); // Expected: Invalid value
//   });
