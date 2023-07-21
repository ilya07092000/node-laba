const { getSeparateOperands } = require('./helpers');

function minus(string) {
  const { bigger: firstOperand, smaller: secondOperand } = getSeparateOperands(
    this.toString(),
    string,
  );
  const result = [];
  const diffSize = firstOperand.length - secondOperand.length;
  let balance = 0;

  for (let i = firstOperand.length - 1; i >= 0; i -= 1) {
    const firstNum = firstOperand[i];
    const secondNum = secondOperand[i - diffSize];
    let res = firstNum - (secondNum || 0) - balance;

    if (balance > 0) {
      balance -= 1;
    }

    if (res < 0) {
      balance += 1;
      res = 10 - Math.abs(res);
    }

    result.push(res);
  }
  return result.reverse().join('');
}

String.prototype.minus = minus;

console.log('100001000123'.minus('123'));
console.log(BigInt(BigInt(100001000123) - BigInt(123)).toString());

console.log('100001000121123'.minus('92321323'));
console.log(BigInt(BigInt(100001000121123) - BigInt(92321323)).toString());

console.log('34543599832'.minus('213324'));
console.log(BigInt(BigInt(34543599832) - BigInt(213324)).toString());
