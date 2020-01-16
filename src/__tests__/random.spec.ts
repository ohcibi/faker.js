import { number } from '../random';

describe('function: number', () => {
  const anyNumber = expect.any(Number);

  test('returns a number with no arguments', () => {
    expect(number()).toEqual(anyNumber);
  });

  test('returns a number with an integer as argument', () => {
    expect(number(100)).toEqual(anyNumber);
  });

  test('returns a number with an object as argument', () => {
    expect(number({ min: 10, max: 1000 })).toEqual(anyNumber);
  });
});
