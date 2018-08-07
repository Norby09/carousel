import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Description {
  cssClass: string;
  style: string;
  text: string;
  static create(config?: any): Description {
    if (!config) {
      return new Description();
    }
    return new Description(config);
  }
  constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.cssClass = stringOrDefault(config.cssClass);
    this.style = stringOrDefault(config.style);
    this.text = stringOrDefault(config.text);
  }
}
