import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import { Title } from './title';
import {LinksArray} from './links-array';
import {Description} from './description';
export class Component {
  title: Title;
  description: Description;
  links: Array<LinksArray>;
  static create(config: any): Component {
    if (!config) {
      return new Component();
    }
    return new Component(config);
  }
  constructor(config?: any) {
    config = objectOrDefault(config) || {};

  }
}
