import { stringOrDefault} from '../utils/value-or-default';

export class ResourceSample {
  title: String;
  description: String;

  static create(config: any): ResourceSample {
    if (!config) {
      return new ResourceSample();
    }
    return new ResourceSample(config);
  }
  constructor(config?: any) {
    this.title = stringOrDefault(config.title);
    this.description = stringOrDefault(config.description);
  }
}
