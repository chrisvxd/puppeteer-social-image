# puppeteer-social-image

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## API

Suggestions for the API

### getImage()

```js
const image = getImage({
  template: "Pretty",
  title: "Hello, world"
});
```

### registerTemplate()

```js
const image = registerTemplate({
  template: "Pretty",
  html: "<div>{{title}}</div>"
});
```

### getImage() alternative

```js
const image = getImage({
  templateParams: {
    title: "Hello, world"
  },
  template: "Pretty"
});
```

## License

MIT © [Chris Villa](http://www.chrisvilla.co.uk)
