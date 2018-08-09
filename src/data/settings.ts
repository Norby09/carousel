import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Settings {
  /**
  * Property which defines the default template url of a Settings object.
  * @name    defaultTemplateUrl
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  defaultTemplateUrl: string;

  /**
  * Property which defines the template style of a Settings object.
  * @name    templateStyle
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  templateStyle: string;

  /**
  * Property which defines the animation of a Settings object, with "slide" as default value.
  * @name    animation
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  animation: string = "slide" ;

  /**
  * The Settings class manages the inicialization of properties with the values from a configuration object.
  * If the configuration object is empty, the properties are going to have default values.
  * @constructor Language
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added  2018-08-08
  * @memberOf TM_FILENAME_BASE
  * @example  <caption>Basic Usage</caption>
  */
  constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.defaultTemplateUrl = stringOrDefault(config.defaultTemplateUrl);
    this.templateStyle = stringOrDefault(config.templateStyle);
  }

  /**
  * The create method is used to create a new Settings object.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Settings}  
  * @example    <caption>Basic Usage</caption>
  * this.create();
  */
  static create(config?: any) : Settings {
    if (!config) {
      return new Settings();
    }
    return new Settings(config);
  }
}
