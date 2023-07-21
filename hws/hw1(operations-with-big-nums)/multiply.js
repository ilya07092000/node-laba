const { getSeparateOperands } = require('./helpers');
const { plus } = require('./plus');

function multiply(string) {
  const { bigger: firstOperand, smaller: secondOperand } = getSeparateOperands(
    this.toString(),
    string,
  );
  const result = [];

  for (let i = secondOperand.length - 1; i >= 0; i -= 1) {
    let balance = 0;
    const secondNum = +secondOperand[i];
    const tempResult = [];

    for (let j = firstOperand.length - 1; j >= 0; j -= 1) {
      let res = secondNum * firstOperand[j] + balance;

      if (balance > 0) {
        balance = 0;
      }

      if (res >= 10) {
        balance += Math.floor(res / 10);
        res %= 10;
      }
      tempResult.push(res);
    }
    if (balance > 0) {
      tempResult.push(balance);
    }

    tempResult.reverse();
    for (let k = secondOperand.length - i - 1; k > 0; k -= 1) {
      tempResult.push(0);
    }

    result.push(tempResult.join(''));
  }

  return result.reduce((acc, num) => num.plus(acc.toString()), 0);
}

String.prototype.multiply = multiply;
String.prototype.plus = plus;

console.log('1000000000000000'.multiply('1000000000000000'));
console.log(
  BigInt(BigInt(1000000000000000) * BigInt(1000000000000000)).toString(),
);

console.log('12343'.multiply('712371273'));
console.log(BigInt(BigInt(12343) * BigInt(712371273)).toString());
