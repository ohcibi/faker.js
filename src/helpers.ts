/**
 *
 * @module helpers
 */

import { arrayElement, boolean, number } from 'random';

/**
 * backword-compatibility
 *
 * @method randomize
 * @param {array} array
 */
export function randomize<T>(array: T[]): T {
  array = array || ['a', 'b', 'c'];
  return arrayElement(array);
}

/**
 * slugifies string
 *
 * @method slugify
 * @param {string} string
 */
export function slugify(string: string): string {
  string = string || '';
  return string.replace(/ /g, '-').replace(/[^\w\.\-]+/g, '');
}

/**
 * parses string for a symbol and replace it with a random number from 1-10
 *
 * @method faker.helpers.replaceSymbolWithNumber
 * @param {string} string
 * @param {string} symbol defaults to `"#"`
 */
export function replaceSymbolWithNumber(string = '', symbol = '#'): string {
  let str = '';
  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) == symbol) {
      str += number(9);
    } else if (string.charAt(i) == '!') {
      str += number({ min: 2, max: 9 });
    } else {
      str += string.charAt(i);
    }
  }
  return str;
}

/** string repeat helper, alternative to String.prototype.repeat.... See PR #382
 *
 * @method repeatString
 * @param {string} string
 * @param {number} num
 */
export function repeatString(string: string, num = 0): string {
  let text = '';
  for (let i = 0; i < num; i++) {
    text += string.toString();
  }
  return text;
}

/**
 * parses string for symbols (numbers or letters) and replaces them appropriately (# will be replaced with number,
 * ? with letter and * will be replaced with number or letter)
 *
 * @method faker.helpers.replaceSymbols
 * @param {string} string
 */
export function replaceSymbols(string = ''): string {
  const alpha = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];
  let str = '';

  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) == '#') {
      str += number(9);
    } else if (string.charAt(i) == '?') {
      str += arrayElement(alpha);
    } else if (string.charAt(i) == '*') {
      str += boolean() ? arrayElement(alpha) : number(9);
    } else {
      str += string.charAt(i);
    }
  }
  return str;
}

/**
 * parse string paterns in a similar way to RegExp
 *
 * e.g. "#{3}test[1-5]" -> "###test4"
 *
 * @method regexpStyleStringParse
 * @param {string} string
 */
export function regexpStyleStringParse(string = ''): string {
  // Deal with range repeat `{min,max}`
  const RANGE_REP_REG = /(.)\{(\d+)\,(\d+)\}/;
  const REP_REG = /(.)\{(\d+)\}/;
  const RANGE_REG = /\[(\d+)\-(\d+)\]/;
  let token = string.match(RANGE_REP_REG) || [];
  let min: number, max: number, tmp: number, repetitions: number;
  (token.index || 0) + token[0].length;

  while (token !== null) {
    min = parseInt(token[2]);
    max = parseInt(token[3]);
    // switch min and max
    if (min > max) {
      tmp = max;
      max = min;
      min = tmp;
    }
    repetitions = number({ min: min, max: max });
    string =
      string.slice(0, token.index) +
      repeatString(token[1], repetitions) +
      string.slice((token.index || 0) + token[0].length);
    token = string.match(RANGE_REP_REG) || [];
  }
  // Deal with repeat `{num}`
  token = string.match(REP_REG) || [];
  while (token !== null) {
    repetitions = parseInt(token[2]);
    string =
      string.slice(0, token.index) +
      repeatString(token[1], repetitions) +
      string.slice((token.index || 0) + token[0].length);
    token = string.match(REP_REG) || [];
  }
  // Deal with range `[min-max]` (only works with numbers for now)
  //TODO: implement for letters e.g. [0-9a-zA-Z] etc.

  token = string.match(RANGE_REG) || [];
  while (token !== null) {
    min = parseInt(token[1]); // This time we are not capturing the char befor `[]`
    max = parseInt(token[2]);
    // switch min and max
    if (min > max) {
      tmp = max;
      max = min;
      min = tmp;
    }
    string =
      string.slice(0, token.index) +
      number({ min: min, max: max }).toString() +
      string.slice((token.index || 0) + token[0].length);
    token = string.match(RANGE_REG) || [];
  }
  return string;
}

/**
 * replace symbols in a credit card schems including Luhn checksum
 *
 * @method faker.helpers.replaceCreditCardSymbols
 * @param {string} string
 * @param {string} symbol
 */

export function replaceCreditCardSymbols(string = '', symbol = '#'): string {
  // Function calculating the Luhn checksum of a number string
  function getCheckBit(number: number[]): number {
    number.reverse();
    number = number.map((num, index) => {
      if (index % 2 === 0) {
        num *= 2;
        if (num > 9) {
          num -= 9;
        }
      }
      return num;
    });
    const sum = number.reduce(function(prev, curr) {
      return prev + curr;
    });
    return sum % 10;
  }

  string = regexpStyleStringParse(string); // replace [4-9] with a random number in range etc...
  string = replaceSymbolWithNumber(string, symbol); // replace ### with random numbers

  const numberList = string
    .replace(/\D/g, '')
    .split('')
    .map(function(num) {
      return parseInt(num);
    });
  const checkNum = getCheckBit(numberList);
  return string.replace('L', `${checkNum}`);
}

/**
 * takes an array and returns it randomized
 *
 * @method shuffle
 * @param {array} o
 */
export function shuffle<T>(o: T[] = []): T[] {
  const result = [...o];
  for (
    let j, x, i = result.length - 1;
    i;
    j = number(i), x = result[--i], result[i] = result[j], result[j] = x
  );
  return result;
}

/**
 * mustache
 *
 * @method mustache
 * @param {string} str
 * @param {object} data
 */
export function mustache(str = '', data: { [k: string]: () => string }): string {
  for (const p in data) {
    const re = new RegExp('{{' + p + '}}', 'g');
    str = str.replace(re, data[p]);
  }
  return str;
}

export default {
  mustache,
  randomize,
  regexpStyleStringParse,
  repeatString,
  replaceCreditCardSymbols,
  replaceSymbolWithNumber,
  replaceSymbols,
  shuffle,
  slugify
};
