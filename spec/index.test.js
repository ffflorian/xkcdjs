//@ts-check

const XKCDjs = require('../dist');
const nock = require('nock');

/** @type {XKCDjs.XKCDResult} */
const responseDataFirst = {
  alt: "Don't we all.",
  day: '1',
  img: 'https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg',
  link: '',
  month: '1',
  news: '',
  num: 1,
  safe_title: 'Barrel - Part 1',
  title: 'Barrel - Part 1',
  transcript:
    "[[A boy sits in a barrel which is floating in an ocean.]]\nBoy: I wonder where I'll float next?\n[[The barrel drifts into the distance. Nothing else can be seen.]]\n{{Alt: Don't we all.}}",
  year: '2006',
};

/** @type {XKCDjs.XKCDResult} */
const responseDataLatest = {
  alt: "If you study graphs in which edges can link more than two nodes, you're more properly called a hyperedgelord.",
  day: '22',
  img: 'https://imgs.xkcd.com/comics/edgelord.png',
  link: '',
  month: '8',
  news: '',
  num: 2036,
  safe_title: 'Edgelord',
  title: 'Edgelord',
  transcript: '',
  year: '2018',
};

describe('XKCD', () => {
  /** @type {XKCDjs.XKCD} */
  let xkcd;

  beforeEach(() => {
    xkcd = new XKCDjs.XKCD();

    nock(xkcd.requestService.baseUrl)
      .get(new RegExp(`/[0-9]+/${xkcd.requestService.jsonInfoPath}`))
      .reply(200, responseDataFirst)
      .persist();

    nock(xkcd.requestService.baseUrl)
      .get(new RegExp(`/${xkcd.requestService.jsonInfoPath}`))
      .reply(200, responseDataLatest)
      .persist();

    nock('https://example.com')
      .get(/.*/)
      .reply(404)
      .persist();
  });

  it('gets the latest comic', async () => {
    /** @type {XKCDjs.XKCDResult} */
    const latest = await xkcd.getLatest();

    expect(latest.alt).toBe(responseDataLatest.alt);
  });

  it('gets a random comic', async () => {
    /** @type {XKCDjs.XKCDResult} */
    const latest = await xkcd.getRandom();

    expect(latest.alt).toBe(responseDataFirst.alt);
  });

  it('gets a comic by id', async () => {
    /** @type {XKCDjs.XKCDResult} */
    const latest = await xkcd.getByIndex(1);

    expect(latest.alt).toBe(responseDataFirst.alt);
  });

  it('sets the base URL', async () => {
    xkcd.setBaseUrl('https://example.com');

    try {
      await xkcd.getByIndex(1);
      fail('Did not throw error');
    } catch (error) {
      expect(error.message).toBe('Request failed with status code 404');
    }
  });
});
