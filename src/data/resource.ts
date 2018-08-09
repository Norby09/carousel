import {objectOrDefault, stringOrDefault} from '../utils/value-or-default';

export class Resource {
  /**
  * Defines the name of a Resource object.
  * @name    name
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  name: string;

  /**
  * Defines the value of a Resource object.
  * @name    value
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  value: string;

  /**
  * The Resource class manages the inicialization of the name and value properties with the values from a configuration object.
  * If the config object is empty, the properties are going to have default values.
  * @constructor Link
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added  2018-08-08
  * @memberOf TM_FILENAME_BASE
  * @example  <caption>Basic Usage</caption>
  */
  constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.name = stringOrDefault(config.name);
    this.value = stringOrDefault(config.value);
  }

   /**
  * Instantiates a Resource object with the specified configuration, if any.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Resource} A Resource object with the specified configuration. It contains default values if no configuration is given. 
  * @example    <caption>Basic Usage</caption>
  * @param    {any} config
  * this.create();
  */
  static create(config?: any): Resource {
    if (!config) {
      return new Resource();
    }
    return new Resource(config);
  }
 
}
