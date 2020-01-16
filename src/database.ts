/**
 *
 * @module database
 */

import { getStringArray } from 'definitions';
import { arrayElement } from 'random';

/**
 * column
 *
 * @method faker.database.column
 */
export function column(): string {
  return arrayElement(getStringArray('database.column'));
}

/**
 * type
 *
 * @method faker.database.type
 */
export function type(): string {
  return arrayElement(getStringArray('database.type'));
}

/**
 * collation
 *
 * @method faker.database.collation
 */
export function collation(): string {
  return arrayElement(getStringArray('database.collation'));
}

/**
 * engine
 *
 * @method faker.database.engine
 */
export function engine(): string {
  return arrayElement(getStringArray('database.engine'));
}

export default {
  collation,
  column,
  engine,
  type
};
