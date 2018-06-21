import { stringOrDefault} from '../utils/value-or-default';

export class ResourceSample {
  resourceName: String;
  resourceValue: String;

  static create(config?: any): ResourceSample {
    if (!config) {
      return new ResourceSample();
    }
    return new ResourceSample(config);
  }
  constructor(config?: any) {
    this.resourceName = stringOrDefault(config.resourceName);
    this.resourceValue = stringOrDefault(config.resourceValue);
  }
}
