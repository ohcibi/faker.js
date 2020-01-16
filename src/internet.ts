/**
 *
 * @module internet
 */

import { getStringArray } from 'definitions';
import { slugify } from 'helpers';
import { firstName as randomFirstName, lastName as randomLastName } from 'name';
import { arrayElement, number } from 'random';
import random_ua from 'random-ua';

/**
 * avatar
 *
 * @method avatar
 */
export function avatar(): string {
  return arrayElement(getStringArray('internet.avatar_uri'));
}

avatar.schema = {
  description: 'Generates a URL for an avatar.',
  sampleResults: ['https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg']
};

/**
 * userName
 *
 * @method userName
 * @param {string} firstName
 * @param {string} lastName
 */
export function userName(firstName = randomFirstName(), lastName = randomLastName()): string {
  let result;
  switch (number(2)) {
    case 0:
      result = firstName + number(99);
      break;
    case 1:
      result = firstName + arrayElement(['.', '_']) + lastName;
      break;
    default:
      result = firstName + arrayElement(['.', '_']) + lastName + number(99);
      break;
  }
  result = result.toString().replace(/'/g, '');
  result = result.replace(/ /g, '');
  return result;
}

userName.schema = {
  description:
    'Generates a username based on one of several patterns. The pattern is chosen randomly.',
  sampleResults: [
    'Kirstin39',
    'Kirstin.Smith',
    'Kirstin.Smith39',
    'KirstinSmith',
    'KirstinSmith39'
  ],
  properties: {
    firstName: {
      type: 'string',
      required: false,
      description: 'The first name of the user'
    },
    lastName: {
      type: 'string',
      required: false,
      description: 'The last name of the user'
    }
  }
};

/**
 * email
 *
 * @method email
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} provider
 */
export function email(firstName?: string, lastName?: string, provider?: string): string {
  provider = provider || arrayElement(getStringArray('internet.free_email'));
  return slugify(userName(firstName, lastName)) + '@' + provider;
}

email.schema = {
  description: 'Generates a valid email address based on optional input criteria',
  sampleResults: ['foo.bar@gmail.com'],
  properties: {
    firstName: {
      type: 'string',
      required: false,
      description: 'The first name of the user'
    },
    lastName: {
      type: 'string',
      required: false,
      description: 'The last name of the user'
    },
    provider: {
      type: 'string',
      required: false,
      description: 'The domain of the user'
    }
  }
};
/**
 * exampleEmail
 *
 * @method exampleEmail
 * @param {string} firstName
 * @param {string} lastName
 */
export function exampleEmail(firstName?: string, lastName?: string): string {
  const provider: string = arrayElement(getStringArray('internet.example_email'));
  return email(firstName, lastName, provider);
}

/**
 * protocol
 *
 * @method protocol
 */
export function protocol(): string {
  const protocols = ['http', 'https'];
  return arrayElement(protocols);
}

protocol.schema = {
  description: 'Randomly generates http or https',
  sampleResults: ['https', 'http']
};

/**
 * domainSuffix
 *
 * @method domainSuffix
 */
export function domainSuffix(): string {
  return arrayElement(getStringArray('internet.domain_suffix'));
}

domainSuffix.schema = {
  description: 'Generates a random domain suffix.',
  sampleResults: ['net']
};

/**
 * domainWord
 *
 * @method domainWord
 */
export function domainWord(): string {
  return randomFirstName()
    .replace(/([\\~#&*{}/:<>?|\"'])/gi, '')
    .toLowerCase();
}

domainWord.schema = {
  description: 'Generates a random domain word.',
  sampleResults: ['alyce']
};

/**
 * domainName
 *
 * @method domainName
 */
export function domainName(): string {
  return domainWord() + '.' + domainSuffix();
}

domainName.schema = {
  description: 'Generates a random domain name.',
  sampleResults: ['marvin.org']
};

/**
 * url
 *
 * @method url
 */
export function url(): string {
  return protocol() + '://' + domainName();
}

url.schema = {
  description: 'Generates a random URL. The URL could be secure or insecure.',
  sampleResults: ['http://rashawn.name', 'https://rashawn.name']
};

/**
 * ip
 *
 * @method ip
 */
export function ip(): string {
  const randNum = function(): string {
    return number(255).toFixed(0);
  };

  const result = [];
  for (let i = 0; i < 4; i++) {
    result[i] = randNum();
  }

  return result.join('.');
}

ip.schema = {
  description: 'Generates a random IP.',
  sampleResults: ['97.238.241.11']
};

/**
 * ipv6
 *
 * @method ipv6
 */
export function ipv6(): string {
  const randHash = function(): string {
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += arrayElement([
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f'
      ]);
    }
    return result;
  };

  const result = [];
  for (let i = 0; i < 8; i++) {
    result[i] = randHash();
  }
  return result.join(':');
}

ipv6.schema = {
  description: 'Generates a random IPv6 address.',
  sampleResults: ['2001:0db8:6276:b1a7:5213:22f1:25df:c8a0']
};

/**
 * userAgent
 *
 * @method userAgent
 */
export function userAgent(): string {
  return random_ua.generate();
}

userAgent.schema = {
  description: 'Generates a random user agent.',
  sampleResults: [
    'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_7_5 rv:6.0; SL) AppleWebKit/532.0.1 (KHTML, like Gecko) Version/7.1.6 Safari/532.0.1'
  ]
};

/**
 * color
 *
 * @method color
 * @param {number} baseRed255
 * @param {number} baseGreen255
 * @param {number} baseBlue255
 */
export function color(baseRed255 = 0, baseGreen255 = 0, baseBlue255 = 0): string {
  // based on awesome response : http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
  const red = Math.floor((number(256) + baseRed255) / 2);
  const green = Math.floor((number(256) + baseGreen255) / 2);
  const blue = Math.floor((number(256) + baseBlue255) / 2);
  const redStr = red.toString(16);
  const greenStr = green.toString(16);
  const blueStr = blue.toString(16);
  return (
    '#' +
    (redStr.length === 1 ? '0' : '') +
    redStr +
    (greenStr.length === 1 ? '0' : '') +
    greenStr +
    (blueStr.length === 1 ? '0' : '') +
    blueStr
  );
}

color.schema = {
  description: 'Generates a random hexadecimal color.',
  sampleResults: ['#06267f'],
  properties: {
    baseRed255: {
      type: 'number',
      required: false,
      description: 'The red value. Valid values are 0 - 255.'
    },
    baseGreen255: {
      type: 'number',
      required: false,
      description: 'The green value. Valid values are 0 - 255.'
    },
    baseBlue255: {
      type: 'number',
      required: false,
      description: 'The blue value. Valid values are 0 - 255.'
    }
  }
};

/**
 * mac
 *
 * @method mac
 * @param {string} sep
 */
export function mac(sep: string): string {
  let i,
    mac = '',
    validSep = ':';

  // if the client passed in a different separator than `:`,
  // we will use it if it is in the list of acceptable separators (dash or no separator)
  if (['-', ''].indexOf(sep) !== -1) {
    validSep = sep;
  }

  for (i = 0; i < 12; i++) {
    mac += number(15).toString(16);
    if (i % 2 == 1 && i != 11) {
      mac += validSep;
    }
  }
  return mac;
}

mac.schema = {
  description: 'Generates a random mac address.',
  sampleResults: ['78:06:cc:ae:b3:81']
};

/**
 * password
 *
 * @method password
 * @param {number} len
 * @param {boolean} memorable
 * @param {string} pattern
 * @param {string} prefix
 */
export function password(
  len = 15,
  memorable = false,
  pattern: string | RegExp,
  prefix: string
): string {
  /*
   * password-generator ( function )
   * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
   * MIT Licensed
   */
  const vowel = /[aeiouAEIOU]$/;
  const consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
  function _password(
    length: number,
    memorable: boolean,
    pattern: string | RegExp,
    prefix: string
  ): string {
    let char;
    if (length == null) {
      length = 10;
    }
    if (memorable == null) {
      memorable = true;
    }
    if (pattern == null) {
      pattern = /\w/;
    }
    if (prefix == null) {
      prefix = '';
    }
    if (prefix.length >= length) {
      return prefix;
    }
    if (memorable) {
      if (prefix.match(consonant)) {
        pattern = vowel;
      } else {
        pattern = consonant;
      }
    }
    const n = number(94) + 33;
    char = String.fromCharCode(n);
    if (memorable) {
      char = char.toLowerCase();
    }
    if (!char.match(pattern)) {
      return _password(length, memorable, pattern, prefix);
    }
    return _password(length, memorable, pattern, '' + prefix + char);
  }
  return _password(len, memorable, pattern, prefix);
}

password.schema = {
  description: 'Generates a random password.',
  sampleResults: ['AM7zl6Mg', 'susejofe'],
  properties: {
    length: {
      type: 'number',
      required: false,
      description: 'The number of characters in the password.'
    },
    memorable: {
      type: 'boolean',
      required: false,
      description: 'Whether a password should be easy to remember.'
    },
    pattern: {
      type: 'regex',
      required: false,
      description:
        'A regex to match each character of the password against. This parameter will be negated if the memorable setting is turned on.'
    },
    prefix: {
      type: 'string',
      required: false,
      description:
        'A value to prepend to the generated password. The prefix counts towards the length of the password.'
    }
  }
};

export default {
  avatar,
  color,
  domainName,
  domainSuffix,
  domainWord,
  email,
  exampleEmail,
  ip,
  ipv6,
  mac,
  password,
  protocol,
  url,
  userAgent,
  userName
};
