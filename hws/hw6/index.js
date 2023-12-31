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
 * Task 3 Multiline Tagged Template
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

/**
 * TASK 4 Implementing Debounce Function
 */
const debounce = (func, timeout) => {
  if (
    typeof func !== 'function' ||
    typeof timeout !== 'number' ||
    timeout < 0
  ) {
    throw new Error('Bad Argument');
  }

  let timer;
  return args => {
    clearTimeout(timer);
    timer = setTimeout(() => func(args), timeout);
  };
};

function debouncedSearch(query) {
  console.log('Searching for:', query);
}
const debouncedSearchHandler = debounce(debouncedSearch, 1000);
// const inputElement = document.getElementById('search-input');
// inputElement.addEventListener('input', event => {
//   debouncedSearchHandler(event.target.value);
// });

/**
 * TASK 5 Implementing Throttle Function
 */
const throttle = (func, timeout) => {
  if (
    typeof func !== 'function' ||
    typeof timeout !== 'number' ||
    timeout < 0
  ) {
    throw new Error('Bad Argument');
  }

  let timer = null;
  const cbFunc = args => {
    timer = null;
    func(args);
  };

  return args => {
    if (!timer) {
      timer = setTimeout(() => cbFunc(args), timeout);
    }
  };
};

function onScroll() {
  console.log('Scroll Event Time:', new Date().getSeconds());
}
const throttledScrollHandler = throttle(onScroll, 2000);
// window.addEventListener('scroll', throttledScrollHandler);

/**
 * TASK 6
 */
function multiply(a, b, c) {
  return a * b * c;
}

function partialTest(...args) {
  return args.join(', ');
}

// '_' - used for placeholder
const curry = (func, argAmount) => {
  const PLACEHOLDER_SIGN = '_';
  if (
    typeof func !== 'function' ||
    typeof argAmount !== 'number' ||
    argAmount < 0
  ) {
    throw new Error('Bad Argument');
  }

  const argumentsList = [];
  const cbCurry = nextArg => {
    if (
      argumentsList.length === argAmount &&
      argumentsList.includes(PLACEHOLDER_SIGN)
    ) {
      const placeholderIndex = argumentsList.indexOf(PLACEHOLDER_SIGN);
      argumentsList[placeholderIndex] = nextArg;
    } else if (argumentsList.length < argAmount) {
      argumentsList.push(nextArg);
    }

    if (
      argumentsList.length === argAmount &&
      !argumentsList.includes(PLACEHOLDER_SIGN)
    ) {
      return func(...argumentsList);
    }
    return cbCurry;
  };

  return cbCurry;
};
const curriedMultiply = curry(multiply, 3);
const step1 = curriedMultiply(2);
const step2 = step1(3);
const result = step2(4);
// console.log('Result:', result); // Expected: 24

const partialCurryTest = curry(partialTest, 5);
partialCurryTest('first');
partialCurryTest('_');
partialCurryTest('second');
partialCurryTest('third');
partialCurryTest('_');
partialCurryTest('fourth');
const partialCurryResult = partialCurryTest('fifth');
// console.log('partialCurryResult', partialCurryResult);
