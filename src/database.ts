/**
 *
 * @module database
 */

import { arrayElement } from 'random';

declare const faker: { definitions: any };

/**
 * column
 *
 * @method faker.database.column
 */
export function column(): string {
  return arrayElement(faker.definitions.database.column);
}

column.schema = {
  description: 'Generates a column name.',
  sampleResults: ['id', 'title', 'createdAt']
};

/**
 * type
 *
 * @method faker.database.type
 */
export function type(): string {
  return arrayElement(faker.definitions.database.type);
}

type.schema = {
  description: 'Generates a column type.',
  sampleResults: ['byte', 'int', 'constchar', 'timestamp']
};

/**
 * collation
 *
 * @method faker.database.collation
 */
export function collation(): string {
  return arrayElement(faker.definitions.database.collation);
}

collation.schema = {
  description: 'Generates a collation.',
  sampleResults: ['utf8_unicode_ci', 'utf8_bin']
};

/**
 * engine
 *
 * @method faker.database.engine
 */
export function engine(): string {
  return arrayElement(faker.definitions.database.engine);
}

engine.schema = {
  description: 'Generates a storage engine.',
  sampleResults: ['MyISAM', 'InnoDB']
};

export default {
  collation,
  column,
  engine,
  type
};
