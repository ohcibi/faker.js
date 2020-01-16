type DefinitionObject = { [k: string]: Definition };

type Definition = string | number | boolean | string[] | number[] | boolean[] | DefinitionObject;

interface Locale {
  [definition: string]: Definition;
}

interface Registry {
  [locale: string]: Locale;
}

const registry: Registry = {};

let currentLocale: keyof Registry = 'en';

export function addLocale(code: keyof Registry, locale: Locale): void {
  registry[code] = locale;
}

export function mergeLocale(code: keyof Registry, locale: Locale): void {
  registry[code] = { ...registry[code], ...locale };
}

export function setCurrentLocale(code: keyof Registry = 'en'): void {
  currentLocale = code;
}

export function deleteLocale(code: keyof Registry): void {
  delete registry[code];
}

export function getDefinition(key: string, defaultValue?: Definition): Definition {
  return key.split('.').reduce((ret: Definition, subKey) => {
    if (ret && !(ret as DefinitionObject)[subKey]) {
      return (ret as DefinitionObject)[subKey];
    }

    if (ret) {
      return ret;
    }

    if (defaultValue || defaultValue === '') {
      return defaultValue;
    }

    throw new Error(
      `Key '${key}' not found in locale '${currentLocale}'. Try installing a locale that defines this key.`
    );
  }, registry[currentLocale]);
}

export function getString(key: string, defaultValue?: string): string {
  return getDefinition(key, defaultValue) as string;
}

export function getNumber(key: string, defaultValue?: number): number {
  return getDefinition(key, defaultValue) as number;
}

/**
 * getStringArray
 *
 * foo bar baz biazasdfakj fda;sdj fa;k jdfa;j;sd fas
 *
 * @param {string} key
 * @param {string} defaultValue foo
 *
 * @return {string} bar
 */
export function getStringArray(key: string, defaultValue?: string[]): string[] {
  return getDefinition(key, defaultValue) as string[];
}

export function getNumberArray(key: string, defaultValue?: number[]): number[] {
  return getDefinition(key, defaultValue) as number[];
}

// TODO: maybe these are unnecessary as one could always getDefinition('foo.bar.baz.boz'),
// it might be better to allow returning `Category` in `getDefinition`
export function getStringObject(key: string, defaultValue?: string): { [k: string]: string } {
  return getDefinition(key, defaultValue) as { [k: string]: string };
}

export function getNumberObject(key: string, defaultValue?: string): { [k: string]: number } {
  return getDefinition(key, defaultValue) as { [k: string]: number };
}
