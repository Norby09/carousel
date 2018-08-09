import { objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {Title} from './title';
import {Link} from './link';
import {Description} from './description';

export class Comp {

  /**
  * The title property of the Comp class. An object which includes cssClass, text and style fields.
  * @name    title
  * @type    {Title}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public title: Title;

  /**
  * The description property of the Comp class. An object which includes cssClass, text and style fields.
  * @name    description
  * @type    {Description}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public description: Description;

  /**
  * Array of Link objects known by the configurator. The object includes cssClass, text, tooltip, style and url
  * which defines the redirection link.
  * @name    links
  * @type    {Link[]}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public links: Link[];

  /**
  * The Comp class manages the initialization of the title, description and links properties. The values of these instances
  * are given by the config parameter. If the config parameter does not exists, the objects are going to have their default values. 
  * @constructor Comp
  * @author  Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added  2018-08-08
  * @memberOf TM_FILENAME_BASE
  * @example  <caption>Basic Usage</caption>
  */
  public constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.links = arrayOrDefault(config.links).map(Link.create);
    this.description = Description.create(config.description);
    this.title = Title.create(config.title);
  }

  /**
  * The Create method is used to create new Comp objects.
  * @method   create
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {Comp}  A Component object defined by the configuration object. It contains default values if no config is given.
  * @example    <caption>Basic Usage</caption>
  * @param    {any} config
  * this.create();
  */
  public static create(config?: any): Comp {
    if (!config) {
      return new Comp();
    }
    return new Comp(config);
  }

  /**
  * Creates a new Link object with default values, which is added to the links array of the component .
  * @method   addLink
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {void} No return value  
  * @example    <caption>Basic Usage</caption>
  * this.addLink();
  */
  public addLink() : void {
    this.links.push(new Link());
  }

  /**
  * Removes a specific link from the array of links.
  * @method   removeLink
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {void} No return value  
  * @example    <caption>Basic Usage</caption>
  * @param    {Link} link
  * this.removeLink();
  */
  public removeLink(link : Link) : void{
    const index = this.links.indexOf(link);
    this.links.splice(index,1);
  }

  /**
  * Puts a link on the array of links, if it does not exists. 
  * @method   saveLink
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {void} No return value  
  * @example    <caption>Basic Usage</caption>
  * @param    {Link} link
  * this.saveLink();
  */
  public saveLink(link: Link) : void {
    if (!~this.links.indexOf(link)) {
      this.links.push(link);
    }
  }

}
