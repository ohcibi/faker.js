/**
 *
 * @module lorem
 */

import { getStringArray } from 'definitions';
import { slugify } from 'helpers';
import { arrayElement, number } from 'random';

/**
 * word
 *
 * @method faker.lorem.word
 */
export function word(): string {
  return arrayElement(getStringArray('lorem.words'));
}

/**
 * generates a space separated list of words
 *
 * @method faker.lorem.words
 * @param {number} num number of words, defaults to 3
 */
export function words(num = 3): string {
  const words = [];
  for (let i = 0; i < num; i++) {
    words.push(word());
  }
  return words.join(' ');
}

/**
 * sentence
 *
 * @method faker.lorem.sentence
 * @param {number} wordCount defaults to a random number between 3 and 10
 * @param {number} range
 */
export function sentence(wordCount?: number /*, range?: number*/): string {
  if (!wordCount) {
    wordCount = number({ min: 3, max: 10 });
  }
  // if (typeof range == 'undefined') { range = 7; }

  // strange issue with the node_min_test failing for captialize, please fix and add faker.lorem.back
  //return  faker.lorem.words(wordCount + Helpers.randomNumber(range)).join(' ').capitalize();

  const sentence = words(wordCount);
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

/**
 * slug
 *
 * @method faker.lorem.slug
 * @param {number} wordCount number of words, defaults to 3
 */
export function slug(wordCount?: number): string {
  return slugify(words(wordCount));
}

/**
 * sentences
 *
 * @method faker.lorem.sentences
 * @param {number} sentenceCount defautls to a random number between 2 and 6
 * @param {string} separator defaults to `' '`
 */
export function sentences(sentenceCount?: number, separator = ' '): string {
  if (typeof sentenceCount === 'undefined') {
    sentenceCount = number({ min: 2, max: 6 });
  }
  if (typeof separator == 'undefined') {
    separator = ' ';
  }
  const sentences = [];
  for (sentenceCount; sentenceCount > 0; sentenceCount--) {
    sentences.push(sentence());
  }
  return sentences.join(separator);
}

/**
 * paragraph
 *
 * @method faker.lorem.paragraph
 * @param {number} sentenceCount defaults to 3
 */
export function paragraph(sentenceCount = 3): string {
  return sentences(sentenceCount + number(3));
}

/**
 * paragraphs
 *
 * @method faker.lorem.paragraphs
 * @param {number} paragraphCount defaults to 3
 * @param {string} separator defaults to `'\n \r'`
 */
export function paragraphs(paragraphCount = 3, separator = '\n \r'): string {
  const paragraphs = [];
  for (paragraphCount; paragraphCount > 0; paragraphCount--) {
    paragraphs.push(paragraph());
  }
  return paragraphs.join(separator);
}

/**
 * returns lines of lorem separated by `'\n'`
 *
 * @method faker.lorem.lines
 * @param {number} lineCount defaults to a random number between 1 and 5
 */
export function lines(lineCount?: number): string {
  if (typeof lineCount === 'undefined') {
    lineCount = number({ min: 1, max: 5 });
  }
  return sentences(lineCount, '\n');
}

/**
 * returns random text based on a random lorem method
 *
 * @method faker.lorem.text
 */
export function text(): string {
  const loremMethods = [word, words, sentence, sentences, paragraph, paragraphs, lines];
  const randomLoremMethod = arrayElement(loremMethods);
  return randomLoremMethod();
}

export default {
  lines,
  paragraph,
  paragraphs,
  sentence,
  sentences,
  slug,
  text,
  word,
  words
};
