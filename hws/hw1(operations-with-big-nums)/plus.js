const { getSeparateOperands } = require('./helpers');

function plus(string) {
  const { bigger: firstOperand, smaller: secondOperand } = getSeparateOperands(
    this.toString(),
    string,
  );
  const diffSize = firstOperand.length - secondOperand.length;
  let balance = 0;
  const result = [];

  for (let i = firstOperand.length - 1; i >= 0; i -= 1) {
    const firstNum = +firstOperand[i];
    const secondNum = +secondOperand[i - diffSize];
    let sum = 0;

    if (Number.isNaN(secondNum)) {
      sum = firstNum + balance;
    } else {
      sum = firstNum + secondNum + balance;
    }

    if (balance > 0) {
      balance -= 1;
    }

    if (sum >= 10) {
      balance += Math.floor(sum / 10);
      sum %= 10;
    }

    result.push(sum);
  }

  if (balance > 0) {
    result.push(balance);
  }

  return result.reverse().join('');
}

String.prototype.plus = plus;
module.exports = { plus };

console.log('999999999999999'.plus('999999999999999'));
console.log(
  BigInt(BigInt(999999999999999) + BigInt(999999999999999)).toString(),
);

console.log('12345678901234'.plus('12345678901'));
console.log(BigInt(BigInt(12345678901234) + BigInt(12345678901)).toString());

console.log('1234567891011'.plus('1234567891011'));
console.log(BigInt(BigInt(1234567891011) + BigInt(1234567891011)).toString());
