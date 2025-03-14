/**
 * Parses a hex code string into its numeric color values
 * @param {string} hex                                          The hex code string
 * @returns {{red: number, green: number, blue: number} | null} An object with the numeric color values
 */
export function parseHexColors(hex: string): {
    red: number;
    green: number;
    blue: number;
} | null;
/**
 * Normalizes a hex value into a 6 digit representation
 * @param {string} hex      The hex value
 * @returns {string | null} The normalized hex value, including a leading #
 */
export function normalizeHexValue(hex: string): string | null;
/**
 * Generates a list of hex colors for a given range
 * @param {string} start      The starting color for the range
 * @param {end} end           The ending color for the range
 * @param {number} count      The number of colors to generate in between the start/end colors
 * @returns {string[] | null} The hex color range ordered from start to end
 */
export function generateHexColors(start: string, end: any, count: number): string[] | null;
//# sourceMappingURL=index.d.ts.map