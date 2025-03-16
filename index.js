const hexRegex = '^([a-fA-f0-9]{3,4}){1,2}$';

const getFullHex = (hex) => {
  if (hex.length === 6 || hex.length === 8) {
    return `#${hex}`;
  }

  return hex.split('').reduce((result, char) => {
    result += char.concat(char);
    return result;
  }, '#');
};

const generateHexCode = (r, g, b, a) => {
  let result =
    `${r.toString(16).padStart(2, '0')}` +
    `${g.toString(16).padStart(2, '0')}` +
    `${b.toString(16).padStart(2, '0')}`;

  if (a > -1) {
    result += `${a.toString(16).padStart(2, '0')}`;
  }

  return getFullHex(result);
};

const getStep = (end, start, count) => (end - start) / (count + 1);

const getColor = (startColor, step, count) => {
  return Math.round(startColor + step * (count + 1));
};

const getRandomValue = () => {
  return Math.floor(Math.random() * 256);
};

/**
 * Parses a hex code string into its numeric color/alpha values
 * @param {string} hex                                                          The hex code string
 * @returns {{red: number, green: number, blue: number, alpha: number} | null}  An object with the numeric color/alpha values
 */
const parseHexColors = (hex) => {
  const normalizedHex = normalizeHexValue(hex);
  if (!normalizedHex) {
    return null;
  }

  const numString = normalizedHex.replaceAll('#', '');
  const red = parseInt(numString.slice(0, 2), 16);
  const green = parseInt(numString.slice(2, 4), 16);
  const blue = parseInt(numString.slice(4, 6), 16);

  let alpha = 255;
  const alphaString = numString.slice(6, 8);
  if (alphaString !== '') {
    alpha = parseInt(alphaString, 16);
  }

  return {
    red,
    green,
    blue,
    alpha,
  };
};

/**
 * Normalizes a hex value into a 6/8 digit representation
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
 * @param {string} end           The ending color for the range
 * @param {number} count      The number of colors to generate in between the start/end colors
 * @param {bool} includeAlpha Whether to include alpha values for the hex codes, defaults to false
 * @returns {string[] | null} The hex color range ordered from start to end
 */
const generateHexColors = (start, end, count, includeAlpha = false) => {
  const startColor = parseHexColors(start);
  const endColor = parseHexColors(end);

  if (!startColor || !endColor) {
    return null;
  }

  // Prevent negative counts
  const normalizedCount = Math.max(0, typeof count !== 'number' ? 0 : count);

  if (normalizedCount === 0) {
    return [
      generateHexCode(
        startColor.red,
        startColor.green,
        startColor.blue,
        !includeAlpha ? -1 : startColor.alpha
      ),
      generateHexCode(
        endColor.red,
        endColor.green,
        endColor.blue,
        !includeAlpha ? -1 : endColor.alpha
      ),
    ];
  }

  const redStep = getStep(endColor.red, startColor.red, normalizedCount);
  const greenStep = getStep(endColor.green, startColor.green, normalizedCount);
  const blueStep = getStep(endColor.blue, startColor.blue, normalizedCount);
  const alphaStep = getStep(endColor.alpha, startColor.alpha, normalizedCount);

  let generated = new Array(normalizedCount);
  for (let i = 0; i < normalizedCount; i++) {
    generated[i] = generateHexCode(
      getColor(startColor.red, redStep, i),
      getColor(startColor.green, greenStep, i),
      getColor(startColor.blue, blueStep, i),
      !includeAlpha ? -1 : getColor(startColor.alpha, alphaStep, i)
    );
  }

  return [
    generateHexCode(
      startColor.red,
      startColor.green,
      startColor.blue,
      !includeAlpha ? -1 : startColor.alpha
    ),
    ...generated,
    generateHexCode(
      endColor.red,
      endColor.green,
      endColor.blue,
      !includeAlpha ? -1 : endColor.alpha
    ),
  ];
};

/**
 * Generates a random hex color string
 * @param {bool} includeAlpha Whether to include the alpha value, defaults to false
 * @returns {string}          The hex color string
 */
const generateRandomHexColor = (includeAlpha = false) => {
  return generateHexCode(
    getRandomValue(),
    getRandomValue(),
    getRandomValue(),
    !includeAlpha ? -1 : getRandomValue()
  );
};

export {
  parseHexColors,
  normalizeHexValue,
  generateHexColors,
  generateRandomHexColor,
};
