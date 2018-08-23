# xkcdjs [![Build Status](https://api.travis-ci.org/ffflorian/xkcdjs.svg?branch=master)](https://travis-ci.org/ffflorian/xkcdjs/) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/xkcdjs)](https://dependabot.com)

A simple [XKCD](https://xkcd.com) API.

## Usage

```ts
import {XKCD} from 'xkcdjs';

const xkcdJS = new XKCD();

xkcdJS.getLatest().then(result => {
  /*
  XKCDResult {
    alt: "If you study ...",
    day: '22',
    img: 'https://imgs.xkcd.com/...',
    link: '',
    month: '8',
    news: '',
    ...
  }
  */
});

xkcdJS.getRandom().then(result => {
  // XKCDResult
});

xkcdJS.getById(2036).then(result => {
  // XKCDResult
});

xkcdJS.setBaseUrl('https://example.com');
```

## Build and test

```
yarn
yarn test
```
