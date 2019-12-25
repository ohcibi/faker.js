/**
 *
 * @module lorempixel
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
  randomize?: boolean
): string {
  let url = 'http://lorempixel.com/' + width + '/' + height;
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
 * image
 *
 * @param {number} width
 * @param {number} height
 * @param {boolean} randomize
 * @method image
 */
export function image(width: number, height: number, randomize: boolean): string {
  return arrayElement([
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
  ])(width, height, randomize);
}
