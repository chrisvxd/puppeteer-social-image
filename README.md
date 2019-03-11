# npm-library-boilerplate

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

`npm-library-boilerplate` is a boilerplate for NPM libraries.

- **Handy scripts**: easily support multiple data sources in your infinity scroll.
- **Commitizen powered releases**: automatic CHANGELOG and semver generation.
- **Babel, prettier, jest, eslint**: built in tools to save you setting up time again and again.

I use this for my personal projects, so thought I'd share.

## Using this boilerplate

Whilst I'd like to develop a generator for this, the best way to get started is to fork or clone this repo.

## What's included?

- Babel
- Prettier
- Jest
- Commitizen
- Linting:
  - JS via ESLint
  - JSON via ESLint
  - Markdown via Remark
  - Prettier via ESLint
- Useful scripts

## Scripts

- `compile` - compile package to `dist`
- `format` - run prettier on codebase
- `lint` \_ lint entire codebase
- `lint:js` - lint all JS files
- `lint:json` - lint all JSON files
- `lint:md` - lint all MD files
- `lint:format` - lint all files with prettier
- `test` - run tests with jest
- `release` - automatically create a release, and update CHANGELOG.md, using conventional commits in the Angular format
- `version` - print out the next version based on conventional commits in the Angular format

## License

MIT © [Chris Villa](http://www.chrisvilla.co.uk)
