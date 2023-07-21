/**
 * addValues can work as sum and as string concatenation
 */
function addValues(firstOperand, secondOperand) {
  const fitValues = ['string', 'number'];
  if (
    !fitValues.includes(typeof firstOperand) ||
    !fitValues.includes(typeof secondOperand)
  ) {
    throw new Error('Wrong Value Was Passed to addValues function');
  }

  return firstOperand + secondOperand;
}
// console.log(addValues(1, 2));
// console.log(addValues('hello ', 'world'));
// console.log(addValues(20, '10'));
/**
 * ERRORS
 */
// console.log(addValues({}, 'hello'));
// console.log(addValues(null, {}));
// console.log(addValues([], 1));
// console.log(addValues(undefined, '123'));
// console.log(addValues(null, 2));

// =================================================
function stringifyValue(value) {
  if ((typeof value == 'object' && value !== null) || Array.isArray(value)) {
    return JSON.stringify(value);
  }

  return String(value);
}
// console.log(stringifyValue({name: 'Ilya', surname: 'Ischenko'}));
// console.log(stringifyValue([1, 2, 3, 4, 5]));
// console.log(stringifyValue(1));
// console.log(stringifyValue('hello world'));
// console.log(stringifyValue(null));
// console.log(stringifyValue(undefined));
// console.log(stringifyValue(BigInt(123123123)));
// console.log(stringifyValue(new Date()));
// console.log(stringifyValue(Symbol('123')));
// console.log(stringifyValue(false));

// =================================================
/**
 * Accepts a single boolean argument and returns its inverted value. If the argument is not a boolean, it should throw an error.
 */
function invertBoolean(value) {
  if (typeof value !== 'boolean') {
    throw new Error('Wrong Value Was Passed to invertBoolean function');
  }

  return +value;
}
// console.log(invertBoolean(false));
// console.log(invertBoolean(true));
/**
 * ERRORS
 */
// console.log(invertBoolean(1));
// console.log(invertBoolean({}));
// console.log(invertBoolean([]));
// console.log(invertBoolean(new Date()));
// console.log(invertBoolean(undefined));
// console.log(invertBoolean(null));
// console.log(invertBoolean('false'));

// =================================================
function convertToNumber(value) {
  const notFitTypes = ['object', 'undefined', 'symbol'];
  if (notFitTypes.includes(typeof value) && value !== null) {
    throw new Error('Wrong Value Was Passed to convertToNumber function');
  }

  if (typeof value === 'string') {
    return parseInt(value);
  }

  return Number(value);
}
// console.log(convertToNumber(1));
// console.log(convertToNumber('1'));
// console.log(convertToNumber('123sasd'));
// console.log(convertToNumber(null));
/**
 * ERRORS
 */
// console.log(convertToNumber(new Date()));
// console.log(convertToNumber({}));
// console.log(convertToNumber(Symbol(123)));
// console.log(convertToNumber(undefined));

// =================================================
function coerceToType(value, type) {
  const valueType = typeof value;

  if (type === 'object' || (type === 'number' && valueType === 'bigint')) {
    // can not convert to object
    throw new Error(`Can Not Convert to ${type}`);
  }

  if (type === 'string') {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  }

  if (type === 'number') {
    if (
      (typeof value === 'object' && value !== null) ||
      valueType === 'undefined'
    ) {
      throw new Error(`Can Not Convert to ${type}`);
    }
    return +value;
  }

  if (type === 'boolean') {
    return !!value;
  }

  if (type === 'symbol' && (valueType === 'string' || valueType === 'number')) {
    return Symbol(value);
  }

  if (type === 'bigint') {
    return BigInt(value);
  }

  throw new Error('Type Can Not Be Converted');
}
// console.log(coerceToType('123', 'number'));
// console.log(coerceToType({name: 'Ilya', surname: 'Ischenko'}, 'string'));
// console.log(coerceToType({name: 'Ilya', surname: 'Ischenko'}, 'boolean'));
// console.log(coerceToType([1, 2, 3], 'boolean'));
// console.log(coerceToType([1, 2, 3], 'string'));
// console.log(coerceToType(5, 'boolean'));
// console.log(coerceToType(0, 'boolean'));
// console.log(coerceToType(undefined, 'boolean'));
// console.log(coerceToType(null, 'number'));
// console.log(coerceToType('123', 'symbol'));
// console.log(coerceToType(BigInt(123123213213123213123), 'string'));
// console.log(coerceToType(123123123, 'bigint'));
// console.log(coerceToType(Symbol('1231232adsd'), 'string'));
// console.log(coerceToType(null, 'string'));
// console.log(coerceToType(undefined, 'string'));
// console.log(coerceToType('123123123', 'bigint'));

/**
 * ERROR
 */
// console.log(coerceToType(BigInt(123123213213123213123), 'number'));
// console.log(coerceToType({}, 'number'));
// console.log(coerceToType(undefined, 'number'));
