import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Description {
  /**
  * Property which defines the css class of a Description object.
  * @name    cssClass
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public cssClass: string;

  /**
  * Property which defines the style of a Description object.
  * @name    style
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public style: string;

  /**
  * Property which defines the text of a Description object.
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
  * @memberOf fileNameWithoutExtension()
  * @example  <caption>Basic Usage</caption>
  */
  public constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.cssClass = stringOrDefault(config.cssClass);
    this.style = stringOrDefault(config.style);
    this.text = stringOrDefault(config.text);
  }

  /**
  * The create method is used to create a new Description object.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Description}  
  * @example    <caption>Basic Usage</caption>
  * this.create();
  */
  public static create(config?: any): Description {
    if (!config) {
      return new Description();
    }
    return new Description(config);
  }
}
