/**
 *
 * @module vehicle
 */

import { color } from 'commerce';
import { getStringArray } from 'definitions';
import { alpha, alphaNumeric, arrayElement, number } from 'random';

/**
 * manufacturer
 *
 * @method faker.vehicle.manufacturer
 */
export function manufacturer(): string {
  return arrayElement(getStringArray('vehicle.manufacturer'));
}

/**
 * model
 *
 * @method faker.vehicle.model
 */
export function model(): string {
  return arrayElement(getStringArray('vehicle.model'));
}

/**
 * vehicle
 *
 * @method faker.vehicle.vehicle
 */
export function vehicle(): string {
  return `${manufacturer()} ${model()}`;
}

/**
 * type
 *
 * @method faker.vehicle.type
 */
export function type(): string {
  return arrayElement(getStringArray('vehicle.type'));
}

/**
 * fuel
 *
 * @method faker.vehicle.fuel
 */
export function fuel(): string {
  return arrayElement(getStringArray('vehicle.fuel'));
}

/**
 * vin
 *
 * @method faker.vehicle.vin
 */
export function vin(): string {
  return (
    alphaNumeric(10) +
    alpha({ count: 1, upcase: true }) +
    alphaNumeric(1) +
    number({ min: 10000, max: 100000 })
  ) // return five digit #
    .toUpperCase();
}

export default {
  color,
  fuel,
  manufacturer,
  model,
  type,
  vehicle,
  vin
};
