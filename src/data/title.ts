import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Title {
  /**
  * Property of Title instance
  * @name    cssClass
  * @type    {string}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  cssClass: string;
  /**
  * Another property of a Title instance
  * @name    style
  * @type    {string}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  style: string;
  /**
  * Property of Title instance
  * @name    text
  * @type    {string}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  text: string;

  /**
   * This method is used to create a new instance of Title based on the fact that we have or have not a config object
   * @method   create
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {Title}  Returns a new instance of title with config if config exists, else a new title instance with no values
   * @example    <caption>Basic Usage</caption>
   * this.create();
   */
  static create(config: any): Title {
    if (!config) {
      return new Title();
    }
    return new Title(config);
  }

  /**
  * This constructor is used to process the properties of a title instance and specify the type of each element in the config
  * @author		Norbert Layis <Norbert.Layis@blackline.com>
  * @added		8/8/2018
  * @memberOf	title
  * @example		<caption>Basic Usage</caption>
  */
  constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.cssClass = stringOrDefault(config.cssClass);
    this.style = stringOrDefault(config.style);
    this.text = stringOrDefault(config.text);
  }
}
