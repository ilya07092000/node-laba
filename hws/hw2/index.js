class WrongValueError extends Error {
  constructor(functionName) {
    super(`Wrong Value Provided For ${functionName} Function`);
    this.name = 'WrongValueError';
  }
}

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
// console.log(addValues(null, 2));
// console.log(addValues(null, {}));
// console.log(addValues('hello ', 'world'));
// console.log(addValues(20, '10'));
// console.log(addValues([], 1));
// console.log(addValues(undefined, '123'));

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
function invertBoolean(value) {
  if (typeof value !== 'boolean') {
    throw new WrongValueError('invertBoolean');
  }

  return +value;
}
// console.log(invertBoolean(false));
// console.log(invertBoolean(true));
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
// console.log(convertToNumber({}));
// console.log(convertToNumber(undefined));
// console.log(convertToNumber(Symbol(123)));
// console.log(convertToNumber(new Date()));

// =================================================
class ConvertToType {
  constructor() {
    this._convertors = [];
  }

  registerConvertor(convertor) {
    this._convertors.push(convertor);
  }

  convertType(value, desiredType) {
    const convertor = this._convertors.find(conv =>
      conv.isSuitableConverter(desiredType),
    );

    if (!convertor) {
      throw new Error('No Converter For This Type');
    }
    return convertor.convert(value, desiredType);
  }
}

class TypeConvertor {
  constructor(selfType) {
    this._selfType = selfType;
    this._convertTypes = []; // define to what types we can convert
  }

  /**
   * check whether this class suitable for value type
   */
  isSuitableConverter(type) {
    if (type === this._selfType) {
      return true;
    }
    return false;
  }

  /**
   * check wthether this value can be converted
   */
  canConvert(value) {
    if (this._convertTypes.includes(typeof value)) {
      return true;
    }
    return false;
  }

  convert() {
    throw new Error('Method Not Implemented');
  }
}

class StringConvertor extends TypeConvertor {
  constructor() {
    super('string');
    this._convertTypes = ['string', 'number', 'boolean', 'symbol', 'object'];
  }

  convert(value) {
    if (!this.canConvert(value)) {
      throw new WrongValueError('NumberConvertor');
    }

    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }

    return String(value);
  }
}

class NumberConvertor extends TypeConvertor {
  constructor() {
    super('number');
    this._convertTypes = ['string', 'number', 'boolean', 'symbol', 'bigint'];
  }

  convert(value) {
    if (!this.canConvert(value) && value !== null) {
      throw new WrongValueError('NumberConvertor');
    }
    return Number(value);
  }
}

class BooleanConvertor extends TypeConvertor {
  constructor() {
    super('boolean');
    this._convertTypes = ['string', 'symbol', 'number'];
  }

  convert(value) {
    if (!this.canConvert(value)) {
      throw new WrongValueError('NumberConvertor');
    }
    return Boolean(value);
  }
}

class SymbolConvertor extends TypeConvertor {
  constructor() {
    super('symbol');
    this._convertTypes = ['symbol', 'string', 'number'];
  }

  convert(value) {
    if (!this.canConvert(value)) {
      throw new WrongValueError('NumberConvertor');
    }
    return Symbol(value);
  }
}

const convertor = new ConvertToType();
convertor.registerConvertor(new StringConvertor());
convertor.registerConvertor(new NumberConvertor());
convertor.registerConvertor(new SymbolConvertor());
convertor.registerConvertor(new BooleanConvertor());

// console.log(convertor.convertType('123', 'number'));
console.log(
  convertor.convertType({name: 'Ilya', surname: 'Ischenko'}, 'string'),
);
// console.log(
//   convertor.convertType({name: 'Ilya', surname: 'Ischenko'}, 'boolean'),
// );
// console.log(convertor.convertType([1, 2, 3], 'boolean'));
// console.log(convertor.convertType([1, 2, 3], 'string'));
// console.log(convertor.convertType(5, 'boolean'));
// console.log(convertor.convertType(0, 'boolean'));
// console.log(convertor.convertType(undefined, 'boolean'));
// console.log(convertor.convertType(null, 'number'));
// console.log(convertor.convertType(undefined, 'number'));
// console.log(convertor.convertType({}, 'number'));
// console.log(convertor.convertType(null, 'number'));
