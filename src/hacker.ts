/**
 *
 * @module hacker
 */

import { getStringArray } from 'definitions';
import { arrayElement } from 'random';
import { mustache } from 'helpers';

/**
 * abbreviation
 *
 * @method faker.hacker.abbreviation
 */
export function abbreviation(): string {
  return arrayElement(getStringArray('hacker.abbreviation'));
}

/**
 * adjective
 *
 * @method faker.hacker.adjective
 */
export function adjective(): string {
  return arrayElement(getStringArray('hacker.adjective'));
}

/**
 * noun
 *
 * @method faker.hacker.noun
 */
export function noun(): string {
  return arrayElement(getStringArray('hacker.noun'));
}

/**
 * verb
 *
 * @method faker.hacker.verb
 */
export function verb(): string {
  return arrayElement(getStringArray('hacker.verb'));
}

/**
 * ingverb
 *
 * @method faker.hacker.ingverb
 */
export function ingverb(): string {
  return arrayElement(getStringArray('hacker.ingverb'));
}

/**
 * phrase
 *
 * @method faker.hacker.phrase
 */
export function phrase(): string {
  const data = { abbreviation, adjective, ingverb, noun, verb };
  const phrase: string = arrayElement(getStringArray('hacker.phrase'));
  return mustache(phrase, data);
}

export default {
  abbreviation,
  adjective,
  ingverb,
  noun,
  phrase,
  verb
};
