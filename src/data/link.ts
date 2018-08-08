import { stringOrDefault, objectOrDefault } from 'utils/value-or-default';

export class Link {
  /**
  * Property which defines the css class of a Link object.
  * @name    cssClass
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public cssClass: string;

  /**
  * Property which defines the style of a Link object.
  * @name    style
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public style: string;
  
  /**
  * Property which defines the text of a Link object.
  * @name    text
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public text: string;

  /**
  * Property which defines the tooltip of a Link object.
  * @name    text
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public tooltip: string;

  /**
  * Property which defines the url of a Link object.
  * @name    text
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public url: string;

  /**
  * The Link class manages the inicialization of the properties with the values from a configuration object.
  * If the config object is empty, the properties are going to have default values.
  * @constructor Link
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
    this.tooltip = stringOrDefault(config.tooltip);
    this.url = stringOrDefault(config.url);
  }

  /**
  * The create method is used to create a new Link object.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Link}  
  * @example    <caption>Basic Usage</caption>
  * this.create();
  */
  public static create(config?: any): Link {
    if (!config) {
      return new Link();
    }
    return new Link(config);
  }
  
}
