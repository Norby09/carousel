import {numberOrDefault} from 'utils/value-or-default';

export class Slideshow {
  autoplay: number = 0;
  interval = 100;
  restart = 100;

  static create(config?: any): Slideshow {
    if (!config) {
      return new Slideshow({});
    }
    return new Slideshow(config);
  }

  constructor(config?: any) {
    this.autoplay = config.autoplay ? numberOrDefault(config.autoplay) : 0;
    this.interval = config.interval ? numberOrDefault(config.interval) : 100;
    this.restart = config.restart ? numberOrDefault(config.restart) : 100;

  }
}
