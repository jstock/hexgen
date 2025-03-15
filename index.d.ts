/**
 * Parses a hex code string into its numeric color/alpha values
 * @param {string} hex                                                          The hex code string
 * @returns {{red: number, green: number, blue: number, alpha: number} | null}  An object with the numeric color/alpha values
 */
export function parseHexColors(hex: string): {
    red: number;
    green: number;
    blue: number;
    alpha: number;
} | null;
/**
 * Normalizes a hex value into a 6/8 digit representation
 * @param {string} hex      The hex value
 * @returns {string | null} The normalized hex value, including a leading #
 */
export function normalizeHexValue(hex: string): string | null;
/**
 * Generates a list of hex colors for a given range
 * @param {string} start      The starting color for the range
 * @param {string} end           The ending color for the range
 * @param {number} count      The number of colors to generate in between the start/end colors
 * @param {bool} includeAlpha Whether to include alpha values for the hex codes, defaults to false
 * @returns {string[] | null} The hex color range ordered from start to end
 */
export function generateHexColors(start: string, end: string, count: number, includeAlpha?: bool): string[] | null;
//# sourceMappingURL=index.d.ts.map