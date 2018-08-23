import axios from 'axios';
import {XKCDResult} from './XKCDResult';
import {APIException} from './APIException';

export class RequestService {
  private static readonly JSON_INFO_FILE = 'info.0.json';
  private baseUrl = 'https://xkcd.com';

  constructor() {}

  private async request(url: string): Promise<XKCDResult> {
    try {
      const response = await axios.get<XKCDResult>(url);
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
    return this.request(`${this.baseUrl}/${RequestService.JSON_INFO_FILE}`);
  }

  async getByIndex(index: number): Promise<XKCDResult> {
    return this.request(`${this.baseUrl}/${index}/${RequestService.JSON_INFO_FILE}`);
  }

  async getImage(imageUrl: string): Promise<Buffer> {
    try {
      const response = await axios.get<Buffer>(imageUrl, {
        responseType: 'arraybuffer',
      });
      return response.data;
    } catch (error) {
      const {status: statusCode = 0, statusText = ''} = error.response || {};
      if (statusCode && statusText) {
        throw new APIException(`Request failed with status code ${statusCode}: ${statusText}.`);
      }
      throw error;
    }
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }
}
