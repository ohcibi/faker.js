/**
 *
 * @module date
 */

import { arrayElement, number } from 'random';

declare const faker: { definitions: any };

/**
 * past
 *
 * @method faker.date.past
 * @param {number} years
 * @param {date} refDate
 */
export function past(years = 1, refDate?: Date): Date {
  let date = new Date();
  if (typeof refDate !== 'undefined') {
    date = new Date(Date.parse(refDate.toISOString()));
  }

  const range = {
    min: 1000,
    max: years * 365 * 24 * 3600 * 1000
  };

  let past = date.getTime();
  past -= number(range); // some time from now to N years ago, in milliseconds
  date.setTime(past);

  return date;
}

/**
 * future
 *
 * @method faker.date.future
 * @param {number} years
 * @param {date} refDate
 */
export function future(years = 1, refDate?: Date): Date {
  let date = new Date();
  if (typeof refDate !== 'undefined') {
    date = new Date(Date.parse(refDate.toISOString()));
  }

  const range = {
    min: 1000,
    max: (years || 1) * 365 * 24 * 3600 * 1000
  };

  let future = date.getTime();
  future += number(range); // some time from now to N years later, in milliseconds
  date.setTime(future);

  return date;
}

/**
 * between
 *
 * @method faker.date.between
 * @param {date} from
 * @param {date} to
 */
export function between(from: Date, to: Date): Date {
  const fromMilli = Date.parse(from.toISOString());
  const dateOffset = number(Date.parse(to.toISOString()) - fromMilli);

  const newDate = new Date(fromMilli + dateOffset);

  return newDate;
}

/**
 * recent
 *
 * @method faker.date.recent
 * @param {number} days
 * @param {date} refDate
 */
export function recent(days = 1, refDate?: Date): Date {
  let date = new Date();
  if (typeof refDate !== 'undefined') {
    date = new Date(Date.parse(refDate.toISOString()));
  }

  const range = {
    min: 1000,
    max: (days || 1) * 24 * 3600 * 1000
  };

  let future = date.getTime();
  future -= number(range); // some time from now to N days ago, in milliseconds
  date.setTime(future);

  return date;
}

/**
 * soon
 *
 * @method faker.date.soon
 * @param {number} days
 * @param {date} refDate
 */
export function soon(days = 1, refDate?: Date): Date {
  let date = new Date();
  if (typeof refDate !== 'undefined') {
    date = new Date(Date.parse(refDate.toISOString()));
  }

  const range = {
    min: 1000,
    max: (days || 1) * 24 * 3600 * 1000
  };

  let future = date.getTime();
  future += number(range); // some time from now to N days later, in milliseconds
  date.setTime(future);

  return date;
}

/**
 * month
 *
 * @method faker.date.month
 * @param {object} options
 */
export function month(options: { abbr?: string; context?: boolean } = {}): string {
  let style = 'wide';
  if (options.abbr) {
    style = 'abbr';
  }
  if (options.context && typeof faker.definitions.date.month[style + '_context'] !== 'undefined') {
    style += '_context';
  }

  const source = faker.definitions.date.month[style];

  return arrayElement(source);
}

/**
 * weekday
 *
 * @param {object} options
 * @method faker.date.weekday
 */
export function weekday(options: { abbr?: string; context?: boolean } = {}): string {
  let style = 'wide';
  if (options.abbr) {
    style = 'abbr';
  }
  if (
    options.context &&
    typeof faker.definitions.date.weekday[style + '_context'] !== 'undefined'
  ) {
    style += '_context';
  }

  const source = faker.definitions.date.weekday[style];

  return arrayElement(source);
}

export default {
  between,
  future,
  month,
  past,
  recent,
  soon,
  weekday
};
