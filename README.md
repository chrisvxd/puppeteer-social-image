# puppeteer-social-image

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## Examples

### Render basic template

```js
import renderSocialImage from "puppeteer-social-image";

const image = renderSocialImage({
  template: "basic",
  templateParams: {
    title: "Hello, world"
  },
  output: "image.png", // Optional, if supplied write to path
  size: "facebook" // Defaults to twitter, as smallest
});
```

### Render custom template

```js
import renderSocialImage from "puppeteer-social-image";

const image = renderSocialImage({
  template: "Pretty",
  templateBody: '<div class="Main">Hello, {{name}}!</div>',
  templateStyles: ".Main { color: blue; }",
  output: "image.png", // Optional, if supplied write to path
  size: "facebook" // Defaults to twitter, as smallest
});
```

## License

MIT © [Chris Villa](http://www.chrisvilla.co.uk)
