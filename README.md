# Tooltips for Chartist
[![Build Status](https://github.com/LukBukkit/chartist-plugin-tooltip/actions/workflows/nodejs.yml/badge.svg)](https://github.com/LukBukkit/chartist-plugin-tooltip/actions/workflows/nodejs.yml)[![npm](https://img.shields.io/npm/v/chartist-plugin-tooltips-updated.svg)](https://www.npmjs.com/package/chartist-plugin-tooltips-updated)

This plugin provides quick and easy tooltips for your [Chartist](https://github.com/chartist-js/chartist#readme) charts.
It's published on npm as [chartist-plugin-tooltips-updated](https://www.npmjs.com/package/chartist-plugin-tooltips-updated).

## Available options and their defaults

* **tooltipOffset**: `{ x: number, y: number }`

  Tooltip offset in px. Default: `{ x: 0, y: -20 }`

* **anchorToPoint**: `boolean`

  If set true, the tooltips will not follow mouse movement and be anchored to the target point or bar.
  Default: `false`

* **appendToBody**: `boolean`

  Append tooltip container to body.
  If not, the tooltip element will be added to the chart container.
  Default: `true`

* **class**: `string | string[]`

  Add custom class(es) to the tooltip.
  Can be a single class `"my-class"` or a list `["class-1", "class-2"]`.

* **pointClass**: `string`

  Custom point class to append tooltips to.
  If none is specified, the default class will be used depending on the chart type (e.g. "ct-point" for line charts).

* **tooltipFnc**: `(meta: string, value: string) => string`

  Custom function to generate tooltip (entire HTML markup).

* **transformTooltipTextFnc**: `(value: string) => string`

  Custom function to generate tooltip text (content only).

* **metaIsHTML**: `boolean`

  Should the meta content be parsed as HTML (`true`) or plain text (`false`, default).


## Sample usage in Chartist.js

### 1. Install the plugin

`yarn add chartist-plugin-tooltips-updated`

### 2. Include JS

Include the JavaScript script file of the plugin either using one of two options:

1. Include it using a `<script>` tag:
```html
<html>
  <head>
  <script src="node_modules/chartist/dist/index.umd.js"></script>
  <script src="node_modules/chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.umd.min.js"></script>

  <script>
    var chart = new Chartist.LineChart(
      '#chart',
      data,
      {
        plugins: [ ChartistPluginTooltip ]
      }
    );
</script>
  </head>
  <body>
  <div id="chart"></div>
  </body>
</html>
```

2. or via imports as ES module:
```js
import { LineChart } from 'chartist';
import { ChartistPluginTooltip } from 'chartist-plugin-tooltips';

const chart = new LineChart(
  '.ct-chart',
  data,
  {
    plugins: [ ChartistPluginTooltip ]
  }
);
```
### 3. Include CSS

1. in the `<head>` of your HTML file
```html
<link rel="stylesheet" href="node_modules/chartist/dist/index.css">
<link rel="stylesheet" href="node_modules/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css">
```
2. as [Webpack](https://webpack.js.org/loaders/style-loader/) CSS imports
```js
import 'chartist/dist/index.css';
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css';
```

### 4. Configure Labels

Without a descriptive text:
```js
var chart = new Chartist.LineChart('.ct-chart', {
  labels: [1, 2, 3, 4, 5, 6, 7],
  series: [
    [1, 5, 3, 4, 6, 2, 3],
    [2, 4, 2, 5, 4, 3, 6]
  ]
}, {
  plugins: [
    ChartistPluginTooltip
  ]
});
```

With a descriptive text:
```js
var chart = new LineChart('.ct-chart', {
  labels: [1, 2, 3],
  series: [
    [
      {meta: 'description', value: 1},
      {meta: 'description', value: 5},
      {meta: 'description', value: 3}
    ],
    [
      {meta: 'other description', value: 2},
      {meta: 'other description', value: 4},
      {meta: 'other description', value: 2}
    ]
  ]
}, {
  plugins: [
    ChartistPluginTooltip
  ]
});
```

With a custom formatted descriptive text:
```js
var chart = new LineChart('.ct-chart', {
  labels: [1, 2, 3],
  series: [
    [
      {meta: 'description', value: 1},
      {meta: 'description', value: 5},
      {meta: 'description', value: 3}
    ],
    [
      {meta: 'other description', value: 2},
      {meta: 'other description', value: 4},
      {meta: 'other description', value: 2}
    ]
  ]
}, {
  plugins: [
    [
      ChartistPluginTooltip,
      {
        currency: '$',
        class: 'class1 class2',
        appendToBody: true
      }
    ]
  ]
});
```

If you change the CSS properties of the tooltip, you shouldn't change the `display` property,
otherwise the tooltip may be incorrectly positioned.

## Custom Point Element

This guide is a bit outdated and may not work with new versions of the plugin.

In Chartist, you can replace the default point element with a custom element.
There is a pretty [demo](https://gionkunz.github.io/chartist-js/examples.html#example-line-modify-drawing)
which uses events to replace the default point graphics.
If you want the tooltip to work fine with a new element, you need to include two more properties to your custom element:

```javascript
'ct:value': data.value.y,
'ct:meta': data.meta,
```

And you have to add the following CSS rule to the new element by using the `style` option
or by adding this rule to your css class:

```css
pointer-events: all!important;
```

(If you want to read more about, why you have to add this css rule take a look at [chartist-plugin-tooltip#72](https://github.com/tmmdata/chartist-plugin-tooltip/pull/72))

So the final code could look like this. Here is a [live demo](https://jsfiddle.net/9gzqnrd8/9/)
```javascript
chart.on('draw', function(data) {
  // If the draw event was triggered from drawing a point on the line chart
  if (data.type === 'point') {
    // We are creating a new path SVG element that draws a triangle around the point coordinates

    var circle = new Chartist.Svg('circle', {
      cx: [data.x],
      cy: [data.y],
      r: [5],
      'ct:value': data.value.y,
      'ct:meta': data.meta,
      style: 'pointer-events: all !important',
      class: 'my-cool-point',
    }, 'ct-area');

    // With data.element we get the Chartist SVG wrapper and we can replace the original point drawn by Chartist with our newly created triangle
    data.element.replace(circle);
  }
});
```

```javascript
plugins: [
  [
    ChartistPluginTooltip,
    {
      appendToBody: true,
      pointClass: 'my-cool-point'
    }
  ]
]
```

## Why this fork?
This repository is a fork of [tmmdata/chartist-plugin-tooltip](https://github.com/tmmdata/chartist-plugin-tooltip).
(Thanks for the great work!)

It seems as this repository is no longer maintained,
that's why I decided to fork it and include several pull requests and update the dependencies.

#### Included Pull Requests

* [#87 Document new meta options](https://github.com/tmmdata/chartist-plugin-tooltip/pull/87) from meisanerd
* [#131 (feature) add chartist-plugin-tooltip.scss to dist folder](https://github.com/tmmdata/chartist-plugin-tooltip/pull/131) from Zadvornyi
* [#136 Fix issue checking chart type when uglified](https://github.com/tmmdata/chartist-plugin-tooltip/pull/136) from jkowens
* [#128 Fixes width/height being incorrect](https://github.com/tmmdata/chartist-plugin-tooltip/pull/128) from jdoyle65
* [#160 Fixed memory leak](https://github.com/tmmdata/chartist-plugin-tooltip/pull/160) from callanto
* [#173 Adding support for SOLID donut graphs](https://github.com/tmmdata/chartist-plugin-tooltip/pull/173) from AlexLaforge
* [#9 Add support to IE11](https://github.com/LukBukkit/chartist-plugin-tooltip/pull/9) from Borrajo
* [#20 Support for Chartist v1](https://github.com/LukBukkit/chartist-plugin-tooltip/pull/20) from stklcode

#### More new exciting stuff
* Upgrade to Yarn
* Up-to-date dependencies
* Latest version published on npm
