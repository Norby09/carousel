import {Comp} from './comp';

export class Item {

  /**
  * Defines the background color of an Item object.
  * @name    backgroundColor
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public backgroundColor: string;

  /**
  * Defines the background url of an Item object.
  * @name    backgroundUrl
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public backgroundUrl: string;

  /**
  * Defines the name of an Item object.
  * @name    name
  * @type    {string}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public name: string;

  /**
  * Defines the type of an Item object, having 1 as default value.
  * @name    type
  * @type    {number}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public type = 1;

  /**
  * Defines the id of an Item object.
  * @name    id
  * @type    {number}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public id: number;

  /**
  * Instance of a Component object known by the carousel configurator. It contains title, description and link fields, which are going to appear on a slide.
  * @name    components
  * @type    {Comp}
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added   2018-08-08
  */
  public components: Comp;

  /**
  * Instantiates an Item object with the specified configuration, if any.
  * @constructor Item
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added  2018-08-08
  * @memberOf item
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


