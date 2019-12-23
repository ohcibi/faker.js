/**
 *
 * @module git
 */

import { recent } from 'date';
import { adjective, noun, verb } from 'hacker';
import { arrayElement, number } from 'random';

declare function f(string: string): string;

const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

/**
 * branch
 *
 * @method faker.git.branch
 */
export function branch(): string {
  return noun().replace(' ', '-') + '-' + verb().replace(' ', '-');
}

/**
 * commitEntry
 *
 * @method faker.git.commitEntry
 * @param {object} options
 */
export function commitEntry(options: { merge?: boolean } = {}): string {
  let entry = 'commit {{git.commitSha}}\r\n';

  if (options.merge || number({ min: 0, max: 4 }) === 0) {
    entry += 'Merge: {{git.shortSha}} {{git.shortSha}}\r\n';
  }

  entry += 'Author: {{name.firstName}} {{name.lastName}} <{{internet.email}}>\r\n';
  entry += 'Date: ' + recent().toString() + '\r\n';
  entry += '\r\n\xa0\xa0\xa0\xa0{{git.commitMessage}}\r\n';

  return f(entry);
}

/**
 * commitMessage
 *
 * @method faker.git.commitMessage
 */
export function commitMessage(): string {
  return `${verb()} ${adjective} ${noun()}`;
}

/**
 * commitSha
 *
 * @method faker.git.commitSha
 */
export function commitSha(): string {
  let commit = '';

  for (let i = 0; i < 40; i++) {
    commit += arrayElement(hexChars);
  }

  return commit;
}

/**
 * shortSha
 *
 * @method faker.git.shortSha
 */
export function shortSha(): string {
  return commitSha().slice(0, 7);
}

export default {
  branch,
  commitEntry,
  commitMessage,
  commitSha,
  shortSha
};
