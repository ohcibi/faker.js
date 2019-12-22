/**
 *
 * @module address
 */

import { replaceSymbols, replaceSymbolWithNumber } from 'helpers';
import { firstName, lastName } from 'name';
import { arrayElement, number } from 'random';

declare const faker: { definitions: any };
declare function f(str: string): any;
/**
 * Generates random zipcode from format. If format is not specified, the
 * locale's zip format is used.
 *
 * @method faker.address.zipCode
 * @param {String} format
 */
export function zipCode(format?: string): string {
  // if zip format is not specified, use the zip format defined for the locale
  if (typeof format === 'undefined') {
    const localeFormat = faker.definitions.address.postcode;
    if (typeof localeFormat === 'string') {
      format = localeFormat;
    } else {
      format = arrayElement(localeFormat);
    }
  }
  return replaceSymbols(format);
}

/**
 * Generates random zipcode from state abbreviation. If state abbreviation is
 * not specified, a random zip code is generated according to the locale's zip format.
 * Only works for locales with postcode_by_state definition. If a locale does not
 * have a postcode_by_state definition, a random zip code is generated according
 * to the locale's zip format.
 *
 * @method faker.address.zipCodeByState
 * @param {String} state
 */
export function zipCodeByState(state: string): string {
  const zipRange = faker.definitions.address.postcode_by_state[state];
  if (zipRange) {
    return `${number(zipRange)}`;
  }
  return zipCode();
}

/**
 * Generates a random localized city name. The format string can contain any
 * method provided by faker wrapped in `{{}}`, e.g. `{{name.firstName}}` in
 * order to build the city name.
 *
 * If no format string is provided one of the following is randomly used:
 *
 * * `{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}`
 * * `{{address.cityPrefix}} {{name.firstName}}`
 * * `{{name.firstName}}{{address.citySuffix}}`
 * * `{{name.lastName}}{{address.citySuffix}}`
 *
 * @method faker.address.city
 * @param {String} format
 */
export function city(format?: string): string {
  if (!format) {
    format = arrayElement([
      '{{address.cityPrefix}} {{name.firstName}}{{address.citySuffix}}',
      '{{address.cityPrefix}} {{name.firstName}}',
      '{{name.firstName}}{{address.citySuffix}}',
      '{{name.lastName}}{{address.citySuffix}}'
    ]);
  }

  return f(format);
}

/**
 * Return a random localized city prefix
 * @method faker.address.cityPrefix
 */
export function cityPrefix(): string {
  return arrayElement(faker.definitions.address.city_prefix);
}

/**
 * Return a random localized city suffix
 *
 * @method faker.address.citySuffix
 */
export function citySuffix(): string {
  return arrayElement(faker.definitions.address.city_suffix);
}

/**
 * streetSuffix
 *
 * @method faker.address.streetSuffix
 */
export function streetSuffix(): string {
  return arrayElement(faker.definitions.address.street_suffix);
}

/**
 * streetPrefix
 *
 * @method faker.address.streetPrefix
 */
export function streetPrefix(): string {
  return arrayElement(faker.definitions.address.street_prefix);
}

/**
 * Returns a random localized street name
 *
 * @method faker.address.streetName
 */
export function streetName(): string {
  let result = '';
  let suffix = streetSuffix();
  if (suffix !== '') {
    suffix = ' ' + suffix;
  }

  switch (number(1)) {
    case 0:
      result = lastName() + suffix;
      break;
    case 1:
      result = firstName() + suffix;
      break;
  }
  return result;
}

/**
 * secondaryAddress
 *
 * @method faker.address.secondaryAddress
 */
export function secondaryAddress(): string {
  return replaceSymbolWithNumber(arrayElement(['Apt. ###', 'Suite ###']));
}

//
// TODO: change all these methods that accept a boolean to instead accept an options hash.
//
/**
 * Returns a random localized street address
 *
 * @method faker.address.streetAddress
 * @param {Boolean} useFullAddress
 */
export function streetAddress(useFullAddress = false): string {
  const address = `${replaceSymbolWithNumber(['#####', '####', '###'][number(2)])} ${streetName()}`;
  return useFullAddress ? `${address} ${secondaryAddress()}` : address;
}

/**
 * county
 *
 * @method faker.address.county
 */
export function county(): string {
  return arrayElement(faker.definitions.address.county);
}

/**
 * country
 *
 * @method faker.address.country
 */
export function country(): string {
  return arrayElement(faker.definitions.address.country);
}

/**
 * countryCode
 *
 * @method faker.address.countryCode
 */
export function countryCode(): string {
  return arrayElement(faker.definitions.address.country_code);
}

/**
 * state
 *
 * @method faker.address.state
 * @param {Boolean} useAbbr
 */
export function state(): string {
  return arrayElement(faker.definitions.address.state);
}

/**
 * stateAbbr
 *
 * @method faker.address.stateAbbr
 */
export function stateAbbr(): string {
  return arrayElement(faker.definitions.address.state_abbr);
}

