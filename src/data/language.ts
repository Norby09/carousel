import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {Resource} from './resource';

export class Language {

  /**
  * Property which defines the text of a Language object.
  * @name    name
  * @type    {string}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public name: string;

  /**
  * An array of resources defined for a language.
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
  * The create method is used to create a new Language object.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Language}  
  * @example    <caption>Basic Usage</caption>
  * this.create();
  */
  public static create(config?: any): Language {
    if (!config) {
      return new Language();
    }
    return new Language(config);
  }
  
}
