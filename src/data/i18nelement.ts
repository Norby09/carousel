import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {ResourceSample} from './resourceSample';

export class I18nElement {
  // title: string;
  languageName: string;
  resources: Array<ResourceSample>;

  // description: string;
  static create(config?: any): I18nElement {
    if (!config) {
      return new I18nElement();
    }
    return new I18nElement(config);
  }
  constructor(config?: any) {
    config = objectOrDefault(config) || {};
    this.languageName = stringOrDefault(config.languageName);
    this.resources = arrayOrDefault(config.resources);
    // this.title = stringOrDefault(config.title);
    // this.description = stringOrDefault(config.description);
  }
}
