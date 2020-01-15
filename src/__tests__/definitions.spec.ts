import { addLocale, getDefinition, setCurrentLocale } from '../definitions';

describe('Definitions', () => {
  describe('with "en" and "de" locale installed', () => {
    beforeEach(() => {
      addLocale('en', {
        foo: { bar: 'baz', biz: 'boz' }
      });

      addLocale('de', {
        foo: { bar: 'bass' }
      });

      setCurrentLocale();
    });

    describe('getDefinition()', () => {
      test('have a default locale of en', () => {
        expect(getDefinition('foo.bar')).toEqual('baz');
      });

      test('returns other locale if it was set', () => {
        setCurrentLocale('de');
        expect(getDefinition('foo.bar')).toEqual('bass');
      });

      test('takes a default value as  second argument', () => {
        expect(getDefinition('bogus.bogus', 'my default')).toEqual('my default');
      });

      test('throw an error when a non existent key is requested', () => {
        expect(() => getDefinition('bogus.bogus')).toThrow(
          /Key 'bogus.bogus' not found in locale 'en'. Try installing a locale that defines this key./
        );
      });

      test('throw an error when a non existent locale is requested', () => {
        expect(() => {
          setCurrentLocale('ch');
          getDefinition('foo.bar');
        }).toThrow(
          /Key 'foo.bar' not found in locale 'ch'. Try installing a locale that defines this key./
        );
      });
    });
  });
});
