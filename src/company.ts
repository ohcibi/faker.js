/**
 *
 * @module company
 */

import { getStringArray } from 'definitions';
import { lastName } from 'name';
import { arrayElement } from 'random';

/**
 * suffixes
 *
 * @method faker.company.suffixes
 */
export function suffixes(): string[] {
  // Don't want the source array exposed to modification, so return a copy
  return [...getStringArray('company.suffix')];
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
 * companyName
 *
 * @method faker.company.companyName
 */
export function companyName(): string {
  return arrayElement([
    (): string => `${lastName()} ${companySuffix()}`,
    (): string => `${lastName()} - ${lastName()}`,
    (): string => `${lastName()}, ${lastName()} and ${lastName()}`
  ])();
}

/**
 * catchPhraseAdjective
 *
 * @method faker.company.catchPhraseAdjective
 */
export function catchPhraseAdjective(): string {
  return arrayElement(getStringArray('company.adjective'));
}

/**
 * catchPhraseDescriptor
 *
 * @method faker.company.catchPhraseDescriptor
 */
export function catchPhraseDescriptor(): string {
  return arrayElement(getStringArray('company.descriptor'));
}

/**
 * catchPhraseNoun
 *
 * @method faker.company.catchPhraseNoun
 */
export function catchPhraseNoun(): string {
  return arrayElement(getStringArray('company.noun'));
}

/**
 * catchPhrase
 *
 * @method faker.company.catchPhrase
 */
export function catchPhrase(): string {
  return `${catchPhraseAdjective()} ${catchPhraseDescriptor()} ${catchPhraseNoun()}`;
}

/**
 * bsAdjective
 *
 * @method faker.company.bsAdjective
 */
export function bsAdjective(): string {
  return arrayElement(getStringArray('company.bs_adjective'));
}

/**
 * bsBuzz
 *
 * @method faker.company.bsBuzz
 */
export function bsBuzz(): string {
  return arrayElement(getStringArray('company.bs_verb'));
}

/**
 * bsNoun
 *
 * @method faker.company.bsNoun
 */
export function bsNoun(): string {
  return arrayElement(getStringArray('company.bs_noun'));
}

/**
 * bs
 *
 * @method faker.company.bs
 */
export function bs(): string {
  return `${bsBuzz()} ${bsAdjective()} ${bsNoun()}`;
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
