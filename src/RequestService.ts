import axios from 'axios';
import {URL} from 'url';

import {XKCDResult, ImageData} from './XKCDResult';
import {APIException} from './APIException';

export class RequestService {
  private static readonly JSON_INFO_FILE = 'info.0.json';
  private baseUrl = new URL('https://xkcd.com');

  constructor() {}

  private async request(url: URL): Promise<XKCDResult> {
    try {
      const response = await axios.get<XKCDResult>(url.toString());
      return response.data;
    } catch (error) {
      const {status: statusCode = 0, statusText = ''} = error.response || {};
      if (statusCode && statusText) {
        throw new APIException(`Request failed with status code ${statusCode}: ${statusText}.`);
      }
      throw error;
    }
  }

  async getLatest(): Promise<XKCDResult> {
    const parsedUrl = new URL(RequestService.JSON_INFO_FILE, this.baseUrl);
    return this.request(parsedUrl);
  }

  async getByIndex(index: number): Promise<XKCDResult> {
    const parsedURL = new URL(`${index}/${RequestService.JSON_INFO_FILE}`, this.baseUrl);
    return this.request(parsedURL);
  }

  async getImage(imageUrl: string): Promise<ImageData> {
    try {
      const response = await axios.get<Buffer>(imageUrl, {
        responseType: 'arraybuffer',
      });

      const contentType = response.headers['content-type'];

      return {
        data: response.data,
        mimeType: contentType ? String(contentType) : undefined,
      }
    } catch (error) {
      const {status: statusCode = 0, statusText = ''} = error.response || {};
      if (statusCode && statusText) {
        throw new APIException(`Request failed with status code ${statusCode}: ${statusText}.`);
      }
      throw error;
    }
  }

  setBaseUrl(newUrl: string): void {
    this.baseUrl = new URL(newUrl);
  }
}
