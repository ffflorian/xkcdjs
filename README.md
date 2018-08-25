# xkcdjs [![Build Status](https://api.travis-ci.org/ffflorian/xkcdjs.svg?branch=master)](https://travis-ci.org/ffflorian/xkcdjs/) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/xkcdjs)](https://dependabot.com)

A simple [xkcd](https://xkcd.com) API with a CLI.

## CLI usage

To use `xkcdjs` globally, run `yarn global add @ffflorian/xkcdjs` or `npm i -g @ffflorian/xkcdjs`.

```
Usage: xkcdjs [options] [command]

  Options:

    -v, --version       output the version number
    -o, --output <dir>  Specify the output directory (default: current directory)
    -h, --help          output usage information

  Commands:

    latest              Save the latest comic
    random              Save a random comic
    number <index>      Save comic by index number
```

## TypeScript example usage

```ts
import {XKCD} from '@ffflorian/xkcdjs';

const xkcd = new XKCD();

xkcd.getLatest().then(result => {
  // XKCDResult { ... }
});

xkcd.getRandom().then(result => {
  // XKCDResult
});

xkcd.getById(2036).then(result => {
  // XKCDResult
});

xkcd.getLatest({withData: true}).then(result => {
  // XKCDResultWithData
});

xkcd.getRandom({withData: true}).then(result => {
  // XKCDResultWithData
});

xkcd.getById(2036, {withData: true}).then(result => {
  // XKCDResultWithData
});

// optional:
xkcd.setBaseUrl('https://example.com');
```

## Functions

```ts
getRandom(options?: RequestOptions): Promise<XKCDResult | XKCDResultWithData>;
getLatest(options?: RequestOptions): Promise<XKCDResult | XKCDResultWithData>;
getByIndex(options?: RequestOptions): Promise<XKCDResult | XKCDResultWithData>;
setBaseUrl(url: string): void;
```

## Interfaces

```ts
interface RequestOptions {
  withData?: boolean;
}

interface ImageData {
  data: Buffer;
  mimeType?: string;
}

interface XKCDResult {
  alt: string;
  day: string;
  img: string;
  link: string;
  month: string;
  news: string;
  num: number;
  safe_title: string;
  title: string;
  transcript: string;
  year: string;
}

interface XKCDResultWithData extends XKCDResult {
  data: ImageData;
}
```

## Build and test

```
yarn
yarn test
```
