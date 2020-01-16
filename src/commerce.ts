/**
 *
 * @module commerce
 */

import { getStringArray } from 'definitions';
import { arrayElement, number } from 'random';

/**
 * color
 *
 * @method faker.commerce.color
 */
export function color(): string {
  return arrayElement(getStringArray('commerce.color'));
}

/**
 * department
 *
 * @method faker.commerce.department
 */
export function department(): string {
  return arrayElement(getStringArray('commerce.department'));
}

/**
 * productAdjective
 *
 * @method faker.commerce.productAdjective
 */
export function productAdjective(): string {
  return arrayElement(getStringArray('commerce.product_name.adjective'));
}

/**
 * productMaterial
 *
 * @method faker.commerce.productMaterial
 */
export function productMaterial(): string {
  return arrayElement(getStringArray('commerce.product_name.material'));
}

/**
 * product
 *
 * @method faker.commerce.product
 */
export function product(): string {
  return arrayElement(getStringArray('commerce.product_name.product'));
}

/**
 * productName
 *
 * @method faker.commerce.productName
 */
export function productName(): string {
  return `${productAdjective()} ${productMaterial()} ${product()}`;
}

/**
 * price
 *
 * @method faker.commerce.price
 * @param {number} min
 * @param {number} max
 * @param {number} dec
 * @param {string} symbol
 *
 * @return {string}
 */
export function price(min = 1, max = 1000, dec = 2, symbol = ''): string {
  if (min < 0 || max < 0) {
    return symbol + 0.0;
  }

  const randValue = number({ max: max, min: min });

  return symbol + (Math.round(randValue * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
}

export default {
  color,
  department,
  price,
  product,
  productAdjective,
  productMaterial,
  productName
};
