interface Definition {
  [definition: string]: string;
}

interface Locale {
  [category: string]: Definition;
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

export function getDefinition(key: string, defaultValue?: string): string {
  return key.split('.').reduce((ret: Locale | Definition | string, subKey) => {
    if (typeof ret === 'string') {
      return ret;
    }

    if (!ret || !ret[subKey]) {
      if (defaultValue || defaultValue === '') {
        return defaultValue;
      }

      throw new Error(
        `Key '${key}' not found in locale '${currentLocale}'. Try installing a locale that defines this key.`
      );
    }

    return ret[subKey];
  }, registry[currentLocale]) as string;
}
