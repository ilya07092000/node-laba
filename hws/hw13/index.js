// const originalObject = {
//   name: 'John Doe',
//   age: 30,
//   is_student: false,
//   address: {
//     street: '123 Main St',
//     city: 'Anytown',
//     state: 'CA',
//     postal_code: '12345',
//   },
//   favorite_numbers: [7, 42, 101],
//   grades: {
//     math: 95,
//     science: 88,
//     history: 75,
//   },
//   contact: null,
//   testArray: [{key: 'value'}, 1, '1'],
// };
// const jsonString =
//   '{"name":"John Doe","age":30,"is_student":false,"address":{"street":"123 Main St","city":"Anytown","state":"CA","postal_code":"12345"},"favorite_numbers":[7,42,101],"grades":{"math":95,"science":88,"history":75},"contact":null,"testArray":[{"key":"value"},1,"1"]}';
// const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
// console.log(jsonString);

/**
 * check whether string is json object
 * 1. check brackets at the first and second place
 * 2.
 */

// const jsonRegexp = /^{("\w+":\s*("[^"]+"|\d+)(,\s*)?)+}$/gi;
// const isJsonString = string => {
//   if (!string) {
//     return false;
//   }

//   return jsonRegexp.test(string);
// };
// console.log(
//   isJsonString(
//     '{"name": "John", "age": 30, "city": "New York", "test": {"other": 123}}',
//   ),
// );

function myJSONParse(jsonString) {
  const result = {};
  const quotationMarksRegex = /^"|"$/g;
  const regExp =
    /((?<key>"\w+"):\s*((?<string>"[^"]+")|(?<number>\d+)|(?<nullValue>\bnull\b)|(?<boolean>\btrue\b|\bfalse\b)|(?<object>\{(?:[^{}]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}(?=,|\s{0,1}}))|(?<array>\[.*?\])))/gi;
  let currentStep;

  while ((currentStep = regExp.exec(jsonString))) {
    let {key, string, number, object, array, boolean, nullValue} =
      currentStep.groups;
    const formattedKey = key.replace(quotationMarksRegex, ''); // remove quotation marks
    let resultValue = undefined;

    if (object) {
      resultValue = myJSONParse(object);
    } else if (array) {
      resultValue = array.replace(/^\[|\]$/g, '').split(',');
    } else if (number) {
      resultValue = +number;
    } else if (string) {
      resultValue = string.replace(quotationMarksRegex, '');
    } else if (boolean) {
      resultValue = boolean === 'true';
    } else if (nullValue) {
      resultValue = null;
    }

    result[formattedKey] = resultValue;
  }

  return result;
}

const jsonString =
  '{"name":"John Doe","age":30,"is_student":false,"address":{"street":"123 Main St","city":"Anytown","state":"CA","postal_code":"12345"},"favorite_numbers":[7,42,101],"grades":{"math":95,"science":88,"history":75},"contact":null,"testArray":[{"key":"value"},1,"1"]}';
// const jsonString = '{"name": "John", "age": 30, "city": "New York", "innerObj": { "nameInner": "test", "otherTest": { "value2": 123 } }}';
// const jsonString =
// '{"name": "John", "age": 30, "city": "New York", "innerObj": { "nameInner": "test", "otherTest": { "value2": 123 } }, "innerArray": [1, 2, 3, { "name": "test" }], "test": 123}';
const jsonObject = myJSONParse(jsonString);
console.log('jsonObject', jsonObject);
