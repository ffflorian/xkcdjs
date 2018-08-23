# xkcdjs [![Build Status](https://api.travis-ci.org/ffflorian/xkcdjs.svg?branch=master)](https://travis-ci.org/ffflorian/xkcdjs/) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/xkcdjs)](https://dependabot.com)

A simple [XKCD](https://xkcd.com) API.

## Usage

```ts
import {XKCD} from '@ffflorian/xkcdjs';

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

### With image data
```ts
import {XKCD} from '@ffflorian/xkcdjs';

const xkcdJS = new XKCD();

xkcdJS.getLatest({withData: true}).then(result => {
  /*
  XKCDResult {
    data: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 ...,
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
```


## Build and test

```
yarn
yarn test
```
