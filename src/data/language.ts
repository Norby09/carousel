import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {Resource} from './resource';

export class Language {

  /**
  * Defines the text of a Language object.
  * @name    name
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public name: string;

  /**
  * An array of resources defined for a language. Each resource object includes the resource name and the coresponding value. 
  * @name    resource
  * @type    {Resource[]}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public resources: Resource[];

  /**
  * The Language class manages the inicialization of the language name and the coresponding resources with the values from a configuration object.
  * If the config object is empty, the properties are going to have default values.
  * @constructor Language
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added  2018-08-08
  * @memberOf TM_FILENAME_BASE
  * @example  <caption>Basic Usage</caption>
  */
  public constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.name = stringOrDefault(config.name);
    this.resources = arrayOrDefault(config.resources);
  }

  /**
  * Instantiates a Language object with the specified configuration, if any.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Language}  A Language object with the specified configuration. It contains default values if no configuration is given.
  * @example    <caption>Basic Usage</caption>
  * @param    {any} config
  * this.create();
  */
  public static create(config?: any): Language {
    if (!config) {
      return new Language();
    }
    return new Language(config);
  }
  
}
