import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Title {
  cssClass: String;
  style: String;
  text: String;

  static create(config: any): Title {
    if (!config) {
      return new Title();
    }
    return new Title(config);
  }
  constructor(config?: any) {
    config = objectOrDefault(config) || {};
    this.cssClass = stringOrDefault(config.cssClass);
    this.style = stringOrDefault(config.style);
    this.text = stringOrDefault(config.text);
  }
}