/**
 *
 * @module unsplash
 */

import { avatar } from 'internet';

/**
 * imageUrl
 *
 * @param {number} width
 * @param {number} height
 * @param {string} category
 * @param {string} keyword
 * @method imageUrl
 */
export function imageUrl(width = 640, height = 480, category?: string, keyword?: string): string {
  let url = 'https://source.unsplash.com';

  if (typeof category !== 'undefined') {
    url += '/category/' + category;
  }

  url += '/' + width + 'x' + height;

  if (typeof keyword !== 'undefined') {
    const keywordFormat = new RegExp('^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$');
    if (keywordFormat.test(keyword)) {
      url += '?' + keyword;
    }
  }

  return url;
}

/**
 * image
 *
 * @param {number} width
 * @param {number} height
 * @param {string} keyword
 * @method image
 * @description search image from unsplash
 */
export function image(width?: number, height?: number, keyword?: string): string {
  return imageUrl(width, height, undefined, keyword);
}
/**
 * avatar
 *
 * @method avatar
 */
export { avatar };
/**
 * food
 *
 * @param {number} width
 * @param {number} height
 * @param {string} keyword
 * @method food
 */
export function food(width?: number, height?: number, keyword?: string): string {
  return imageUrl(width, height, 'food', keyword);
}
/**
 * people
 *
 * @param {number} width
 * @param {number} height
 * @param {string} keyword
 * @method people
 */
export function people(width?: number, height?: number, keyword?: string): string {
  return imageUrl(width, height, 'people', keyword);
}
/**
 * nature
 *
 * @param {number} width
 * @param {number} height
 * @param {string} keyword
 * @method nature
 */
export function nature(width?: number, height?: number, keyword?: string): string {
  return imageUrl(width, height, 'nature', keyword);
}
/**
 * technology
 *
 * @param {number} width
 * @param {number} height
 * @param {string} keyword
 * @method technology
 */
export function technology(width?: number, height?: number, keyword?: string): string {
  return imageUrl(width, height, 'technology', keyword);
}
/**
 * objects
 *
 * @param {number} width
 * @param {number} height
 * @param {string} keyword
 * @method objects
 */
export function objects(width?: number, height?: number, keyword?: string): string {
  return imageUrl(width, height, 'objects', keyword);
}
/**
 * buildings
 *
 * @param {number} width
 * @param {number} height
 * @param {string} keyword
 * @method buildings
 */
export function buildings(width?: number, height?: number, keyword?: string): string {
  return imageUrl(width, height, 'buildings', keyword);
}
