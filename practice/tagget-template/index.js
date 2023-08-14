// function highlight(strings, ...values) {
//   let str = '';
//   strings.forEach((string, i) => {
//     str += string + (values[i] || '');
//   });
//   return str;
// }

// const name = 'Snickers';
// const age = '100';
// const sentence = highlight`My dog's name is ${name} and he is ${age} years old`;
// console.log(sentence);

//======

function introduce(strings, ...values) {
  console.log('strings', strings);
  console.log('values', values);
  return strings.map((item, idx) => (item += values[idx] || '')).join('');
}

const tt = 'Ilya';
const food = '🍕';
const output = introduce`I am ${tt}. I like ${food}.`;
console.log(output);

// =======

// const props = {
//   theme: {
//     sizes: {
//       xl: '2rem',
//       lg: '1.5rem',
//       md: '1rem',
//       xs: '0.75rem',
//     },
//   },
// };

// function h1(strings, ...values) {
//   let result = '';

//   strings.forEach((item, idx) => {
//     result += item + (values?.[idx]?.(props) || '');
//   });

//   return result;
// }

// const styles = h1`
//   font-size: ${props => props.theme.sizes.lg};
//   text-align: center;
//   color: palevioletred;
// `;
// console.log('styles', styles);
