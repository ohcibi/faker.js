/**
 *
 * @module name
 */

import { arrayElement, number } from 'random';

declare const faker: { definitions: any; locales: any; locale: any };

/**
 * firstName
 *
 * @method firstName
 * @param {mixed} gender
 * @memberof faker.name
 */
export function firstName(gender?: number): string {
  if (
    typeof faker.definitions.name.male_first_name !== 'undefined' &&
    typeof faker.definitions.name.female_first_name !== 'undefined'
  ) {
    // some locale datasets ( like ru ) have first_name split by gender. since the name.first_name field does not exist in these datasets,
    // we must randomly pick a name from either gender array so faker.name.firstName will return the correct locale data ( and not fallback )
    if (typeof gender !== 'number') {
      if (typeof faker.definitions.name.first_name === 'undefined') {
        gender = number(1);
      } else {
        //Fall back to non-gendered names if they exist and gender wasn't specified
        return arrayElement(faker.definitions.name.first_name);
      }
    }
    if (gender === 0) {
      return arrayElement(faker.definitions.name.male_first_name);
    } else {
      return arrayElement(faker.definitions.name.female_first_name);
    }
  }
  return arrayElement(faker.definitions.name.first_name);
}

/**
 * lastName
 *
 * @method lastName
 * @param {mixed} gender
 * @memberof faker.name
 */
export function lastName(gender?: number): string {
  if (
    typeof faker.definitions.name.male_last_name !== 'undefined' &&
    typeof faker.definitions.name.female_last_name !== 'undefined'
  ) {
    // some locale datasets ( like ru ) have last_name split by gender. i have no idea how last names can have genders, but also i do not speak russian
    // see above comment of firstName method
    if (typeof gender !== 'number') {
      gender = number(1);
    }
    if (gender === 0) {
      return arrayElement(faker.locales[faker.locale].name.male_last_name);
    } else {
      return arrayElement(faker.locales[faker.locale].name.female_last_name);
    }
  }
  return arrayElement(faker.definitions.name.last_name);
}

/**
 * prefix
 *
 * @method prefix
 * @param {mixed} gender
 * @memberof faker.name
 */
export function prefix(gender?: number): string {
  if (
    typeof faker.definitions.name.male_prefix !== 'undefined' &&
    typeof faker.definitions.name.female_prefix !== 'undefined'
  ) {
    if (typeof gender !== 'number') {
      gender = number(1);
    }
    if (gender === 0) {
      return arrayElement(faker.locales[faker.locale].name.male_prefix);
    } else {
      return arrayElement(faker.locales[faker.locale].name.female_prefix);
    }
  }
  return arrayElement(faker.definitions.name.prefix);
}

/**
 * suffix
 *
 * @method suffix
 * @memberof faker.name
 */
export function suffix(): string {
  return arrayElement(faker.definitions.name.suffix);
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
  return arrayElement(faker.definitions.name.title.descriptor);
}

/**
 * jobArea
 *
 * @method jobArea
 * @memberof faker.name
 */
export function jobArea(): string {
  return arrayElement(faker.definitions.name.title.level);
}

/**
 * jobType
 *
 * @method jobType
 * @memberof faker.name
 */
export function jobType(): string {
  return arrayElement(faker.definitions.name.title.job);
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
  return arrayElement(faker.definitions.name.gender);
}

/**
 * title
 *
 * @method title
 * @memberof faker.name
 */
export function title(): string {
  const descriptor = arrayElement(faker.definitions.name.title.descriptor),
    level = arrayElement(faker.definitions.name.title.level),
    job = arrayElement(faker.definitions.name.title.job);

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
