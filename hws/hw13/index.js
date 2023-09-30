/**
 * FUNCTIONS TO HANDLE SEPARATE DATA TYPES
 */
const stringRegexp = /"[^"]+"/;
const numberRegexp = /\d+/;
const nullValueRegexp = /\bnull\b/;
const booleanRegexp = /\btrue\b|\bfalse\b/;
const objectRegexp = /\{(?:[^{}]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}/;
const arrayRegexp = /\[.*?\]/;
const quotationMarksRegex = /^"|"$/g;

/**
 * MATCH DIFFERENT DATA TYPES INTO SEPARATE GROUPS
 */
const defineDataDypeRegexp = new RegExp(
  `(?<object>${objectRegexp.source})|(?<string>${stringRegexp.source})|(?<number>${numberRegexp.source})|(?<nullValue>${nullValueRegexp.source})|(?<boolean>${booleanRegexp.source})|(?<array>${arrayRegexp.source})`,
);

/**
 * JSON PARSER
 */
function myJSONParse(jsonString) {
  const result = {};
  const jsonKeyValuesRegexp = new RegExp(
    `((?<key>"\\w+"):\\s*(${defineDataDypeRegexp.source}))`,
    'gi',
  );
  let currentStep;
  while ((currentStep = jsonKeyValuesRegexp.exec(jsonString))) {
    let {key, ...groups} = currentStep.groups;
    const formattedKey = key.replace(quotationMarksRegex, ''); // remove quotation marks
    result[formattedKey] = handleValues(groups);
  }
  return result;
}

/**
 * HANDLE ARRAY
 */
const handleArray = (inputArray = []) =>
  inputArray.map(item => handleValues(item.match(defineDataDypeRegexp).groups));

/**
 * HANDLE DIFFERENT VALUES
 */
const handleValues = groups => {
  const ALLOWED_VALUES = [
    'string',
    'object',
    'array',
    'number',
    'boolean',
    'nullValue',
  ];
  let valueType;
  let currValue;
  Object.entries(groups).forEach(([key, value]) => {
    if (value !== undefined) {
      valueType = key;
      currValue = value;
    }
  });

  if (!ALLOWED_VALUES.includes(valueType) || !valueType) {
    throw new Error(`Can not handle ${currValue}`);
  }
  let resultValue = undefined;

  switch (valueType) {
    case 'object':
      resultValue = myJSONParse(currValue);
      break;
    case 'array':
      resultValue = handleArray(currValue.replace(/^\[|\]$/, '').split(','));
      break;
    case 'number':
      resultValue = +currValue;
      break;
    case 'string':
      resultValue = currValue.replace(quotationMarksRegex, '');
      break;
    case 'boolean':
      resultValue = currValue === 'true';
      break;
    case 'nullValue':
      resultValue = null;
      break;
  }

  return resultValue;
};

const jsonString =
  '{"name":"John Doe","age":30,"is_student":false,"address":{"innerObj":{"innerArray":[1, 2, 3]},"street":"123 Main St","city":"Anytown","state":"CA","postal_code":"12345"},"favorite_numbers":[7,42,101],"grades":{"math":95,"science":88,"history":75},"contact":null,"testArray":[{"key":"value"},1,"1", 21]]}';
const jsonObject = myJSONParse(jsonString);
console.log('jsonObject', jsonObject);
