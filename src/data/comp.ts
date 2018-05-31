import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {Title} from './title';
import {LinksArray} from './links-array';
import {Description} from './description';
export class Comp {
  title: Title;
  description: Description;
  links: Array<LinksArray>;
  static create(config: any): Comp {
    if (!config) {
      return new Comp();
    }
    return new Comp(config);
  }
  addLink() {
    this.links.push(new LinksArray());
    console.log(this.links);
  }
  saveLink(link: LinksArray): void {
    if (!~this.links.indexOf(link)) {
      this.adLink(link);
    }
  }
  adLink(link: LinksArray): void {
    this.links.push(link);
    console.log(this.links);
  }
  constructor(config?: any) {
    config = objectOrDefault(config) || {};
    this.links = arrayOrDefault(config.links).map(LinksArray.create);
    this.description = Description.create(stringOrDefault(config.description));
    this.title = Title.create(stringOrDefault(config.description));
  }

}
