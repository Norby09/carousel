import {objectOrDefault, stringOrDefault} from '../utils/value-or-default';

export class Resource {
  name: string;
  value: string;

  static create(config?: any): Resource {
    if (!config) {
      return new Resource();
    }
    return new Resource(config);
  }
  constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.name = stringOrDefault(config.name);
    this.value = stringOrDefault(config.value);
  }
}
