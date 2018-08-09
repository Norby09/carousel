import { stringOrDefault, objectOrDefault } from 'utils/value-or-default';

export class Link {
  /**
  * Defines the css class of a Link object.
  * @name    cssClass
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public cssClass: string;

  /**
  * Defines the style of a Link object.
  * @name    style
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public style: string;
  
  /**
  * Defines the text of a Link object.
  * @name    text
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public text: string;

  /**
  * Defines the tooltip of a Link object.
  * @name    tooltip
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public tooltip: string;

  /**
  * Defines the url of a Link object.
  * @name    url
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
  * @memberOf TM_FILENAME_BASE
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
  * Instantiates a Link object with the specified configuration, if any.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Link} A Liink object with the specicied configuration. It contains default values if no configuration is given. 
  * @example    <caption>Basic Usage</caption>
  * @param    {any} config
  * this.create();
  */
  public static create(config?: any): Link {
    if (!config) {
      return new Link();
    }
    return new Link(config);
  }
  
}
