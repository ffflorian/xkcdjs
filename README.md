# xkcdjs

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
