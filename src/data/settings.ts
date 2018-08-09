import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Settings {
  /**
  * Defines the default template url of a Settings object.
  * @name    defaultTemplateUrl
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  defaultTemplateUrl: string;

  /**
  * Defines the template style of a Settings object.
  * @name    templateStyle
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  templateStyle: string;

  /**
  * Defines the animation of a Settings object, with "slide" as default value.
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
  * Instantiates a Settings object with the specified configuration, if any.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Settings} A Settings object with the specified configuration. It contains default values if no configuration is given.
  * @example    <caption>Basic Usage</caption>
  * @param    {any} config
  * this.create();
  */
  static create(config?: any) : Settings {
    if (!config) {
      return new Settings();
    }
    return new Settings(config);
  }
}
