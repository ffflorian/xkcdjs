import {XKCDResult, XKCDResultWithData} from './XKCDResult';
import {RequestService} from './RequestService';

export interface RequestOptions {
  withData?: boolean;
}

export class XKCD {
  private readonly lowestIndex = 1;
  private readonly requestService: RequestService;

  constructor() {
    this.requestService = new RequestService();
  }

  async getRandom(options?: {withData?: false}): Promise<XKCDResult>;
  async getRandom(options: {withData: true}): Promise<XKCDResultWithData>;
  async getRandom(options: RequestOptions = {}): Promise<XKCDResult | XKCDResultWithData> {
    const latest = await this.requestService.getLatest();
    const randomIndex = Math.floor(Math.random() * (latest.num - this.lowestIndex + 1)) + this.lowestIndex;

    const metaData = await this.requestService.getByIndex(randomIndex);

    if (options.withData === true) {
      const imageData = await this.requestService.getImage(metaData.img);
      return {
        ...metaData,
        data: imageData,
      };
    }

    return metaData;
  }

  async getLatest(options?: {withData?: false}): Promise<XKCDResult>;
  async getLatest(options: {withData: true}): Promise<XKCDResultWithData>;
  async getLatest(options: RequestOptions = {}): Promise<XKCDResult | XKCDResultWithData> {
    const metaData = await this.requestService.getLatest();

    if (options.withData === true) {
      const imageData = await this.requestService.getImage(metaData.img);
      return {
        ...metaData,
        data: imageData,
      };
    }

    return metaData;
  }

  async getByIndex(index: number, options?: {withData?: false}): Promise<XKCDResult>;
  async getByIndex(index: number, options: {withData: true}): Promise<XKCDResultWithData>;
  async getByIndex(index: number, options: RequestOptions = {}): Promise<XKCDResultWithData | XKCDResult> {
    if (index < this.lowestIndex) {
      throw new Error(`Index is lower than the lowest index of ${this.lowestIndex}.`);
    }

    const metaData = await this.requestService.getByIndex(index);

    if (options.withData === true) {
      const imageData = await this.requestService.getImage(metaData.img);
      return {
        ...metaData,
        data: imageData,
      };
    }

    return metaData;
  }

  setBaseUrl(url: string): void {
    this.requestService.setBaseUrl(url);
  }
}
