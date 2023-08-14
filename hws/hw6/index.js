/**
 * Task 1: Quasi-Tagged Templates
 */
const translations = {
  en: {
    greet: 'Hello',
    intro: 'Welcome to our website',
  },
  fr: {
    greet: 'Bonjour',
    intro: 'Bienvenue sur notre site web',
  },
};

const localize = (strings, ...values) => {
  if (!(language in translations)) {
    throw new Error('Wrong Language Value');
  }
  const dictionary = translations[language];
  let result = '';

  strings.forEach((str, idx) => {
    let translation = dictionary?.[values[idx]] || '';
    result += str + translation;
  });

  return result;
};

let language = 'fr';
const greeting = 'greet';
const introduction = 'intro';

// FR
const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;
// console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
// console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")

// EN
language = 'en';
const enTranslation = localize`${greeting}, My Name Is Ilya, ${introduction}, feel free to reach out to me for any questions!`;
// console.log(enTranslation);

/**
 * Task 2: Advanced Tagged Template
 */
const keywords = ['JavaScript', 'template', 'tagged'];
const template =
  'Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.';

const highlightKeywords = (templateString, keywords) => {
  let result = templateString;
  const spanWrapper = str => `<span class='highlight'>${str}</span>`;
  keywords.forEach(
    (item, idx) => (result = result.replace(`\${${idx}}`, spanWrapper(item))),
  );
  return result;
};

const highlighted = highlightKeywords(template, keywords);
// console.log(highlighted);

/**
 * Task 3
 */

const multiline = str => {
  let result = '';
  str
    .join('')
    .trim()
    .split('\n')
    .forEach((item, idx) => (result += `${idx + 1} ${item} \n`));
  return result;
};

const code = multiline`  
function add(a, b) {  
      return a + b; 
}  
`;
// console.log(code);
