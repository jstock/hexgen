#!/usr/bin/env node
import { Command } from 'commander';
import { generateHexColors, normalizeHexValue } from '../index.js';

let start;
let end;
let countArg;

const program = new Command();

program
  .name('hexgen')
  .usage('<start-hex> <end-hex> <count> [options]')
  .argument(
    '<start-hex>',
    'starting hex string for the color range',
    (value, prev) => normalizeHexValue(value) // eslint-disable-line no-unused-vars
  )
  .argument(
    '<end-hex>',
    'ending hex string for the color range',
    (value, prev) => normalizeHexValue(value) // eslint-disable-line no-unused-vars
  )
  .argument(
    '<count>',
    'number of hex values to generate for the color range',
    (value, prev) => parseInt(value, 10) // eslint-disable-line no-unused-vars
  )
  .action((startHex, endHex, count) => {
    start = startHex;
    end = endHex;
    countArg = count;
  })
  .parse(process.argv);

let isValid = true;
if (start === null) {
  console.error('<start-hex> does not have a valid hex code');
  isValid = false;
}

if (end === null) {
  console.error('<end-hex> does not have a valid hex code');
  isValid = false;
}

if (countArg < 0) {
  console.error('<count> must be at least 0');
  isValid = false;
}

if (!isValid) {
  process.exit(1);
}

const hexValues = generateHexColors(start, end, countArg);

console.log(JSON.stringify(hexValues, null));
