/**
 *
 * @module image
 */

import { avatar } from 'internet';
import { arrayElement, number } from 'random';

/**
 * avatar
 *
 * @method avatar
 */
export { avatar };
/**
 * imageUrl
 *
 * @param {number} width
 * @param {number} height
 * @param {string} category
 * @param {boolean} randomize
 * @method imageUrl
 */
export function imageUrl(
  width = 640,
  height = 480,
  category?: string,
  randomize?: boolean,
  https?: boolean
): string {
  let protocol = 'http://';
  if (https) {
    protocol = 'https://';
  }
  let url = protocol + 'lorempixel.com/' + width + '/' + height;
  if (typeof category !== 'undefined') {
    url += '/' + category;
  }

  if (randomize) {
    url += '?' + number();
  }

  return url;
}
/**
 * abstract
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method abstract
 */
export function abstract(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'abstract', randomize);
}
/**
 * animals
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method animals
 */
export function animals(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'animals', randomize);
}
/**
 * business
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method business
 */
export function business(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'business', randomize);
}
/**
 * cats
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method cats
 */
export function cats(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'cats', randomize);
}
/**
 * city
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method city
 */
export function city(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'city', randomize);
}
/**
 * food
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method food
 */
export function food(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'food', randomize);
}
/**
 * nightlife
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method nightlife
 */
export function nightlife(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'nightlife', randomize);
}
/**
 * fashion
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method fashion
 */
export function fashion(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'fashion', randomize);
}
/**
 * people
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method people
 */
export function people(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'people', randomize);
}
/**
 * nature
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method nature
 */
export function nature(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'nature', randomize);
}
/**
 * sports
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method sports
 */
export function sports(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'sports', randomize);
}
/**
 * technics
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method technics
 */
export function technics(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'technics', randomize);
}
/**
 * transport
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method transport
 */
export function transport(width?: number, height?: number, randomize?: boolean): string {
  return imageUrl(width, height, 'transport', randomize);
}
/**
 * dataUri
 *
 * @param {number} width
 * @param {number} height
 * @param {string} color
 * @method dataUri
 */
export function dataUri(width: number, height: number, color = 'grey'): string {
  color = color || 'grey';
  const svgString =
    '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="' +
    width +
    '" height="' +
    height +
    '"><rect width="100%" height="100%" fill="' +
    color +
    '"/><text x="' +
    width / 2 +
    '" y="' +
    height / 2 +
    '" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">' +
    width +
    'x' +
    height +
    '</text></svg>';
  const rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
  return rawPrefix + encodeURIComponent(svgString);
}

/**
 * image
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method image
 */
export function image(width?: number, height?: number, randomize?: boolean): string {
  const categories = [
    abstract,
    animals,
    business,
    cats,
    city,
    food,
    nightlife,
    fashion,
    people,
    nature,
    sports,
    technics,
    transport
  ];
  return arrayElement(categories)(width, height, randomize);
}

export default {
  abstract,
  animals,
  business,
  cats,
  city,
  dataUri,
  fashion,
  food,
  image,
  imageUrl,
  nature,
  nightlife,
  people,
  sports,
  technics,
  transport
};
