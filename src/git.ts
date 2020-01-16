/**
 *
 * @module git
 */

import { recent } from 'date';
import { adjective, noun, verb } from 'hacker';
import { email } from 'internet';
import { firstName, lastName } from 'name';
import { arrayElement, number } from 'random';

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

/**
 * commitEntry
 *
 * @method faker.git.commitEntry
 * @param {object} options
 */
export function commitEntry(options: { merge?: boolean } = {}): string {
  let entry = [`commit ${commitSha()}`];

  if (options.merge || number({ min: 0, max: 4 }) === 0) {
    entry = [...entry, `Merge: ${shortSha()} ${shortSha()}`];
  }

  entry = [
    ...entry,
    `Author: ${firstName()} ${lastName()} <${email()}>`,
    `Date: ${recent().toString()}`,
    `\r\n\xa0\xa0\xa0\xa0${commitMessage()}`
  ];

  return entry.join('\r\n');
}

export default {
  branch,
  commitEntry,
  commitMessage,
  commitSha,
  shortSha
};
