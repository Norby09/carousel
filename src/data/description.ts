import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Description {
  /**
  * Defines the css class of a Description object.
  * @name    cssClass
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public cssClass: string;

  /**
  * Defines the style of a Description object.
  * @name    style
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public style: string;

  /**
  * Defines the text of a Description object.
  * @name    text
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public text: string;

  /**
  * The Description class manages the inicialization of the cssClass, style and text properties, based on a config object.
  * If the config object is empty, the properties are going to have default values.
  * @constructor Description
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added  2018-08-08
  * @memberOf TM_FILENAME_BASE
  * @example  <caption>Basic Usage</caption>
  */
  public constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.cssClass = stringOrDefault(config.cssClass);
    this.style = stringOrDefault(config.style);
    this.text = stringOrDefault(config.text);
  }

  /**
  * Instantiates a Description object with the specified configuration, if any.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Description}  A Description object with the specicied configuration. It contains default values if no configuration is given.
  * @example    <caption>Basic Usage</caption>
  * @param    {any} config
  * this.create();
  */
  public static create(config?: any): Description {
    if (!config) {
      return new Description();
    }
    return new Description(config);
  }
}
