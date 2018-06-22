import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {Resource} from './resource';

export class Language {
  languageName: string;
  resources: Resource[];

  static create(config?: any): Language {
    if (!config) {
      return new Language();
    }
    return new Language(config);
  }
  constructor(config?: any) {
    config = objectOrDefault(config) || {};
    this.languageName = stringOrDefault(config.languageName);
    this.resources = arrayOrDefault(config.resources);
  }
}
