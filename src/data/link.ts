import { stringOrDefault, objectOrDefault } from 'utils/value-or-default';

export class Link {
  cssClass: String;
  style: String;
  text: String;
  tooltip: String;
  url: String;
  static create(config: any): Link {
    if (!config) {
      return new Link();
    }
    return new Link(config);
  }
  constructor(config?: any) {
    config = objectOrDefault(config) || {};
    this.cssClass = stringOrDefault(config.cssClass);
    this.style = stringOrDefault(config.style);
    this.text = stringOrDefault(config.text);
    this.tooltip = stringOrDefault(config.tooltip);
    this.url = stringOrDefault(config.url);
  }
}
