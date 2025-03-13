const hexRegex = '^([a-fA-f0-9]{3}){1,2}$';

const getFullHex = (hex) => {
  if (hex.length === 6) {
    return `#${hex}`;
  }

  return hex.split('').reduce((result, char) => {
    result += char.concat(char);
    return result;
  }, '#');
};

const generateHexCode = (r, g, b) =>
  getFullHex(`${r.toString(16)}${g.toString(16)}${b.toString(16)}`);

/**
 * Parses a hex code string into its numeric color values
 * @param {string} hex                                          The hex code string
 * @returns {{red: number, green: number, blue: number} | null} An object with the numeric color values
 */
const parseHexColors = (hex) => {
  const normalizedHex = normalizeHexValue(hex);
  if (!normalizedHex) {
    return null;
  }

  const numString = normalizedHex.replaceAll('#', '');
  return {
    red: parseInt(numString.slice(0, 2), 16),
    green: parseInt(numString.slice(2, 4), 16),
    blue: parseInt(numString.slice(4), 16),
  };
};

const getStep = (end, start, count) => {
  const step = (end - start) / (count + 1);
  return step < 0 ? Math.ceil(step) : Math.floor(step);
};

/**
 * Normalizes a hex value into a 6 digit representation
 * @param {string} hex      The hex value
 * @returns {string | null} The normalized hex value, including a leading #
 */
const normalizeHexValue = (hex) => {
  if (!hex || typeof hex !== 'string') {
    return null;
  }

  let cleanedHex = hex.replaceAll('#', '').replaceAll(' ', '').trim();
  if (cleanedHex.match(hexRegex)) {
    return getFullHex(cleanedHex);
  }

  return null;
};

/**
 * Generates a list of hex colors for a given range
 * @param {string} start      The starting color for the range
 * @param {end} end           The ending color for the range
 * @param {number} count      The number of colors to generate in between the start/end colors
 * @returns {string[] | null} The hex color range ordered from start to end
 */
const generateHexColors = (start, end, count) => {
  const startColor = parseHexColors(start);
  const endColor = parseHexColors(end);

  if (!startColor || !endColor) {
    return null;
  }

  // Clamp 0-255 to prevent overflow
  const normalizedCount = Math.max(
    0,
    Math.min(255, typeof count !== 'number' ? 0 : count)
  );

  const redStep = getStep(endColor.red, startColor.red, normalizedCount);
  const greenStep = getStep(endColor.green, startColor.green, normalizedCount);
  const blueStep = getStep(endColor.blue, startColor.blue, normalizedCount);

  let generated = new Array(normalizedCount);
  for (let i = 0; i < normalizedCount; i++) {
    generated[i] = generateHexCode(
      startColor.red + redStep * (i + 1),
      startColor.green + greenStep * (i + 1),
      startColor.blue + blueStep * (i + 1)
    );
  }

  return [
    generateHexCode(startColor.red, startColor.green, startColor.blue),
    ...generated,
    generateHexCode(endColor.red, endColor.green, endColor.blue),
  ];
};

export { parseHexColors, normalizeHexValue, generateHexColors };
