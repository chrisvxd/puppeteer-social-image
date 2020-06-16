## [0.8.1](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.8.0...v0.8.1) (2020-06-16)


### Bug Fixes

* pass all params to custom templates ([327c4b3](https://github.com/chrisvxd/puppeteer-social-image/commit/327c4b3))



# [0.8.0](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.7.1...v0.8.0) (2020-06-05)


### Features

* support custom image types without using a path ([bb621f7](https://github.com/chrisvxd/puppeteer-social-image/commit/bb621f7))


### BREAKING CHANGES

* the default type is now JPEG when not specifying the "output" param



## [0.7.1](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.7.0...v0.7.1) (2020-05-29)


### Bug Fixes

* don't render broken previews for sizes that don't support it ([a8f3aa5](https://github.com/chrisvxd/puppeteer-social-image/commit/a8f3aa5))



# [0.7.0](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.6.0...v0.7.0) (2020-05-29)


### Features

* add instagram sizes ([d2b5797](https://github.com/chrisvxd/puppeteer-social-image/commit/d2b5797))
* add pinterest size ([d3c652c](https://github.com/chrisvxd/puppeteer-social-image/commit/d3c652c))
* pass size param to custom templates ([400b1ec](https://github.com/chrisvxd/puppeteer-social-image/commit/400b1ec))
* support custom sizes ([787a49a](https://github.com/chrisvxd/puppeteer-social-image/commit/787a49a))



# [0.6.0](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.5.5...v0.6.0) (2020-02-03)


### Features

* add logo and refined watermark to basic and article templates. Reduce font size. ([2539a79](https://github.com/chrisvxd/puppeteer-social-image/commit/2539a79))



## [0.5.5](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.5.4...v0.5.5) (2020-01-30)


### Bug Fixes

* ensure custom templates generate in all environments ([49d084a](https://github.com/chrisvxd/puppeteer-social-image/commit/49d084a))



## [0.5.4](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.5.3...v0.5.4) (2020-01-30)


### Bug Fixes

* fix invalid markup in article template, and add regression tests ([f7ef694](https://github.com/chrisvxd/puppeteer-social-image/commit/f7ef694))



## [0.5.3](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.5.2...v0.5.3) (2020-01-30)


### Bug Fixes

* fix invalid markup in all templates ([9ac863f](https://github.com/chrisvxd/puppeteer-social-image/commit/9ac863f))
* further fixes to image templates ([fe507f3](https://github.com/chrisvxd/puppeteer-social-image/commit/fe507f3))
* slight visual tweak to previews ([2096d6b](https://github.com/chrisvxd/puppeteer-social-image/commit/2096d6b))



## [0.5.2](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.5.1...v0.5.2) (2020-01-30)


### Bug Fixes

* don't nest <html /> tags in preview, and render styles correctly ([749d5f3](https://github.com/chrisvxd/puppeteer-social-image/commit/749d5f3))
* tidy up borders in preview ([8e3bb6f](https://github.com/chrisvxd/puppeteer-social-image/commit/8e3bb6f))


### Performance Improvements

* slightly increase preview performance by avoiding calling setContent twice ([cb88485](https://github.com/chrisvxd/puppeteer-social-image/commit/cb88485))



## [0.5.1](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.5.0...v0.5.1) (2020-01-30)


### Bug Fixes

* ensure images and previews get cropped correctly ([1f894cf](https://github.com/chrisvxd/puppeteer-social-image/commit/1f894cf))


### Performance Improvements

* increase preview performance by 2x by only taking 1 screenshot ([72431de](https://github.com/chrisvxd/puppeteer-social-image/commit/72431de))



# [0.5.0](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.4.1...v0.5.0) (2020-01-30)


### Features

* add support for generating previews wrapped in Twitter-style frame ([231c0db](https://github.com/chrisvxd/puppeteer-social-image/commit/231c0db))



## [0.4.1](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.4.0...v0.4.1) (2020-01-27)


### Bug Fixes

* ensure fiftyfifty takes watermark param ([a48ba54](https://github.com/chrisvxd/puppeteer-social-image/commit/a48ba54))



# [0.4.0](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.3.2...v0.4.0) (2020-01-27)


### Bug Fixes

* ensure fiftyfifty handles image position correctly ([b99183a](https://github.com/chrisvxd/puppeteer-social-image/commit/b99183a))
* ensure googleFont param works for all templates, and add tests ([5805a46](https://github.com/chrisvxd/puppeteer-social-image/commit/5805a46))
* fix aspect ratio of unsplash images in fiftyfifty template ([107a139](https://github.com/chrisvxd/puppeteer-social-image/commit/107a139))


### Features

* add fiftyfifty template ([9958a33](https://github.com/chrisvxd/puppeteer-social-image/commit/9958a33))
* add support for googleFont parameter across all templates ([19332f0](https://github.com/chrisvxd/puppeteer-social-image/commit/19332f0))
* add support for logging output for debugging ([25f70a3](https://github.com/chrisvxd/puppeteer-social-image/commit/25f70a3))



## [0.3.2](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.3.1...v0.3.2) (2020-01-22)


### Bug Fixes

* ensure pages are always closed if using userBrowser ([d3bca06](https://github.com/chrisvxd/puppeteer-social-image/commit/d3bca06))
* ensure puppeteer is always set to headless ([c89653c](https://github.com/chrisvxd/puppeteer-social-image/commit/c89653c))



## [0.3.1](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.3.0...v0.3.1) (2020-01-18)


### Bug Fixes

* ensure more complex templates render ([9fea492](https://github.com/chrisvxd/puppeteer-social-image/commit/9fea492))
* use valid fallback font for image templates ([d1a9dc9](https://github.com/chrisvxd/puppeteer-social-image/commit/d1a9dc9))



# [0.3.0](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.2.1...v0.3.0) (2020-01-18)


### Bug Fixes

* wait for fonts to load before rendering screenshots ([04502eb](https://github.com/chrisvxd/puppeteer-social-image/commit/04502eb))


### Features

* add browser param to allow for external puppeteer configuration ([33cdfdc](https://github.com/chrisvxd/puppeteer-social-image/commit/33cdfdc))


### Performance Improvements

* don't include Lato webfont in custom templates ([9ac12ff](https://github.com/chrisvxd/puppeteer-social-image/commit/9ac12ff))



## [0.2.1](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.2.0...v0.2.1) (2020-01-17)


### Bug Fixes

* fix rollup import so we can compile ([d375f6a](https://github.com/chrisvxd/puppeteer-social-image/commit/d375f6a))



# [0.2.0](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.1.1...v0.2.0) (2020-01-17)


### Features

* add article template ([76be6d3](https://github.com/chrisvxd/puppeteer-social-image/commit/76be6d3))
* add web API ([ff1143e](https://github.com/chrisvxd/puppeteer-social-image/commit/ff1143e))
* move .saasify to chrisvxd/og-impact ([6af4da5](https://github.com/chrisvxd/puppeteer-social-image/commit/6af4da5))
* revamp basic template - unsplash support, tighter line heights and watermarks ([a8010b2](https://github.com/chrisvxd/puppeteer-social-image/commit/a8010b2))
* support lambda, and make puppeteer a peer dependency ([d21ca5e](https://github.com/chrisvxd/puppeteer-social-image/commit/d21ca5e))
* switch templates to web font Lato, closest match to Avenir Next ([72e2c1a](https://github.com/chrisvxd/puppeteer-social-image/commit/72e2c1a))


### BREAKING CHANGES

* basic template now uses the Lato font instead of Avenir Next
* make puppeteer a peer dependency



## [0.1.1](https://github.com/chrisvxd/puppeteer-social-image/compare/v0.1.0...v0.1.1) (2019-05-20)


### Bug Fixes

* correct package description ([6271a0b](https://github.com/chrisvxd/puppeteer-social-image/commit/6271a0b))



# [0.1.0](https://github.com/chrisvxd/puppeteer-social-image/compare/270d144...v0.1.0) (2019-05-20)


### Bug Fixes

* close puppeteer browser after execution ([d71c8e7](https://github.com/chrisvxd/puppeteer-social-image/commit/d71c8e7))
* ensure getImage runs ([8295f4d](https://github.com/chrisvxd/puppeteer-social-image/commit/8295f4d))


### Features

* actually write image to output ([6588b66](https://github.com/chrisvxd/puppeteer-social-image/commit/6588b66))
* add background param to basic template ([b070cfe](https://github.com/chrisvxd/puppeteer-social-image/commit/b070cfe))
* add image overlay and anchoring to basic template ([ac83f65](https://github.com/chrisvxd/puppeteer-social-image/commit/ac83f65))
* add initial getImage code ([270d144](https://github.com/chrisvxd/puppeteer-social-image/commit/270d144))
* add params to basic template ([bbcf58e](https://github.com/chrisvxd/puppeteer-social-image/commit/bbcf58e))
* add support for custom templates ([8bad772](https://github.com/chrisvxd/puppeteer-social-image/commit/8bad772))
* change getImage to default export ([13ef22c](https://github.com/chrisvxd/puppeteer-social-image/commit/13ef22c))
* return image buffer from render ([31193a4](https://github.com/chrisvxd/puppeteer-social-image/commit/31193a4))
* switch default image output to png ([3bf375e](https://github.com/chrisvxd/puppeteer-social-image/commit/3bf375e))
* tweaks to show off demo - it's working! ([d6f62c9](https://github.com/chrisvxd/puppeteer-social-image/commit/d6f62c9))