/**
 * latitude
 *
 * @method faker.address.latitude
 * @param {Double} max default is 90
 * @param {Double} min default is -90
 * @param {number} precision default is 4
 */
export function latitude(max = 90, min = -90, precision = 4): number {
  return parseFloat(
    number({
      max: max,
      min: min,
      precision: parseFloat((0.0).toPrecision(precision) + '1')
    }).toFixed(precision)
  );
}

/**
 * longitude
 *
 * @method faker.address.longitude
 * @param {Double} max default is 180
 * @param {Double} min default is -180
 * @param {number} precision default is 4
 */
export function longitude(max = 180, min = -180, precision = 4): number {
  return parseFloat(
    number({
      max,
      min,
      precision: parseFloat((0.0).toPrecision(precision) + '1')
    }).toFixed(precision)
  );
}

/**
 *  direction
 *
 * @method faker.address.direction
 * @param {Boolean} useAbbr return direction abbreviation. defaults to false
 */
export function direction(useAbbr = false): string {
  if (!useAbbr) {
    return arrayElement(faker.definitions.address.direction);
  }
  return arrayElement(faker.definitions.address.direction_abbr);
}

direction.schema = {
  description: 'Generates a direction. Use optional useAbbr bool to return abbrevation',
  sampleResults: ['Northwest', 'South', 'SW', 'E']
};

/**
 * cardinal direction
 *
 * @method faker.address.cardinalDirection
 * @param {Boolean} useAbbr return direction abbreviation. defaults to false
 */
export function cardinalDirection(useAbbr = false): string {
  if (!useAbbr) {
    return arrayElement(faker.definitions.address.direction.slice(0, 4));
  }
  return arrayElement(faker.definitions.address.direction_abbr.slice(0, 4));
}

cardinalDirection.schema = {
  description: 'Generates a cardinal direction. Use optional useAbbr boolean to return abbrevation',
  sampleResults: ['North', 'South', 'E', 'W']
};

/**
 * ordinal direction
 *
 * @method faker.address.ordinalDirection
 * @param {Boolean} useAbbr return direction abbreviation. defaults to false
 */
export function ordinalDirection(useAbbr = false): string {
  if (!useAbbr) {
    return arrayElement(faker.definitions.address.direction.slice(4, 8));
  }
  return arrayElement(faker.definitions.address.direction_abbr.slice(4, 8));
}

ordinalDirection.schema = {
  description: 'Generates an ordinal direction. Use optional useAbbr boolean to return abbrevation',
  sampleResults: ['Northwest', 'Southeast', 'SW', 'NE']
};

export function nearbyGPSCoordinate(
  coordinate?: [number, number],
  radius = 10.0,
  isMetric = false
): [number, number] {
  function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180.0);
  }
  function radiansToDegrees(radians: number): number {
    return radians * (180.0 / Math.PI);
  }
  function kilometersToMiles(miles: number): number {
    return miles * 0.621371;
  }
  function coordinateWithOffset(
    coordinate: [number, number],
    bearing: number,
    distance: number,
    isMetric: boolean
  ): [number, number] {
    const R = 6378.137; // Radius of the Earth (http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)
    const d = isMetric ? distance : kilometersToMiles(distance); // Distance in km

    const lat1 = degreesToRadians(coordinate[0]); //Current lat point converted to radians
    const lon1 = degreesToRadians(coordinate[1]); //Current long point converted to radians

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearing)
    );

    let lon2 =
      lon1 +
      Math.atan2(
        Math.sin(bearing) * Math.sin(d / R) * Math.cos(lat1),
        Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2)
      );

    // Keep longitude in range [-180, 180]
    if (lon2 > degreesToRadians(180)) {
      lon2 = lon2 - degreesToRadians(360);
    } else if (lon2 < degreesToRadians(-180)) {
      lon2 = lon2 + degreesToRadians(360);
    }

    return [radiansToDegrees(lat2), radiansToDegrees(lon2)];
  }

  // If there is no coordinate, the best we can do is return a random GPS coordinate.
  if (coordinate === undefined) {
    return [latitude(), longitude()];
  }

  // TODO: implement either a gaussian/uniform distribution of points in cicular region.
  // Possibly include param to function that allows user to choose between distributions.

  // This approach will likely result in a higher density of points near the center.
  const randomCoord = coordinateWithOffset(
    coordinate,
    degreesToRadians(Math.random() * 360.0),
    radius,
    isMetric
  );
  return [parseFloat(randomCoord[0].toFixed(4)), parseFloat(randomCoord[1].toFixed(4))];
}

export default {
  cardinalDirection,
  city,
  cityPrefix,
  citySuffix,
  country,
  countryCode,
  county,
  direction,
  latitude,
  longitude,
  nearbyGPSCoordinate,
  ordinalDirection,
  secondaryAddress,
  state,
  stateAbbr,
  streetAddress,
  streetName,
  streetPrefix,
  streetSuffix,
  zipCode,
  zipCodeByState
};
