import { stringOrDefault} from '../utils/value-or-default';

export class Resource {
  name: String;
  value: String;

  static create(config?: any): Resource {
    if (!config) {
      return new Resource();
    }
    return new Resource(config);
  }
  constructor(config?: any) {
    this.name = stringOrDefault(config.name);
    this.value = stringOrDefault(config.value);
  }
}
