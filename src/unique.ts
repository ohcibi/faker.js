/**
 *
 * @module unique
 */

interface UniqueOpts {
  startTime?: number;
  maxTime?: number;
  maxRetries?: number;
  currentIterations?: number;
  exclude?: string | string[];
  compare?<T>(a: T, b: keyof T): number;
}

// global results store
// currently uniqueness is global to entire faker instance
// this means that faker should currently *never* return duplicate values across all API methods when using `Faker.unique`
// it's possible in the future that some users may want to scope found per function call instead of faker instance
const found: { [k: string]: string } = {};

// current iteration or retries of unique.exec ( current loop depth )
const currentIterations = 0;

// uniqueness compare function
// default behavior is to check value as key against object hash
function defaultCompare<T>(obj: T, key: keyof T): number {
  if (typeof obj[key] === 'undefined') {
    return -1;
  }
  return 0;
}

const _unique = {
  errorMessage(now: number, code: string, opts: UniqueOpts): void {
    console.error('error', code);
    console.log(
      'found',
      Object.keys(found).length,
      'unique entries before throwing error. \nretried:',
      currentIterations,
      '\ntotal time:',
      now - (opts.startTime || 0),
      'ms'
    );
    throw new Error(
      code +
        ' for uniqueness check \n\nMay not be able to generate any more unique values with current settings. \nTry adjusting maxTime or maxRetries parameters for faker.unique()'
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exec(method: Function, args: any[], opts: UniqueOpts = {}): string {
    const now = new Date().getTime();

    opts.maxTime = opts.maxTime || 3;
    opts.maxRetries = opts.maxRetries || 50;
    opts.exclude = opts.exclude || [];
    opts.compare = opts.compare || defaultCompare;

    if (typeof opts.currentIterations !== 'number') {
      opts.currentIterations = 0;
    }

    if (typeof opts.startTime === 'undefined') {
      opts.startTime = new Date().getTime();
    }

    const startTime = opts.startTime;

    // support single exclude argument as string
    if (typeof opts.exclude === 'string') {
      opts.exclude = [opts.exclude];
    }

    if (opts.currentIterations > 0) {
      // console.log('iterating', currentIterations)
    }

    // console.log(now - startTime)
    if (now - startTime >= opts.maxTime) {
      _unique.errorMessage(now, 'Exceeded maxTime:' + opts.maxTime, opts);
      return '';
    }

    if (opts.currentIterations >= opts.maxRetries) {
      _unique.errorMessage(now, 'Exceeded maxRetries:' + opts.maxRetries, opts);
      return '';
    }

    // execute the provided method to find a potential satifised value
    const result = method.apply(this, args);

    // if the result has not been previously found, add it to the found array and return the value as it's unique
    if (opts.compare(found, result) === -1 && opts.exclude.indexOf(result) === -1) {
      found[result] = result;
      opts.currentIterations = 0;
      return result;
    } else {
      opts.currentIterations++;
      return _unique.exec(method, args, opts);
    }
  }
};

/**
 * unique
 *
 * @method unique
 */
export function unique(
  method: Function,
  args: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
  opts: {
    startTime?: number;
    maxTime?: number;
    maxRetries?: number;
    currentIterations?: number;
  } = { maxTime: 10, maxRetries: 10 }
): string {
  opts.startTime = new Date().getTime();
  opts.currentIterations = 0;
  return _unique.exec(method, args, opts);
}

export default {
  unique
};
