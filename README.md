# puppeteer-social-image

[![Build Status](https://travis-ci.com/chrisvxd/puppeteer-social-image.svg?branch=master)](https://travis-ci.com/chrisvxd/puppeteer-social-image) [![NPM](https://img.shields.io/npm/v/puppeteer-social-image.svg)](https://www.npmjs.com/package/puppeteer-social-image) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

Create dynamic social share images using HTML + CSS via puppeteer. For a hosted solution, see [awesome-social-share](https://github.com/chrisvxd/awesome-social-share).

![img](https://i.ibb.co/PwVm1ky/Artboard.png)

## Installation

```sh
npm i puppeteer-social-image --save
```

## Usage

### Render "basic" template

```js
import renderSocialImage from "puppeteer-social-image";

renderSocialImage({
  template: "basic",
  templateParams: {
    imageUrl:
      "https://images.unsplash.com/photo-1557958114-3d2440207108?w=1950&q=80",
    title: "Hello, world"
  },
  output: "image.png",
  size: "facebook"
});
```

### Render custom template

```js
import renderSocialImage from "puppeteer-social-image";

renderSocialImage({
  templateBody: '<div class="Main">Hello, {{name}}!</div>',
  templateStyles: ".Main { color: blue; }",
  templateParams: {
    name: "Jane"
  },
  output: "image.png",
  size: "facebook"
});
```

## API

### renderSocialImage

Returns `Promise<Buffer>`.

Type: function (opts): Promise

- `opts` (object) Configuration options
- `opts.template` (string) Name of a prebuilt template. Valid values are:
  - `basic` (default)
- `opts.templateParams` (object) Params to be passed to the template. If using prebuilt templates, see below for APIs.
- `opts.templateBody` (string?) Handlebars template to render in the body for a custom template. Populated with templateParams.
- `opts.templateStyles` (string?) CSS to use for a custom template. Passed to the head.
- `opts.customTemplates` (object?) Define multiple custom templates
  - `opts.customTemplates[key]` (string) Name for the customTemplate
  - `opts.customTemplates[key].templateBody`(string) Handlebars template to render in the body for this custom template. Populated with templateParams.
  - `opts.customTemplates[key].templateStyles`(string) CSS to use for this custom template. Passed to the head
- `opts.output` (string?) Path to write image
- `opts.size` (string?) Preset size for the image. Valid values are:
  - `facebook`
  - `twitter` (default)
- `opts.browser` (Browser?) Instance of puppeteer's `Browser` to use instead of the internal version. Useful for serverless functions, which may require [`chrome-aws-lambda`](https://www.npmjs.com/package/chrome-aws-lambda). This browser instance will not be automatically closed.

## Templates

### `basic`

A basic template to show some short text overlaying an image.

![basic template](https://i.ibb.co/pvc16gx/Group.png)

#### API

- `title` (string) Title text for the image
- `imageUrl` (string?) URL for the background image
- `unsplashId` (string?) Unsplash ID for the background image
- `unsplashKeywords` (string?) Unsplash keywords to use for the background image
- `backgroundImageAnchor` (string?, default `"C"`) Anchor point for the background image. Valid options are `C`, `N`, `NE`, `E`, `SE`, `S`, `SW`, `W` or `NW`.
- `backgroundImageOverlay` (boolean?, default `true`) Add a dark overlay on top of the background image
- `background` (string?) CSS background prop. Prefer `imageUrl` if using image.
- `color` (string?, default `"white"`) Color for the title
- `fontFamily` (string?, default `'"Lato", "Helvetica Neue", sans-serif'`) Font family
- `fontSize` (string?, default `"128px"`) Font size
- `watermark` (string?) Watermark text to render in the bottom right
- `watermarkUrl` (string?) Watermark URL to render in the bottom right, prefixed by "Generated by"

### `article`

A template for an article, with an eyebrow that can be used for dates

#### API

- `title` (string) Title text
- `subtitle` (string?) Subtitle text
- `eyebrow` (string) Eyebrow text, rendered above the title, like a date
- `imageUrl` (string?) URL for the background image
- `unsplashId` (string?) Unsplash ID for the background image
- `unsplashKeywords` (string?) Unsplash keywords to use for the background image
- `backgroundImageAnchor` (string?, default `"C"`) Anchor point for the background image. Valid options are `C`, `N`, `NE`, `E`, `SE`, `S`, `SW`, `W` or `NW`.
- `backgroundImageOverlay` (boolean?, default `true`) Add a dark overlay on top of the background image
- `background` (string?) CSS background prop. Prefer `imageUrl` if using image.
- `color` (string?, default `"white"`) Color for the text
- `fontFamily` (string?, default `'"Lato", "Helvetica Neue", sans-serif'`) Font family
- `watermark` (string?) Watermark text to render in the bottom right
- `watermarkUrl` (string?) Watermark URL to render in the bottom right, prefixed by "Generated by"
  chrisvilla.co.uk)

## License

MIT © [Chris Villa](http://www.chrisvilla.co.uk)
