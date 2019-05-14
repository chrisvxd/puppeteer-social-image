# puppeteer-social-image

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## API

Suggestions for the API

### getImage()

```js
const image = getImage({
  template: "Pretty",
  templateParams: {
    title: "Hello, world"
  },
  output: "image.png", // Optional, if supplied write to path
  size: "facebook" // Defaults to twitter, as smallest
});
```

### registerTemplate()

```js
const image = registerTemplate({
  template: "Pretty",
  body: "<div>{title}</div>",
  styles: "body { background: rebeccapurple }"
});
```

## License

MIT © [Chris Villa](http://www.chrisvilla.co.uk)
