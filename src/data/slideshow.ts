import {numberOrDefault} from 'utils/value-or-default';

export class Slideshow {
  /**
  * Property of Slideshow of type number having a default value of 0, this value can be changed
  * @name    autoplay
  * @type    {number}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  autoplay: number = 0;
  /**
  * Property of slideshow of type number having a default value of 100, this can be changed
  * @name    interval
  * @type    {number}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  interval: number = 100;
  /**
  * Property of Slideshow of type number having a default value of 100, this can be changed
  * @name    restart
  * @type    {number}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  restart: number = 100;

  /**
   * This method is used to create a new Slideshow instance whether we have a config object or not
   * @method   create
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {Slideshow}  Slideshow with config if config exists, else empty config
   * @example    <caption>Basic Usage</caption>
   * this.create();
   */
  static create(config?: any): Slideshow {
    if (!config) {
      return new Slideshow({});
    }
    return new Slideshow(config);
  }

  /**
  * This constructor is used to process the config elements in the config objects if it exists
  * @author		Norbert Layis <Norbert.Layis@blackline.com>
  * @added		8/8/2018
  * @memberOf	slideshow
  * @example		<caption>Basic Usage</caption>
  */
  constructor(config?: any) {
    this.autoplay = config.autoplay ? numberOrDefault(config.autoplay) : 0;
    this.interval = config.interval ? numberOrDefault(config.interval) : 100;
    this.restart = config.restart ? numberOrDefault(config.restart) : 100;
  }
}
