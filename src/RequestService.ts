import axios, {AxiosRequestConfig} from 'axios';
import {XKCDResult} from './XKCDResult';
import {APIException} from './APIException';

export class RequestService {
  private axiosConfig: AxiosRequestConfig;
  private baseUrl = 'https://xkcd.com';
  private readonly jsonInfoPath = 'info.0.json';

  constructor() {
    this.axiosConfig = this.buildConfig();
  }

  private buildConfig(): AxiosRequestConfig {
    this.axiosConfig = {
      method: 'get',
      url: this.baseUrl,
    };

    return this.axiosConfig;
  }

  private async request(config: AxiosRequestConfig): Promise<XKCDResult> {
    try {
      const response = await axios.request(config);
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
    return this.request({
      ...this.axiosConfig,
      url: `${this.baseUrl}/${this.jsonInfoPath}`,
    });
  }

  async getByIndex(index: number): Promise<XKCDResult> {
    return this.request({
      ...this.axiosConfig,
      url: `${this.baseUrl}/${index}/${this.jsonInfoPath}`,
    });
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
    this.buildConfig();
  }
}
