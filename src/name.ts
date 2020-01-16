/**
 *
 * @module name
 */

import { getStringArray } from 'definitions';
import { arrayElement, number } from 'random';

/**
 * firstName
 *
 * @method firstName
 * @param {mixed} gender
 * @memberof faker.name
 */
export function firstName(gender?: number): string {
  if (typeof gender !== 'number') {
    gender = number(1);
  }

  return arrayElement(
    getStringArray(
      `name.${gender === 0 ? 'male' : 'female'}_first_name`,
      getStringArray('name.first_name')
    )
  );
}

/**
 * lastName
 *
 * @method lastName
 * @param {mixed} gender
 * @memberof faker.name
 */
export function lastName(gender?: number): string {
  if (typeof gender !== 'number') {
    gender = number(1);
  }

  return arrayElement(
    getStringArray(
      `name.${gender === 0 ? 'male' : 'female'}_last_name`,
      getStringArray('name.last_name')
    )
  );
}

/**
 * prefix
 *
 * @method prefix
 * @param {mixed} gender
 * @memberof faker.name
 */
export function prefix(gender?: number): string {
  if (typeof gender !== 'number') {
    gender = number(1);
  }

  return arrayElement(
    getStringArray(`name.${gender === 0 ? 'male' : 'female'}_prefix`, getStringArray('name.prefix'))
  );
}

/**
 * suffix
 *
 * @method suffix
 * @memberof faker.name
 */
export function suffix(): string {
  return arrayElement(getStringArray('name.suffix'));
}

/**
 * findName
 *
 * @method findName
 * @param {string} firstName
 * @param {string} lastName
 * @param {mixed} gender
 * @memberof faker.name
 */
export function findName(_firstName?: string, _lastName?: string, gender?: number): string {
  const r = number(8);
  // in particular locales first and last names split by gender,
  // thus we keep consistency by passing 0 as male and 1 as female
  if (typeof gender !== 'number') {
    gender = number(1);
  }
  _firstName = _firstName || firstName(gender);
  _lastName = _lastName || lastName(gender);
  switch (r) {
    case 0:
      const _prefix = prefix(gender);
      if (_prefix) {
        return _prefix + ' ' + _firstName + ' ' + _lastName;
      }
    case 1:
      const _suffix = suffix();
      if (_suffix) {
        return _firstName + ' ' + _lastName + ' ' + _suffix;
      }
  }

  return _firstName + ' ' + _lastName;
}

/**
 * jobDescriptor
 *
 * @method jobDescriptor
 * @memberof faker.name
 */
export function jobDescriptor(): string {
  return arrayElement(getStringArray('name.title.descriptor'));
}

/**
 * jobArea
 *
 * @method jobArea
 * @memberof faker.name
 */
export function jobArea(): string {
  return arrayElement(getStringArray('name.title.level'));
}

/**
 * jobType
 *
 * @method jobType
 * @memberof faker.name
 */
export function jobType(): string {
  return arrayElement(getStringArray('name.title.job'));
}

/**
 * jobTitle
 *
 * @method jobTitle
 * @memberof faker.name
 */
export function jobTitle(): string {
  return jobDescriptor() + ' ' + jobArea() + ' ' + jobType();
}

/**
 * gender
 *
 * @method gender
 * @memberof faker.name
 */
export function gender(): string {
  return arrayElement(getStringArray('name.gender'));
}

/**
 * title
 *
 * @method title
 * @memberof faker.name
 */
export function title(): string {
  const descriptor = arrayElement(getStringArray('name.title.descriptor')),
    level = arrayElement(getStringArray('name.title.level')),
    job = arrayElement(getStringArray('name.title.job'));

  return descriptor + ' ' + level + ' ' + job;
}

export default {
  findName,
  firstName,
  gender,
  jobArea,
  jobDescriptor,
  jobTitle,
  jobType,
  lastName,
  prefix,
  suffix,
  title
};
