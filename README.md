# hexgen

A simple tool for generating hex code color ranges. This package is [hosted on npm](https://www.npmjs.com/package/@jstock/hexgen), so you can import into your project with your package manager of choice.

# Usage

## generateHexColors()

```ts
function generateHexColors(start, end, count, includeAlpha): string[];
```

Generates a list of hex colors for a given range

### Parameters

| Parameter      | Type     | Default value | Description                                                          |
| -------------- | -------- | ------------- | -------------------------------------------------------------------- |
| `start`        | `string` | `undefined`   | The starting color for the range                                     |
| `end`          | `string` | `undefined`   | The ending color for the range                                       |
| `count`        | `number` | `undefined`   | The number of colors to generate in between the start/end colors     |
| `includeAlpha` | `bool`   | `false`       | Whether to include alpha values for the hex codes, defaults to false |

### Returns

`string`[]

The hex color range ordered from start to end

---

## normalizeHexValue()

```ts
function normalizeHexValue(hex): string;
```

Normalizes a hex value into a 6/8 digit representation

### Parameters

| Parameter | Type     | Description   |
| --------- | -------- | ------------- |
| `hex`     | `string` | The hex value |

### Returns

`string`

The normalized hex value, including a leading #

---

## parseHexColors()

```ts
function parseHexColors(hex): object;
```

Parses a hex code string into its numeric color/alpha values

### Parameters

| Parameter | Type     | Description         |
| --------- | -------- | ------------------- |
| `hex`     | `string` | The hex code string |

### Returns

`object`

An object with the numeric color/alpha values

| Name    | Type     |
| ------- | -------- |
| `alpha` | `number` |
| `blue`  | `number` |
| `green` | `number` |
| `red`   | `number` |
