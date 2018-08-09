import { objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {Title} from './title';
import {Link} from './link';
import {Description} from './description';

export class Comp {

  /**
  * Instantiation of a Title class.
  * @name    title
  * @type    {Title}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public title: Title;

  /**
  * Instantiation of a Decription class.
  * @name    description
  * @type    {Description}
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  */
  public description: Description;

  /**
  * Array of Link objects.
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
  * @returns    {Comp}  
  * @example    <caption>Basic Usage</caption>
  * this.create();
  */
  public static create(config?: any): Comp {
    if (!config) {
      return new Comp();
    }
    return new Comp(config);
  }

  /**
  * Creates a new Link object which is added to the links array of the .
  * @method   addLink
  * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
  * @added    2018-08-08
  * @returns    {void}  
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
  * @returns    {void}  
  * @example    <caption>Basic Usage</caption>
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
  * @returns    {void}  
  * @example    <caption>Basic Usage</caption>
  * this.saveLink();
  */
  public saveLink(link: Link) : void {
    if (!~this.links.indexOf(link)) {
      this.links.push(link);
    }
  }

}
