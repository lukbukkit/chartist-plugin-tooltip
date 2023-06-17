# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

* The plugin is now compatible with and requires Chartist v1 API
* The plugin provides an ESM, CSJ and UMD version
* The "class" option accepts a single class name or an array of class names
* Sources were converted to TypeScript
* Replace deprecated properties "page{X,Y}Offset" with scroll{X,Y}
* Dropped support for "currency" and "currencyFormatCallback" options (use "tooltipFnc" instead)

## [1.0.0] - 2nd January 2023

Versions 1.0.0 and above of this plugin only work with Chartist versions of 1.0.0 and above.

### Added 
- Support for Chartist v1

### Removed 
- Support for Chartist version older than v1

## [0.1.4] - 8th July 2020

### Changed
- Upgraded a lot of dependencies
- Minimized JavaScript file did shrink ~100 Bytes (3771 Bytes -> 3678 Bytes)

## [0.1.3] - 30th December 2019

### Added
- Support for the IE11 - [#9](https://github.com/LukBukkit/chartist-plugin-tooltip/pull/9) 

## [0.1.2] - 30th July 2019

### Added
- Support for the solid donut graph

## [0.1.1] - 7th April 2019

### Fixed
- Fixed the wrong position of a tooltip when `appendToBody:true` is used

### Changed
- The default value of `appendToBody` is now `true` (was `false`), because it's more efficient
- The css property `position` of tooltip now has be `absolute`

## [0.0.21] - 22nd July 2018

### Fixed
- Fixed the position of the tooltips when there are multiple charts

## [0.0.20] - 16th July 2015

### Added
- Added less file to the dist folder

### Fixed
- Fixed issue checking chart type when uglified
- Fixed width/height being incorrect
- Fixed memory leak

### Changed
- Switched internally to Yarn
- The exported object is now called `Chartist.plugins.tooltip` instead of `Chartist.plugins.tooltips`. 
The `s` at the end of the tooltip is now missing.

## [0.0.11] - 28th April 2015

### Added
- Added custom tooltip using options.tooltipFnc

### Fixed
- Tooltips now working properly on Firefox

## [0.0.10] - 20th April 2015

### Fixed
- Set currency default to `undefined`. Fixes issue in chartist.js 0.7.4.

## [0.0.9] - 16th April 2015

### Fixed
- Fixed new pie chart label mechanism

## [0.0.8] - 16th April 2015

### Added
- For pie chart tooltips also take the labels into account if no meta is given

### Fixed
- Removed Ember reference

[unreleased]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v0.1.4...v1.0.0
[0.1.4]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v0.0.21...v0.1.1
[0.0.21]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v0.0.20...v0.0.21
[0.0.20]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v0.0.11...v0.0.20
[0.0.11]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/LukBukkit/chartist-plugin-tooltip/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/LukBukkit/chartist-plugin-tooltip/releases/tag/v0.0.8
