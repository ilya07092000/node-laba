/**
 *
 * @param {string} firstStr
 * @param {string} secondStr
 * @returns {{bigger: string, smaller: string}}
 */
const getSeparateOperands = (firstStr = '', secondStr = '') => {
  let bigger;
  let smaller;

  if (firstStr.length > secondStr.length) {
    bigger = firstStr;
    smaller = secondStr;
  } else if (firstStr.length < secondStr.length) {
    smaller = firstStr;
    bigger = secondStr;
  } else {
    // in case secondStrs have similar length I loop through each item until I find smaller one
    let found = false;
    let counter = 0;
    while (!found && counter < firstStr.length) {
      if (+firstStr[counter] === +secondStr[counter]) {
        counter += 1;
        continue;
      }
      if (+firstStr[counter] > +secondStr[counter]) {
        bigger = firstStr;
        smaller = secondStr;
        found = true;
      } else {
        smaller = firstStr;
        bigger = secondStr;
        found = true;
      }
      counter += 1;
    }

    if (!found) {
      smaller = firstStr;
      bigger = firstStr;
    }
  }

  return { bigger, smaller };
};

module.exports = { getSeparateOperands };
