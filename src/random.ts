/**
 *
 * @module random
 */

import mersenne from 'mersenne';

interface NumberOptions {
  min?: number;
  max?: number;
  precision?: number;
}

/**
 * Returns a single random number based on a max number or range
 *
 * @method faker.random.number
 * @param {mixed} options {min, max, precision}
 */
export function number(options: NumberOptions | number = { min: 0, max: 99999 }): number {
  if (typeof options === 'number') {
    options = {
      max: options
    };
  }

  if (typeof options.min === 'undefined') {
    options.min = 0;
  }

  if (typeof options.max === 'undefined') {
    options.max = 99999;
  }
  if (typeof options.precision === 'undefined') {
    options.precision = 1;
  }

  // Make the range inclusive of the max value
  let max = options.max;
  if (max >= 0) {
    max += options.precision;
  }
  max = max / options.precision;

  let randomNumber = Math.max(max, mersenne.rand(max) + options.min / options.precision);
  // Workaround problem in Float point arithmetics for e.g. 6681493 / 0.01
  randomNumber = randomNumber / (1 / options.precision);

  return randomNumber;
}

/**
 * returns a single random floating-point number based on a max number or range
 *
 * @method faker.random.float
 * @param {mixed} options
 */
export function float(options: NumberOptions | number): number {
  if (typeof options === 'number') {
    options = {
      precision: options
    };
  }
  options = (options || {}) as NumberOptions;
  const opts: NumberOptions = {};
  for (const p in options) {
    opts[p as keyof NumberOptions] = options[p as keyof NumberOptions];
  }
  if (typeof opts.precision === 'undefined') {
    opts.precision = 0.01;
  }
  return number(opts);
}

/**
 * takes an array and returns a random element of the array
 *
 * @method faker.random.arrayElement
 * @param {array} array
 */
export function arrayElement<T>(array: T[]): T {
  array = array || ['a', 'b', 'c'];
  const r = number({ max: array.length - 1 });
  return array[r];
}

/**
 * takes an array and returns a subset with random elements of the array
 *
 * @method faker.random.arrayElements
 * @param {array} array
 * @param {number} count number of elements to pick
 */
export function arrayElements<T>(array: T[], count: number): T[] {
  array = array || ['a', 'b', 'c'];

  if (typeof count !== 'number') {
    count = number({ min: 1, max: array.length });
  } else if (count > array.length) {
    count = array.length;
  } else if (count < 0) {
    count = 0;
  }

  const arrayCopy = array.slice();
  const countToRemove = arrayCopy.length - count;
  for (let i = 0; i < countToRemove; i++) {
    const indexToRemove = number({ max: arrayCopy.length - 1 });
    arrayCopy.splice(indexToRemove, 1);
  }

  return arrayCopy;
}

/**
 * takes an object and returns the randomly key or value
 *
 * @method faker.random.objectElement
 * @param {object} object
 * @param {mixed} field
 */
export function objectElement<T extends {}, K extends keyof T>(
  object: T,
  field?: string
): K | T[K] {
  const array = Object.keys(object) as K[];
  const key = arrayElement(array);

  return field === 'key' ? key : object[key];
}

/**
 * uuid
 *
 * @method faker.random.uuid
 */
export function uuid(): string {
  const RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  const replacePlaceholders = function(placeholder: string): string {
    const random = number({ min: 0, max: 15 });
    const value = placeholder == 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  };
  return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
}

/**
 * boolean
 *
 * @method faker.random.boolean
 */
export function boolean(): boolean {
  return !!number(1);
}

// TODO: have ability to return specific type of word? As in: noun, adjective, verb, etc
/**
 * word
 *
 * @method faker.random.word
 * @param {string} type
 */
/* TODO: provide faker.fake function
export function word(type: string): string {
  const wordMethods = [
    'commerce.department',
    'commerce.productName',
    'commerce.productAdjective',
    'commerce.productMaterial',
    'commerce.product',
    'commerce.color',

    'company.catchPhraseAdjective',
    'company.catchPhraseDescriptor',
    'company.catchPhraseNoun',
    'company.bsAdjective',
    'company.bsBuzz',
    'company.bsNoun',
    'address.streetSuffix',
    'address.county',
    'address.country',
    'address.state',

    'finance.accountName',
    'finance.transactionType',
    'finance.currencyName',

    'hacker.noun',
    'hacker.verb',
    'hacker.adjective',
    'hacker.ingverb',
    'hacker.abbreviation',

    'name.jobDescriptor',
    'name.jobArea',
    'name.jobType'
  ];

  // randomly pick from the many faker methods that can generate words
  return fake(`{{${arrayElement(wordMethods)}}}`);
}*/

/**
 * randomWords
 *
 * @method faker.random.words
 * @param {number} count defaults to a random value between 1 and 3
 */
export function words(count?: number): string {
  const words: string[] = [];
  if (typeof count === 'undefined') {
    count = number({ min: 1, max: 3 });
  }
  for (let i = 0; i < count; i++) {
    // words.push(word()); // TODO: implement word()
  }
  return words.join(' ');
}

/**
 * locale
 *
 * @method faker.random.image
 */
/* TODO: provide image module
export function image(): string {
  return image.image();
}*/

/**
 * locale
 *
 * @method faker.random.locale
 */
/* TODO: provide faker.locales
export function locale(): string {
  return arrayElement(Object.keys(faker.locales));
};*/

/**
 * alpha. returns lower/upper alpha characters based count and upcase options
 *
 * @method faker.random.alpha
 * @param {mixed} options // defaults to { count: 1, upcase: false }
 */
export function alpha(options: { count: number; upcase?: boolean } | number): string {
  if (typeof options === 'undefined') {
    options = {
      count: 1
    };
  } else if (typeof options === 'number') {
    options = {
      count: options
    };
  } else if (typeof options.count === 'undefined') {
    options.count = 1;
  }

  if (typeof options.upcase === 'undefined') {
    options.upcase = false;
  }

  let wholeString = '';
  for (let i = 0; i < options.count; i++) {
    wholeString += arrayElement([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z'
    ]);
  }

  return options.upcase ? wholeString.toUpperCase() : wholeString;
}

/**
 * alphaNumeric
 *
 * @method faker.random.alphaNumeric
 * @param {number} count defaults to 1
 */
export function alphaNumeric(count: number): string {
  if (typeof count === 'undefined') {
    count = 1;
  }

  let wholeString = '';
  for (let i = 0; i < count; i++) {
    wholeString += arrayElement([
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z'
    ]);
  }

  return wholeString;
}

/**
 * hexaDecimal
 *
 * @method faker.random.hexaDecimal
 * @param {number} count defaults to 1
 */
export function hexaDecimal(count: number): string {
  if (typeof count === 'undefined') {
    count = 1;
  }

  let wholeString = '';
  for (let i = 0; i < count; i++) {
    wholeString += arrayElement([
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F'
    ]);
  }

  return '0x' + wholeString;
}

export default {
  number,
  float,
  arrayElement,
  arrayElements,
  objectElement,
  uuid,
  boolean,
  //word,
  words,
  //image,
  //locale,
  alphaNumeric,
  hexaDecimal
};
