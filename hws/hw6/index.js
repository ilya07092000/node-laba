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
console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")

// EN
language = 'en';
const enTranslation = localize`${greeting}, My Name Is Ilya, ${introduction}, feel free to reach out to me for any questions!`;
console.log(enTranslation);
