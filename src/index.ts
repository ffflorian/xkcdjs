import {XKCDResult} from './XKCDResult';
import {RequestService} from './RequestService';

class XKCD {
  private readonly lowestIndex = 1;
  private readonly requestService: RequestService;

  constructor() {
    this.requestService = new RequestService();
  }

  async getRandom(): Promise<XKCDResult> {
    const latest = await this.requestService.getLatest();
    const randomIndex = Math.floor(Math.random() * (latest.num - this.lowestIndex + 1)) + this.lowestIndex;

    return this.requestService.getByIndex(randomIndex);
  }

  async getLatest(): Promise<XKCDResult> {
    return this.requestService.getLatest();
  }

  async getByIndex(index: number): Promise<XKCDResult> {
    if (index < this.lowestIndex) {
      throw new Error(`Index is lower than the lowest index of ${this.lowestIndex}.`);
    }
    return this.requestService.getByIndex(index);
  }

  setBaseUrl(url: string): void {
    this.requestService.setBaseUrl(url);
  }
}

export {XKCD, XKCDResult};
