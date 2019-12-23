/**
 *
 * @module hacker
 */

import { arrayElement } from 'random';
import { mustache } from 'helpers';

declare const faker: { definitions: any };

/**
 * abbreviation
 *
 * @method faker.hacker.abbreviation
 */
export function abbreviation(): string {
  return arrayElement(faker.definitions.hacker.abbreviation);
}

/**
 * adjective
 *
 * @method faker.hacker.adjective
 */
export function adjective(): string {
  return arrayElement(faker.definitions.hacker.adjective);
}

/**
 * noun
 *
 * @method faker.hacker.noun
 */
export function noun(): string {
  return arrayElement(faker.definitions.hacker.noun);
}

/**
 * verb
 *
 * @method faker.hacker.verb
 */
export function verb(): string {
  return arrayElement(faker.definitions.hacker.verb);
}

/**
 * ingverb
 *
 * @method faker.hacker.ingverb
 */
export function ingverb(): string {
  return arrayElement(faker.definitions.hacker.ingverb);
}

/**
 * phrase
 *
 * @method faker.hacker.phrase
 */
export function phrase(): string {
  const data = { abbreviation, adjective, ingverb, noun, verb };
  const phrase: string = arrayElement(faker.definitions.hacker.phrase);
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
