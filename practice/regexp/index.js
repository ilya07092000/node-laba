const testNon = /[^0-9]/;
// console.log(testNon.test('f1f'));

const oneOrMoreDigit = /\d/;
// console.log(oneOrMoreDigit.test('123213s'));

const preciseTime = /^\d{1,2}-\d{2}/;
// console.log(preciseTime.test('123-12'));

const str = 'Some text very nice text for example in this line';
// console.log(str.match(/text/gi));

const testStr = 'test.23213.23.com';

// console.log(testStr.match(/([\w-]+\.)+\w+/g));
//

let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
let str2 = '2019-04-30';
// console.log(dateRegexp.test(str2));

const nums = '01-213-123-213';
const regNums = /[0-9]+-/g;
console.log(regNums.exec(nums));
console.log(regNums.exec(nums));
console.log(regNums.exec(nums));
console.log(regNums.exec(nums));
