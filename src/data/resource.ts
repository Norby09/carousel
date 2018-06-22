import { stringOrDefault} from '../utils/value-or-default';

export class Resource {
  resourceName: String;
  resourceValue: String;

  static create(config?: any): Resource {
    if (!config) {
      return new Resource();
    }
    return new Resource(config);
  }
  constructor(config?: any) {
    this.resourceName = stringOrDefault(config.resourceName);
    this.resourceValue = stringOrDefault(config.resourceValue);
  }
}
