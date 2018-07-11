import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {Title} from './title';
import {Link} from './link';
import {Description} from './description';

export class Comp {
  title: Title;
  description: Description;
  links: Link[];

  static create(config?: any): Comp {
    if (!config) {
      return new Comp();
    }
    return new Comp(config);
  }

  addLink() {
    this.links.push(new Link());
  }

  removeLink(link : Link){
    const index = this.links.indexOf(link);
    this.links.splice(index,1);
  }

  saveLink(link: Link) {
    if (!~this.links.indexOf(link)) {
      this.links.push(link);
    }
  }

  constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.links = arrayOrDefault(config.links).map(Link.create);
    this.description = Description.create(config.description);
    this.title = Title.create(config.title);
  }

}
