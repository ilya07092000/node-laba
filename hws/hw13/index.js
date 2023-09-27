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
  const regExp =
    /((?<key>"\w+"):\s*((?<value>"[^"]+"|\d+)|(?<object>{.*}(?=,|}))|(?<array>\[.*\])))/gi;
  let currentStep;

  while ((currentStep = regExp.exec(jsonString))) {
    // console.log(currentStep.groups);
    let {key, value, object, array} = currentStep.groups;
    result[key] = value || object || array;
  }

  return result;
}

// const jsonString = '{"name": "John", "age": 30, "city": "New York", "innerObj": { "nameInner": "test", "otherTest": { "value2": 123 } }}';
const jsonString =
  '{"name": "John", "age": 30, "city": "New York", "innerObj": { "nameInner": "test", "otherTest": { "value2": 123 } }, "innerArray": [1, 2, 3], "test": 123}';
const jsonObject = myJSONParse(jsonString);
console.log('jsonObject', jsonObject);
