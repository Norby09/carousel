import { stringOrDefault, objectOrDefault } from 'utils/value-or-default';

export class Link {
  cssClass: string;
  style: string;
  text: string;
  tooltip: string;
  url: string;
  static create(config?: any): Link {
    if (!config) {
      return new Link();
    }
    return new Link(config);
  }
  constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.cssClass = stringOrDefault(config.cssClass);
    this.style = stringOrDefault(config.style);
    this.text = stringOrDefault(config.text);
    this.tooltip = stringOrDefault(config.tooltip);
    this.url = stringOrDefault(config.url);
  }
}
