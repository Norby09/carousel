import {numberOrDefault, booleanOrDefault} from 'utils/value-or-default';

export class Slideshow {
  autoplay: number;
  interval = 100;
  restart = 100;

  static create(config?: any): Slideshow {
    if (!config) {
      return new Slideshow({});
    }
    return new Slideshow(config);
  }
  constructor(config: any) {
    this.autoplay = numberOrDefault(config.autoplay);
    // this.interval = numberOrDefault(config.interval);
    // this.restart = numberOrDefault(config.restart);

    //by default 100, configurable value for number input
  }
}
