/**
 *
 * @module phone
 */

import { getString, getStringArray } from 'definitions';
import { replaceSymbolWithNumber } from 'helpers';
import { arrayElement } from 'random';

/**
 * phoneFormats
 *
 * @method faker.phone.phoneFormats
 */
export function phoneFormats(): string {
  return arrayElement(getStringArray('phone_number.formats'));
}

/**
 * phoneNumber
 *
 * @method faker.phone.phoneNumber
 * @param {string} format
 * @memberOf faker.phone
 */
export function phoneNumber(format?: string): string {
  format = format || phoneFormats();
  return replaceSymbolWithNumber(format);
}

// FIXME: this is strange passing in an array index.
/**
 * phoneNumberFormat
 *
 * @method faker.phone.phoneFormatsArrayIndex
 * @param phoneFormatsArrayIndex
 * @memberOf faker.phone
 */
export function phoneNumberFormat(phoneFormatsArrayIndex = 0): string {
  return replaceSymbolWithNumber(getString('phone_number.formats')[phoneFormatsArrayIndex]);
}

export default {
  phoneFormats,
  phoneNumber,
  phoneNumberFormat
};
