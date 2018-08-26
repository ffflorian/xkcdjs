//@ts-check

const {RequestService} = require('../dist/RequestService');

describe('RequestService', () => {
  let requestService;

  beforeEach(() => {
    requestService = new RequestService();
  });

  it('requests image data', async () => {
    spyOn(requestService, 'request').and.returnValue(
      Promise.resolve({
        headers: {
          'content-type': 'ArrayBuffer',
        },
        data: Buffer.from([]),
      })
    );

    await requestService.getImage('http://example.com');

    expect(requestService.request).toHaveBeenCalledWith({
      responseType: 'arraybuffer',
      url: 'http://example.com/',
    });
  });

  it('fails with invalid URLs', async () => {
    try {
      await requestService.getImage(undefined);
      fail('No error thrown')
    } catch(error) {
      expect(error.message).toContain('Invalid URL');
    }

    try {
      await requestService.getImage('wwwwwwwww');
      fail('No error thrown')
    } catch(error) {
      expect(error.message).toContain('Invalid URL');
    }

    try {
      await requestService.getImage('/example.com');
      fail('No error thrown')
    } catch(error) {
      expect(error.message).toContain('Invalid URL');
    }
  });
});
