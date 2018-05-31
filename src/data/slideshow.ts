import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Slideshow {
  autoplay: String;
  interval: String;
  restart: String;
  static create(config?: any): Slideshow {
    if (!config) {
      return new Slideshow({});
    }
    return new Slideshow(config);
  }
  constructor(config: any) {
    this.autoplay = stringOrDefault(config.autoplay);
    this.interval = stringOrDefault(config.interval);
    this.restart = stringOrDefault(config.restart);
  }
}
