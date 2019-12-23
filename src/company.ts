/**
 *
 * @module company
 */

import { arrayElement } from 'random';

declare const faker: { definitions: any };
declare function f(string: string): string;

/**
 * suffixes
 *
 * @method faker.company.suffixes
 */
export function suffixes(): string[] {
  // Don't want the source array exposed to modification, so return a copy
  return faker.definitions.company.suffix.slice(0);
}

/**
 * companyName
 *
 * @method faker.company.companyName
 * @param {string} format
 */
export function companyName(format: string): string {
  if (!format) {
    format = arrayElement([
      '{{name.lastName}} {{company.companySuffix}}',
      '{{name.lastName}} - {{name.lastName}}',
      '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}'
    ]);
  }

  return f(format);
}

/**
 * companySuffix
 *
 * @method faker.company.companySuffix
 */
export function companySuffix(): string {
  return arrayElement(suffixes());
}

/**
 * catchPhrase
 *
 * @method faker.company.catchPhrase
 */
export function catchPhrase(): string {
  return f(
    '{{company.catchPhraseAdjective}} {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}'
  );
}

/**
 * bs
 *
 * @method faker.company.bs
 */
export function bs(): string {
  return f('{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}');
}

/**
 * catchPhraseAdjective
 *
 * @method faker.company.catchPhraseAdjective
 */
export function catchPhraseAdjective(): string {
  return arrayElement(faker.definitions.company.adjective);
}

/**
 * catchPhraseDescriptor
 *
 * @method faker.company.catchPhraseDescriptor
 */
export function catchPhraseDescriptor(): string {
  return arrayElement(faker.definitions.company.descriptor);
}

/**
 * catchPhraseNoun
 *
 * @method faker.company.catchPhraseNoun
 */
export function catchPhraseNoun(): string {
  return arrayElement(faker.definitions.company.noun);
}

/**
 * bsAdjective
 *
 * @method faker.company.bsAdjective
 */
export function bsAdjective(): string {
  return arrayElement(faker.definitions.company.bs_adjective);
}

/**
 * bsBuzz
 *
 * @method faker.company.bsBuzz
 */
export function bsBuzz(): string {
  return arrayElement(faker.definitions.company.bs_verb);
}

/**
 * bsNoun
 *
 * @method faker.company.bsNoun
 */
export function bsNoun(): string {
  return arrayElement(faker.definitions.company.bs_noun);
}

export default {
  bs,
  bsAdjective,
  bsBuzz,
  bsNoun,
  catchPhrase,
  catchPhraseAdjective,
  catchPhraseDescriptor,
  catchPhraseNoun,
  companyName,
  companySuffix,
  suffixes
};
