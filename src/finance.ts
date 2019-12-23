/**
 *
 * @module finance
 */

import { replaceCreditCardSymbols, replaceSymbols, replaceSymbolWithNumber } from 'helpers';
import { arrayElement, boolean, hexaDecimal, number, objectElement } from 'random';
import ibanLib from 'iban';

declare const faker: { definitions: any };

/**
 * account
 *
 * @method faker.finance.account
 * @param {number} length
 */
export function account(length = 8): string {
  let template = '';

  for (let i = 0; i < length; i++) {
    template = template + '#';
  }
  return replaceSymbolWithNumber(template);
}

/**
 * accountName
 *
 * @method faker.finance.accountName
 */
export function accountName(): string {
  return `${arrayElement(faker.definitions.finance.account_type)} Account`;
}

/**
 * routingNumber
 *
 * @method faker.finance.routingNumber
 */
export function routingNumber(): string {
  const routingNumber = replaceSymbolWithNumber('########');

  // Modules 10 straight summation.
  let sum = 0;

  for (let i = 0; i < routingNumber.length; i += 3) {
    sum += Number(routingNumber[i]) * 3;
    sum += Number(routingNumber[i + 1]) * 7;
    sum += Number(routingNumber[i + 2]) || 0;
  }

  return routingNumber + (Math.ceil(sum / 10) * 10 - sum);
}

/**
 * mask
 *
 * @method faker.finance.mask
 * @param {number} length
 * @param {boolean} parens
 * @param {boolean} ellipsis
 */
export function mask(length = 4, parens = true, ellipsis = true): string {
  //create a template for length
  let template = '';

  for (let i = 0; i < length; i++) {
    template = template + '#';
  }

  //prefix with ellipsis
  template = ellipsis ? `...${template}` : template;

  template = parens ? `(${template})` : template;

  //generate random numbers
  template = replaceSymbolWithNumber(template);

  return template;
}

//min and max take in minimum and maximum amounts, dec is the decimal place you want rounded to, symbol is $, €, £, etc
//NOTE: this returns a string representation of the value, if you want a number use parseFloat and no symbol

/**
 * amount
 *
 * @method faker.finance.amount
 * @param {number} min
 * @param {number} max
 * @param {number} dec
 * @param {string} symbol
 *
 * @return {string}
 */
export function amount(min = 0, max = 1000, dec = 2, symbol = ''): string {
  const randValue = number({ max: max, min: min, precision: Math.pow(10, -dec) });

  return symbol + randValue.toFixed(dec);
}

/**
 * transactionType
 *
 * @method faker.finance.transactionType
 */
export function transactionType(): string {
  return arrayElement(faker.definitions.finance.transaction_type);
}

/**
 * currencyCode
 *
 * @method faker.finance.currencyCode
 */
export function currencyCode(): string {
  return objectElement(faker.definitions.finance.currency)['code'];
}

/**
 * currencyName
 *
 * @method faker.finance.currencyName
 */
export function currencyName(): string {
  return objectElement(faker.definitions.finance.currency, 'key');
}

/**
 * currencySymbol
 *
 * @method faker.finance.currencySymbol
 */
export function currencySymbol(): string {
  let symbol;

  while (!symbol) {
    symbol = objectElement(faker.definitions.finance.currency)['symbol'];
  }
  return symbol;
}

/**
 * bitcoinAddress
 *
 * @method  faker.finance.bitcoinAddress
 */
export function bitcoinAddress(): string {
  const addressLength = number({ min: 25, max: 34 });

  let address = arrayElement(['1', '3']);

  for (let i = 0; i < addressLength - 1; i++)
    address += arrayElement('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'.split(''));

  return address;
}

/**
 * Credit card number
 * @method faker.finance.creditCardNumber
 * @param {string} provider | scheme
 */
export function creditCardNumber(provider = ''): string {
  let format = '',
    formats: string[];
  const localeFormat = faker.definitions.finance.credit_card;
  if (provider in localeFormat) {
    formats = localeFormat[provider]; // there chould be multiple formats
    if (typeof formats === 'string') {
      format = formats;
    } else {
      format = arrayElement(formats);
    }
  } else if (provider.match(/#/)) {
    // The user chose an optional scheme
    format = provider;
  } else {
    // Choose a random provider
    if (typeof localeFormat === 'string') {
      format = localeFormat;
    } else if (typeof localeFormat === 'object') {
      // Credit cards are in a object structure
      formats = objectElement(localeFormat, 'value'); // There chould be multiple formats
      if (typeof formats === 'string') {
        format = formats;
      } else {
        format = arrayElement(formats);
      }
    }
  }
  format = format.replace(/\//g, '');
  return replaceCreditCardSymbols(format);
}
/**
 * Credit card CVV
 * @method faker.finance.creditCardNumber
 */
export function creditCardCVV(): string {
  let cvv = '';
  for (let i = 0; i < 3; i++) {
    cvv += `${number(9)}`;
  }
  return cvv;
}

/**
 * ethereumAddress
 *
 * @method  faker.finance.ethereumAddress
 */
export function ethereumAddress(): string {
  return hexaDecimal(40).toLowerCase();
}

/**
 * iban
 *
 * @method  faker.finance.iban
 */
export function iban(formatted: boolean): string {
  const ibanFormat = arrayElement(ibanLib.formats);
  let s = '';
  let count = 0;
  for (let b = 0; b < ibanFormat.bban.length; b++) {
    const bban = ibanFormat.bban[b];
    let c = bban.count;
    count += bban.count;
    while (c > 0) {
      if (bban.type == 'a') {
        s += arrayElement(ibanLib.alpha);
      } else if (bban.type == 'c') {
        if (number(100) < 80) {
          s += number(9);
        } else {
          s += arrayElement(ibanLib.alpha);
        }
      } else {
        if (c >= 3 && number(100) < 30) {
          if (boolean()) {
            s += arrayElement(ibanLib.pattern100);
            c -= 2;
          } else {
            s += arrayElement(ibanLib.pattern10);
            c--;
          }
        } else {
          s += number(9);
        }
      }
      c--;
    }
    s = s.substring(0, count);
  }
  let checksum: string | number =
    98 - ibanLib.mod97(ibanLib.toDigitString(s + ibanFormat.country + '00'));
  if (checksum < 10) {
    checksum = '0' + `${checksum}`;
  }
  const iban = ibanFormat.country + checksum + s;
  return formatted ? (iban.match(/.{1,4}/g) || []).join(' ') : iban;
}

/**
 * bic
 *
 * @method  faker.finance.bic
 */
export function bic(): string {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const prob = number(100);
  return (
    replaceSymbols('???') +
    arrayElement(vowels) +
    arrayElement(ibanLib.iso3166) +
    replaceSymbols('?') +
    '1' +
    (prob < 10
      ? replaceSymbols('?' + arrayElement(vowels) + '?')
      : prob < 40
      ? replaceSymbols('###')
      : '')
  );
}

export default {
  account,
  accountName,
  amount,
  bic,
  bitcoinAddress,
  creditCardCVV,
  creditCardNumber,
  currencyCode,
  currencyName,
  currencySymbol,
  ethereumAddress,
  iban,
  mask,
  routingNumber,
  transactionType
};
