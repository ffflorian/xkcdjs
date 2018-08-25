import axios from 'axios';
import {URL} from 'url';

import {XKCDResult, ImageData} from './XKCDResult';

export class RequestService {
  private static readonly JSON_INFO_FILE = 'info.0.json';
  private apiUrl = new URL('https://xkcd.com');

  constructor() {}

  private async request(url: URL): Promise<XKCDResult> {
    try {
      const response = await axios.get<XKCDResult>(url.toString());
      return response.data;
    } catch (error) {
      const {status: statusCode = 0, statusText = ''} = error.response || {};
      if (statusCode && statusText) {
        throw new Error(`Request failed with status code ${statusCode}: ${statusText}.`);
      }
      throw error;
    }
  }

  async getLatest(): Promise<XKCDResult> {
    const url = new URL(RequestService.JSON_INFO_FILE, this.apiUrl);
    return this.request(url);
  }

  async getByIndex(index: number): Promise<XKCDResult> {
    const url = new URL(`${index}/${RequestService.JSON_INFO_FILE}`, this.apiUrl);
    return this.request(url);
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
      };
    } catch (error) {
      const {status: statusCode = 0, statusText = ''} = error.response || {};
      if (statusCode && statusText) {
        throw new Error(`Request failed with status code ${statusCode}: ${statusText}.`);
      }
      throw error;
    }
  }

  setApiUrl(newUrl: URL): void {
    this.apiUrl = newUrl;
  }
}
