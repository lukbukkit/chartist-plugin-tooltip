# Tooltips for Chartist
[![npm](https://img.shields.io/npm/v/chartist-plugin-tooltips-updated.svg)](https://www.npmjs.com/package/chartist-plugin-tooltips-updated)

This plugin provides quick and easy tooltips for your [Chartist](https://github.com/chartist-js/chartist#readme) charts.
It's published on npm as [chartist-plugin-tooltips-updated](https://www.npmjs.com/package/chartist-plugin-tooltips-updated).

⚠️ This package is deprecated and will no longer receive updates, including bug fixes or new features.
If you require tooltips, I recommend switching to another charting library.

## Configuration Options

The following options can be configured when the plugin is loaded.
Their default values are as shown.

```javascript
var defaultOptions = {
  currency: undefined, // Accepts '£', '$', '€', etc.
  // Append curreny information e.g. 4000 => €4,000

  tooltipFnc: undefined, // Accepts function
  // Build custom tooltip

  transformTooltipTextFnc: undefined, // Accepts function
  // Transform tooltip text

  class: undefined, // Accecpts 'class1', 'class1 class2', etc.
  // Adds class(es) to the tooltip wrapper

  anchorToPoint: false, // Accepts true or false
  // Tooltips do not follow mouse movement -- they are anchored to the point / bar.

  appendToBody: true, // Accepts true or false
  // Appends tooltips to body instead of chart container,

  metaIsHTML: false // Accepts true or false
  // Whether to parse the meta value as HTML or plain text
};
```

## Sample Usage

### 1. Install the plugin

`yarn add chartist-plugin-tooltips-updated`

### 2. Include JS

Include the JavaScript script file of the plugin either using one of two options:

1. Include it using a `<script>` tag:
```html
<script src="node_modules/chartist/dist/index.umd.js"></script>
<script src="node_modules/chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.min.js"></script>

<script>
  var chart = new Chartist.LineChart('.ct-chart', data, {
    plugins: [
      Chartist.plugins.tooltip()
    ]
  });
</script>

```

2. Include it using an import:
```js
import { LineChart } from 'chartist';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';

let chart = new LineChart('.ct-chart', data, {
  plugins: [
    ChartistTooltip()
  ]
});
```

Warning: The version 0.0.17 of the original package available on npm included a `s` suffix for the `tooltip` function
which now has been removed,
see the [related commit](https://github.com/tmmdata/chartist-plugin-tooltip/commit/c476a2dd255134241e4238f562ac3cb8b617bc79).

### 3. Include CSS
Include the two CSS files in your project:
- `node_modules/chartist/dist/index.css`
- `node_modules/chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css`

Either using one of two options:
1. Include them in the `<head>` of your HTML file
```html
<link rel="stylesheet" href="node_modules/chartist/dist/index.css">
<link rel="stylesheet" href="node_modules/chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css">
```
2. Include them as [Webpack](https://webpack.js.org/loaders/style-loader/) CSS imports
```js
import 'chartist/dist/index.css';
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css';
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
    Chartist.plugins.tooltip()
  ]
});
```

With a descriptive text:
```js
var chart = new Chartist.LineChart('.ct-chart', {
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
    Chartist.plugins.tooltip()
  ]
});
```

With a custom formatted descriptive text:
```js
var chart = new Chartist.LineChart('.ct-chart', {
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
    Chartist.plugins.tooltip({
      currency: '$',
      class: 'class1 class2',
      appendToBody: true
    })
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
  if(data.type === 'point') {
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
  Chartist.plugins.tooltip({
    appendToBody: true,
    pointClass: 'my-cool-point'
  })
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
