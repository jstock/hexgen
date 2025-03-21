import {
  generateHexColors,
  generateRandomHexColor,
  normalizeHexValue,
  parseHexColors,
} from '.';

const invalidHexCodes = [null, undefined, '', '  ', 42, 'ff', '#xxx'];

describe('index', () => {
  describe('parseHexColors', () => {
    test.each([...invalidHexCodes])('handles invalid hex codes', (hex) => {
      const result = parseHexColors(hex);
      expect(result).toBeNull();
    });

    test('parses color/alpha values', () => {
      const hexCode = '#01020304';
      const result = parseHexColors(hexCode);

      expect(result).not.toBeNull();
      expect(result.red).toEqual(1);
      expect(result.green).toEqual(2);
      expect(result.blue).toEqual(3);
      expect(result.alpha).toEqual(4);
    });

    test('defaults alpha to 255', () => {
      const hexCode = '#000';
      const result = parseHexColors(hexCode);

      expect(result).not.toBeNull();
      expect(result.alpha).toEqual(255);
    });
  });

  describe('normalizeHexValue', () => {
    test.each([...invalidHexCodes])('handles invalid hex codes', (hex) => {
      const result = normalizeHexValue(hex);
      expect(result).toBeNull();
    });

    test('handles no leading hash', () => {
      const result = normalizeHexValue('abcdef');
      expect(result).toEqual('#abcdef');
    });

    test('strips all hashes', () => {
      const result = normalizeHexValue('#a#b#c#d#e#f#');
      expect(result).toEqual('#abcdef');
    });

    test('strips all whitespace', () => {
      const result = normalizeHexValue(' # a b c d e f ');
      expect(result).toEqual('#abcdef');
    });

    test('handles 3-length hex codes', () => {
      const result = normalizeHexValue('#abc');
      expect(result).toEqual('#aabbcc');
    });

    test('handles 4-length hex codes', () => {
      const result = normalizeHexValue('#abcd');
      expect(result).toEqual('#aabbccdd');
    });
  });

  describe('generateHexColors', () => {
    test.each([
      [false, true, true],
      [true, false, true],
      [true, true, false],
    ])('handles invalid hex colors', (validStart, validEnd, shouldBeNull) => {
      const result = generateHexColors(
        validStart ? '#fff' : invalidHexCodes[0],
        validEnd ? '#000' : invalidHexCodes[0],
        0
      );

      if (shouldBeNull) {
        expect(result).toBeNull();
      } else {
        expect(result).not.toBeNull();
      }
    });

    test('handles invalid count', () => {
      const result = generateHexColors('#000', '#fff', 'badcount');
      expect(result).toEqual(['#000000', '#ffffff']);
    });

    test('handles negative count', () => {
      const result = generateHexColors('#000', '#fff', -1);
      expect(result).toEqual(['#000000', '#ffffff']);
    });

    test('works with ascending values', () => {
      const result = generateHexColors('#aaa', '#ccc', 1);
      expect(result).toEqual(['#aaaaaa', '#bbbbbb', '#cccccc']);
    });

    test('works with descending values', () => {
      const result = generateHexColors('#ccc', '#aaa', 1);
      expect(result).toEqual(['#cccccc', '#bbbbbb', '#aaaaaa']);
    });

    test('handles partial color steps', () => {
      const result = generateHexColors('#000000', '#010101', 2);
      expect(result).toEqual(['#000000', '#000000', '#010101', '#010101']);
    });

    test('defaults to exclude alpha values', () => {
      const result = generateHexColors('#00000000', '#ffffffff', 0);
      expect(result).toEqual(['#000000', '#ffffff']);
    });

    test('generates alpha values for no range', () => {
      const result = generateHexColors('#aaa', '#ccc', 0, true);
      expect(result).toEqual(['#aaaaaaff', '#ccccccff']);
    });

    test('generates alpha values', () => {
      const result = generateHexColors('#aaaa', '#cccc', 1, true);
      expect(result).toEqual(['#aaaaaaaa', '#bbbbbbbb', '#cccccccc']);
    });
  });

  describe('generateRandomHexColor', () => {
    test('defaults to 6 digit hex', () => {
      const result = generateRandomHexColor();
      expect(result.length).toEqual(7);
    });

    test('supports 8 digit hex', () => {
      const result = generateRandomHexColor(true);
      expect(result.length).toEqual(9);
    });
  });
});
