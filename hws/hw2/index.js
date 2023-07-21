class WrongValueError extends Error {
  constructor(functionName) {
    super(`Wrong Value Provided For ${functionName} Function`);
    this.name = 'WrongValueError';
  }
}

/**
 * addValues can work as sum and as string concatenation
 */
function addValues(firstOperand, secondOperand) {
  const fitValues = ['string', 'number'];
  if (
    !fitValues.includes(typeof firstOperand) ||
    !fitValues.includes(typeof secondOperand)
  ) {
    throw new WrongValueError('addValues');
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
    throw new WrongValueError('invertBoolean');
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
    throw new WrongValueError('convertToNumber');
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
class TypeConvertor {
  constructor() {
    this._convertors = [];
  }

  registerConvertor(convertor) {
    this._convertors.push(convertor);
  }

  convertType(value, desiredType) {
    const convertor = this._convertors.find(conv =>
      conv.isSuitableConvertor(desiredType),
    );

    if (!convertor) {
      throw new Error('No Converter For This Desired Type');
    }
    return convertor.convert(value);
  }
}

class BasicConvertor {
  constructor(selfType) {
    this._selfType = selfType;
    this._supportTypes = []; // define from what types we can convert
  }

  /**
   * check whether this class suitable for desired type type
   */
  isSuitableConvertor(desiredType) {
    if (desiredType === this._selfType) {
      return true;
    }
    return false;
  }

  /**
   * check wthether this value can be converted
   */
  canConvert(value) {
    if (this._supportTypes.includes(typeof value)) {
      return true;
    }
    return false;
  }

  convert(value) {
    if (!this.canConvert(value)) {
      throw new WrongValueError(this.constructor.name);
    }
  }
}

class StringConvertor extends BasicConvertor {
  constructor() {
    super('string');
    this._supportTypes = [
      'string',
      'number',
      'boolean',
      'symbol',
      'object',
      'bigint',
      'undefined',
      'null',
    ];
  }

  convert(value) {
    super.convert(value);
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  }
}

class NumberConvertor extends BasicConvertor {
  constructor() {
    super('number');
    this._supportTypes = ['string', 'number', 'boolean'];
  }

  convert(value) {
    if (!this.canConvert(value) && value !== null) {
      throw new WrongValueError('NumberConvertor');
    }
    return Number(value);
  }
}

class BooleanConvertor extends BasicConvertor {
  constructor() {
    super('boolean');
    this._supportTypes = [
      'string',
      'symbol',
      'number',
      'boolean',
      'object',
      'undefined',
    ];
  }

  convert(value) {
    super.convert(value);
    return Boolean(value);
  }
}

class SymbolConvertor extends BasicConvertor {
  constructor() {
    super('symbol');
    this._supportTypes = ['symbol', 'string', 'number'];
  }

  convert(value) {
    super.convert(value);
    return Symbol(value);
  }
}

class BigIntConverter extends BasicConvertor {
  constructor() {
    super('bigint');
    this._supportTypes = ['number'];
  }

  convert(value) {
    super.convert(value);
    return BigInt(value);
  }
}

const convertor = new TypeConvertor();
convertor.registerConvertor(new StringConvertor());
convertor.registerConvertor(new NumberConvertor());
convertor.registerConvertor(new SymbolConvertor());
convertor.registerConvertor(new BooleanConvertor());
convertor.registerConvertor(new BigIntConverter());

// console.log(convertor.convertType('123', 'number'));
// console.log(
//   convertor.convertType({name: 'Ilya', surname: 'Ischenko'}, 'string'),
// );
// console.log(
//   convertor.convertType({name: 'Ilya', surname: 'Ischenko'}, 'boolean'),
// );
// console.log(convertor.convertType([1, 2, 3], 'boolean'));
// console.log(convertor.convertType([1, 2, 3], 'string'));
// console.log(convertor.convertType(5, 'boolean'));
// console.log(convertor.convertType(0, 'boolean'));
// console.log(convertor.convertType(undefined, 'boolean'));
// console.log(convertor.convertType(null, 'number'));
// console.log(convertor.convertType(null, 'number'));
// console.log(convertor.convertType('123', 'symbol'));
// console.log(convertor.convertType(BigInt(123123213213123213123), 'string'));
// console.log(convertor.convertType(123123123, 'bigint'));
// console.log(convertor.convertType(Symbol('1231232adsd'), 'string'));
// console.log(convertor.convertType(null, 'string'));
// console.log(convertor.convertType(undefined, 'string'));

/**
 * ERROR
 */
// console.log(convertor.convertType('123123123', 'bigint'));
// console.log(convertor.convertType(BigInt(123123213213123213123), 'number'));
// console.log(convertor.convertType({}, 'number'));
// console.log(convertor.convertType(undefined, 'number'));
