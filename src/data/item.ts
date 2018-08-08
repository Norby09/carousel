import {Comp} from './comp';

export class Item {

  /**
  * Property which defines the background color of an Item object.
  * @name    backgroundColor
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public backgroundColor: string;

  /**
  * Property which defines the background url of an Item object.
  * @name    backgroundUrl
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public backgroundUrl: string;

  /**
  * Property which defines the name of an Item object.
  * @name    name
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public name: string;

  /**
  * Property which defines the type of an Item object, having 1 as default value.
  * @name    type
  * @type    {number}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public type = 1;

  /**
  * Property which defines the id of an Item object.
  * @name    type
  * @type    {number}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public id: number;

  /**
  * Instantiation of a Component object.
  * @name    type
  * @type    {number}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public components: Comp;

  /**
  * The Item class manages the initialization of the properties with the values from the config object.
  * @constructor Item
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added  2018-08-08
  * @memberOf fileNameWithoutExtension()
  * @example  <caption>Basic Usage</caption>
  */
  constructor(config?: any) {
    this.backgroundColor = config.backgroundColor;
    this.backgroundUrl = config.backgroundUrl; 
    this.name = config.name;
    this.type = config.type ? config.type : 1;
    this.id = config.id;
    this.components = config.components ? new Comp(config.components) : new Comp();
  }
}


