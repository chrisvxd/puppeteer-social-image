# puppeteer-social-image

[![Build Status](https://travis-ci.com/chrisvxd/puppeteer-social-image.svg?branch=master)](https://travis-ci.com/chrisvxd/puppeteer-social-image) [![NPM](https://img.shields.io/npm/v/puppeteer-social-image.svg)](https://www.npmjs.com/package/puppeteer-social-image) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

Create dynamic social share images using HTML + CSS via puppeteer. For a hosted version, see [OGIMPACT](https://github.com/chrisvxd/og-impact).

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

### Render on a serverless function

Add the [`puppeteer-serverless` package](https://github.com/saasify-sh/puppeteer-serverless), and pass it to the render function via the `browser` option:

```js
import puppeteer from "puppeteer-serverless";
import renderSocialImage from "puppeteer-social-image";

export default async () => {
  await renderSocialImage({
    template: "basic",
    templateParams: {
      imageUrl:
        "https://images.unsplash.com/photo-1557958114-3d2440207108?w=1950&q=80",
      title: "Hello, world"
    },
    browser: await puppeteer.launch({})
  });
};
```

## API

### renderSocialImage

Returns `Promise<Buffer>`.

Type: function (opts): Promise

- `opts` (object) Configuration options
- `opts.template` (string) Name of a prebuilt template. One of:
  - `basic` (default)
  - `article`
  - `fiftyfifty`
- `opts.templateParams` (object) Params to be passed to the template. If using prebuilt templates, see below for APIs.
- `opts.templateBody` (string?) Handlebars template to render in the body for a custom template. Populated with templateParams.
- `opts.templateStyles` (string?) CSS to use for a custom template. Passed to the head.
- `opts.customTemplates` (object?) Define multiple custom templates
  - `opts.customTemplates[key]` (string) Name for the customTemplate
  - `opts.customTemplates[key].templateBody`(string) Handlebars template to render in the body for this custom template. Populated with templateParams.
  - `opts.customTemplates[key].templateStyles`(string) CSS to use for this custom template. Passed to the head
- `opts.output` (string?) Path to write image
- `opts.type` (string?) Type of the output image. Overwritten by output path extension. One of:
  - `jpeg` (default)
  - `png`
- `opts.jpegQuality` (number, default `90`) JPEG image quality
- `opts.size` (string?) Preset size for the image. One of:
  - `facebook`
  - `twitter` (default)
  - `ig-landscape`
  - `ig-portrait`
  - `ig-square`
  - `ig-story`
  - `WIDTHxHEIGHT` Any width, height pairing
- `opts.browser` (Browser?) Instance of puppeteer's `Browser` to use instead of the internal version. Useful for serverless functions, which may require [`chrome-aws-lambda`](https://www.npmjs.com/package/chrome-aws-lambda). This browser instance will not be automatically closed.
- `opts.preview` (boolean?) Render the image with a chrome, as it would look on Twitter

## Templates

### `basic`

A basic template to show some short text overlaying an image.

<img width="400" alt="basic template preview" src="https://ssfy.sh/chrisvxd/og-impact/preview?title=Hello%20World&ghBust=1" />

#### API

- `title` (string) Title text for the image
- `logo` (string?) URL to a logo to render above the text
- `imageUrl` (string?) URL for the background image
- `unsplashId` (string?) Unsplash ID for the background image
- `unsplashKeywords` (string?) Unsplash keywords to use for the background image
- `backgroundImageAnchor` (string?, default `"C"`) Anchor point for the background image. Valid options are `C`, `N`, `NE`, `E`, `SE`, `S`, `SW`, `W` or `NW`.
- `backgroundImageOverlay` (boolean?, default `true`) Add a dark overlay on top of the background image
- `background` (string?) CSS background prop. Prefer `imageUrl` if using image.
- `color` (string?, default `"white"`) Color for the title
- `googleFont` (string?) Name for Google font to load
- `fontFamily` (string?, default `'"Lato", "Helvetica Neue", sans-serif'`) Font family
- `fontSize` (string?, default `"128px"`) Font size
- `watermark` (string?) Watermark text to render at the bottom of the image.

### `article`

A template for an article, with an eyebrow that can be used for dates

<img width="400" alt="article template preview" src="https://ssfy.sh/chrisvxd/og-impact/preview?template=article&eyebrow=27%20AUGUST&title=INTO%20THE%20OCEAN&subtitle=Explore%20the%20depths%20of%20the%20deep%20blue%20sea&unsplashId=gGX1fJkmw3k&ghBust=1" />

#### API

- `title` (string) Title text
- `subtitle` (string?) Subtitle text
- `eyebrow` (string) Eyebrow text, rendered above the title, like a date
- `logo` (string?) URL to a logo to render above the text
- `imageUrl` (string?) URL for the background image
- `unsplashId` (string?) Unsplash ID for the background image
- `unsplashKeywords` (string?) Unsplash keywords to use for the background image
- `backgroundImageAnchor` (string?, default `"C"`) Anchor point for the background image. Valid options are `C`, `N`, `NE`, `E`, `SE`, `S`, `SW`, `W` or `NW`.
- `backgroundImageOverlay` (boolean?, default `true`) Add a dark overlay on top of the background image
- `background` (string?) CSS background prop. Prefer `imageUrl` if using image.
- `color` (string?, default `"white"`) Color for the text
- `googleFont` (string?) Name for Google font to load
- `fontFamily` (string?, default `'"Lato", "Helvetica Neue", sans-serif'`) Font family
- `watermark` (string?) Watermark text to render at the bottom of the image.

### `fiftyfifty`

A multiuse template for an array of content

<img width="400" src="https://ssfy.sh/chrisvxd/og-impact/preview?template=fiftyfifty&title=What%20NOT%20to%20do%20when%20remote%20working&subtitle=Lorem%20ipsum%20dolor%20sit%20amet%2C%20consectetur%20adipiscing%20elit%2C%20sed%20do%20eiusmod%20tempor%20incididunt%20ut%20labore%20et%20dolore%20magna%20aliqua.%20Test%20and%20test%20some%20more.&unsplashId=QLqNalPe0RA&split=diagonal&logo=data%3Aimage%2Fsvg%2Bxml%3Bcharset%3Dutf-8%3Bbase64%2CPHN2ZyB3aWR0aD0nMjA5NicgaGVpZ2h0PSc0NDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc%2BPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz48cmVjdCBmaWxsPScjRkZFNjAwJyB3aWR0aD0nNDQwJyBoZWlnaHQ9JzQ0MCcgcng9JzUyJy8%2BPGcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoODYgMTQyKSc%2BPHBhdGggZD0nTTE3Ni4xMzkgOTcuMTVsLTE2LjA5MSA1Mi45MDNTMTU4Ljg2NCAxNTUgMTUzLjY1NSAxNTVoLTE5Ljg4N2MtNi4xNTUgMC03LjU3Ni01LjQxOC03LjU3Ni01LjQxOGwtMjMuNjc1LTc1LjE0NC0yMy42NzUgNzUuMTQ0Uzc3LjQyMiAxNTUgNzEuMjY2IDE1NUg1MC40M2MtNS4yMDggMC02LjM5Mi00Ljk0Ny02LjM5Mi00Ljk0N0wuMjQgNi44MzFDLS40NyA0LjAwNS4yNCAwIDQuNTAyIDBoMjYuMDQzYzcuMTAzIDAgOC41MjMgNC43MTEgOS40NyA3LjUzOGwyMy40MzkgODAuMDkxTDg2LjE4IDcuNTM4Qzg3LjEyOCA0LjI0IDg4Ljc4NSAwIDk0LjIzMSAwaDE2LjU3MmM1LjIwOSAwIDYuODY2IDQuMjQgNy44MTMgNy41MzhsMjIuOTY1IDgwLjA5MSAyMy40MzgtODAuMDkxYy42Mi0yLjQ2NyAxLjk2Mi02LjM3IDcuMDE1LTcuMzIzLjY1LS4xNDIgMS40LS4yMTUgMi4yNjUtLjIxNWg0Ny40NDlDMjU4LjAyIDAgMjc3IDE5LjcyNCAyNzcgNDguNjhjMCAyOS4xNjUtMTkuNDAxIDQ4LjQ3LTU1LjQ2MyA0OC40N0gxNzYuMTR6bTQ0LjcyLTMwLjY0NWMxNS4zNzIgMCAyMi4wNzMtOC40MzEgMjIuMDczLTE4LjIzNSAwLTEwLjE5Ny02LjctMTguNDMyLTIyLjA3Mi0xOC40MzJoLTIzLjQ0M2wtMTEuMTcyIDM2LjY2N2gzNC42MTV6JyBmaWxsLW9wYWNpdHk9Jy44NycgZmlsbD0nIzAwMCcvPjxjaXJjbGUgZmlsbD0nIzIxMUQwMCcgY3g9JzI2MycgY3k9JzE0MScgcj0nMTQnLz48L2c%2BPHRleHQgZm9udC1mYW1pbHk9J0F2ZW5pck5leHQtRGVtaUJvbGQsIEF2ZW5pciBOZXh0JyBmb250LXNpemU9JzIxMCcgZm9udC13ZWlnaHQ9JzUwMCcgbGV0dGVyLXNwYWNpbmc9JzE3LjIxMycgZmlsbD0nIzIxMUQwMCc%2BPHRzcGFuIHg9JzU2MCcgeT0nMjk3Jz5XRUxMUEFJRC5JTzwvdHNwYW4%2BPC90ZXh0PjwvZz48L3N2Zz4%3D&ghBust=1" alt="fiftyfifty template preview" />

#### API

- `title` (string) Title text
- `subtitle` (string?) Subtitle text
- `footer` (string) Footer text
- `split` (`straight` | `diagonal` | `diagonal-reverse`, default `straight`) Style of split between content and image
- `logo` (string?) URL for the logo image
- `imageUrl` (string?) URL for the background image
- `unsplashId` (string?) Unsplash ID for the background image
- `unsplashKeywords` (string?) Unsplash keywords to use for the background image
- `googleFont` (string?) Name for Google font to load
- `fontFamily` (string?, default `'"Lato", "Helvetica Neue", sans-serif'`) Font family
- `watermark` (string?) Watermark text to render in the bottom left. Same as `footer`.

## License

MIT © [Chris Villa](http://www.chrisvilla.co.uk)
