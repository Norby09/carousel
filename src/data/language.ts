import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {Resource} from './resource';

export class Language {
  name: string;
  resources: Resource[];

  static create(config?: any): Language {
    if (!config) {
      return new Language();
    }
    return new Language(config);
  }
  constructor(config?: any) {
    config = objectOrDefault(config) || {};
    this.name = stringOrDefault(config.name);
    this.resources = arrayOrDefault(config.resources);
  }
}
