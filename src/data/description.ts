import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Description {
  cssClass: String;
  style: String;
  text: String;
  static create(config?: any): Description {
    if (!config) {
      return new Description();
    }
    return new Description(config);
  }
  constructor(config?: any) {
    config = objectOrDefault(config) || {};
    this.cssClass = stringOrDefault(config.cssClass);
    this.style = stringOrDefault(config.style);
    this.text = stringOrDefault(config.text);
  }
}
