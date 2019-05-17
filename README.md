# puppeteer-social-image

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

Create dynamic social share images using HTML + CSS via puppeteer.

![img](https://i.ibb.co/YtTbGHB/Artboard1.png)

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
  template: "Pretty",
  templateBody: '<div class="Main">Hello, {{name}}!</div>',
  templateStyles: ".Main { color: blue; }",
  output: "image.png",
  size: "facebook"
});
```

## API

### renderSocialImage

Returns `Promise`.

Type: function (opts): Promise

- `opts` (object) Configuration options
- `opts.template` (string) Name of a prebuild template. Valid values are:
  - `basic` (default)
- `opts.templateParams` (object) Params to be passed to the template. If using prebuilt templates, see below for APIs.
- `opts.templateBody` (string?) Handlebars template to render in the body for a custom template. Populated with templateParams.
- `opts.templateStyles` (string?) CSS to use for a custom template. Passed to the head.
- `opts.customTemplates` (object?) Define multiple custom templates
  - `opts.customTemplates[key]` (string) Name for the customTemplate
  - `opts.customTemplates[key].templateBody`(string) Handlebars template to render in the body for this custom template. Populated with templateParams.
  - `opts.customTemplates[key].templateBody`(string) CSS to use for this custom template. Passed to the head
- `opts.output` (string) Path to write image
- `opts.size` (string?) Preset size for the image. Valid values are:
  - `facebook`
  - `twitter` (default)

## Templates

### Basic

A basic template to show some short text overlaying an image.

#### API

- `title` (string) Title text for the image
- `backgroundImageUrl` (string?) URL for the background image
- `backgroundImageAnchor` (string?, default `"C"`) Anchor point for the background image. Valid options are `C`, `N`, `NE`, `E`, `SE`, `S`, `SW`, `W` or `NW`.
- `backgroundImageOverlay` (boolean?, default `true`) Add a dark overlay on top of the background image
- `background` (string?) CSS background prop. Prefer `backgroundImageUrl` if using image.
- `color` (string?, default `"white"`) Color for the title
- `fontFamily` (string?, default `'"Avenir Next", "Lato", "Helvetica Neue", sans-serif'`) Font family
- `fontSize` (string?, default `"128px"`) Font size

## License

MIT © [Chris Villa](http://www.chrisvilla.co.uk)
