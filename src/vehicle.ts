/**
 *
 * @module vehicle
 */

import { color } from 'commerce';
import { alpha, alphaNumeric, arrayElement, number } from 'random';

declare const faker: { definitions: any };

/**
 * manufacturer
 *
 * @method faker.vehicle.manufacturer
 */
export function manufacturer(): string {
  return arrayElement(faker.definitions.vehicle.manufacturer);
}

manufacturer.schema = {
  description: 'Generates a manufacturer name.',
  sampleResults: ['Ford', 'Jeep', 'Tesla']
};

/**
 * model
 *
 * @method faker.vehicle.model
 */
export function model(): string {
  return arrayElement(faker.definitions.vehicle.model);
}

model.schema = {
  description: 'Generates a vehicle model.',
  sampleResults: ['Explorer', 'Camry', 'Ranchero']
};

/**
 * vehicle
 *
 * @method faker.vehicle.vehicle
 */
export function vehicle(): string {
  return `${manufacturer()} ${model()}`;
}

vehicle.schema = {
  description: 'Generates a random vehicle.',
  sampleResults: ['BMW Explorer', 'Ford Camry', 'Lamborghini Ranchero']
};

/**
 * type
 *
 * @method faker.vehicle.type
 */
export function type(): string {
  return arrayElement(faker.definitions.vehicle.type);
}

type.schema = {
  description: 'Generates a vehicle type.',
  sampleResults: ['Coupe', 'Convertable', 'Sedan', 'SUV']
};

/**
 * fuel
 *
 * @method faker.vehicle.fuel
 */
export function fuel(): string {
  return arrayElement(faker.definitions.vehicle.fuel);
}

fuel.schema = {
  description: 'Generates a fuel type.',
  sampleResults: ['Electric', 'Gasoline', 'Diesel']
};

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

vin.schema = {
  description: 'Generates a valid VIN number.',
  sampleResults: ['YV1MH682762184654', '3C7WRMBJ2EG208836']
};

export default {
  color,
  fuel,
  manufacturer,
  model,
  type,
  vehicle,
  vin
};
