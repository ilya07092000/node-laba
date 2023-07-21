const { getSeparateOperands } = require('./helpers');

function divide(string) {
  const { bigger: firstOperand, smaller: secondOperand } = getSeparateOperands(
    this.toString(),
    string,
  );
  const result = [];
  let balance = 0;

  for (let i = 0; i < firstOperand.length; i += 1) {
    let firstNum = firstOperand[i];
    firstNum = balance > 0 ? +`${balance}${firstNum}` : firstNum;

    const res = Math.floor(firstNum / secondOperand);
    balance = firstNum % secondOperand;

    if (res === 0 && !result.length) {
      // avoid pushing zero as first num
      continue;
    }

    result.push(res);
  }

  return result.join('');
}

String.prototype.divide = divide;

console.log('8256'.divide('3'));
console.log(BigInt(BigInt(8256) / BigInt(3)).toString());

console.log('39160'.divide('8'));
console.log(BigInt(BigInt(39160) / BigInt(8)).toString());
