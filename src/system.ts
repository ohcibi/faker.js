/**
 *
 * @module system
 */

import { arrayElement, number, words } from 'random';

declare const faker: { definitions: any; fake: (arg0: string) => string };

/**
 * generates a file name with extension or optional type
 *
 * @method faker.system.fileName
 * @param {string} ext
 * @param {string} type
 */
export function fileName(): string {
  let str = faker.fake('{{random.words}}.{{system.fileExt}}');
  str = str.replace(/ /g, '_');
  str = str.replace(/\,/g, '_');
  str = str.replace(/\-/g, '_');
  str = str.replace(/\\/g, '_');
  str = str.replace(/\//g, '_');
  str = str.toLowerCase();
  return str;
}

/**
 * fileExt
 *
 * @method faker.system.fileExt
 * @param {string} mimeType
 */
export function fileExt(mimeType: string): string {
  const exts: string[] = [];
  const mimes = faker.definitions.system.mimeTypes;

  // get specific ext by mime-type
  if (typeof mimes[mimeType] === 'object') {
    return arrayElement(mimes[mimeType].extensions);
  }

  // reduce mime-types to those with file-extensions
  Object.keys(mimes).forEach(function(m) {
    if (mimes[m].extensions instanceof Array) {
      mimes[m].extensions.forEach((ext: string) => exts.push(ext));
    }
  });
  return arrayElement(exts);
}

/**
 * returns a commonly used file extension based on optional type
 *
 * @method faker.system.commonFileExt
 * @param {string} type
 */
export function commonFileExt(): string {
  const types = [
    'application/pdf',
    'audio/mpeg',
    'audio/wav',
    'image/png',
    'image/jpeg',
    'image/gif',
    'video/mp4',
    'video/mpeg',
    'text/html'
  ];
  return fileExt(arrayElement(types));
}

/**
 * commonFileName
 *
 * @method faker.system.commonFileName
 * @param {string} ext
 * @param {string} type
 */
export function commonFileName(ext: string): string {
  let str = words() + '.' + (ext || commonFileExt());
  str = str.replace(/ /g, '_');
  str = str.replace(/\,/g, '_');
  str = str.replace(/\-/g, '_');
  str = str.replace(/\\/g, '_');
  str = str.replace(/\//g, '_');
  str = str.toLowerCase();
  return str;
}

/**
 * mimeType
 *
 * @method faker.system.mimeType
 */
export function mimeType(): string {
  return arrayElement(Object.keys(faker.definitions.system.mimeTypes));
}

/**
 * returns a commonly used file type
 *
 * @method faker.system.commonFileType
 */
export function commonFileType(): string {
  const types = ['video', 'audio', 'image', 'text', 'application'];
  return arrayElement(types);
}

/**
 * returns any file type available as mime-type
 *
 * @method faker.system.fileType
 */
export function fileType(): string {
  const types: string[] = [];
  const mimes = faker.definitions.system.mimeTypes;
  Object.keys(mimes).forEach(function(m) {
    const parts = m.split('/');
    if (types.indexOf(parts[0]) === -1) {
      types.push(parts[0]);
    }
  });
  return arrayElement(types);
}

/**
 * returns directory path
 *
 * @method faker.system.directoryPath
 */
export function directoryPath(): string {
  const paths = faker.definitions.system.directoryPaths;
  return arrayElement(paths);
}

/**
 * returns file path
 *
 * @method faker.system.filePath
 */
export function filePath(): string {
  return faker.fake('{{system.directoryPath}}/{{system.fileName}}');
}

/**
 * semver
 *
 * @method faker.system.semver
 */
export function semver(): string {
  return `${number(9)}.${number(9)}.${number(9)}`;
}

export default {
  commonFileExt,
  commonFileName,
  commonFileType,
  directoryPath,
  fileExt,
  fileName,
  filePath,
  fileType,
  mimeType,
  semver
};
