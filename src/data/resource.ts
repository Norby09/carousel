import {objectOrDefault, stringOrDefault} from '../utils/value-or-default';

export class Resource {
  /**
  * Property which defines the name of a Resource object.
  * @name    name
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  name: string;

  /**
  * Property which defines the value of a Resource object.
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
  * The create method is used to create a new Resource object.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Resource}  
  * @example    <caption>Basic Usage</caption>
  * this.create();
  */
  static create(config?: any): Resource {
    if (!config) {
      return new Resource();
    }
    return new Resource(config);
  }
 
}
