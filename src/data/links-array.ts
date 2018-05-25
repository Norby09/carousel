import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class LinksArray {
  cssClass: String;
  style: String;
  text: String;
  tooltip: String;
  url: String;
  static create(config: any): LinksArray {
    if (!config) {
      return new LinksArray();
    }
    return new LinksArray(config);
  }
  constructor(config?: any) {
    debugger;
    config = objectOrDefault(config) || {};
    this.cssClass = stringOrDefault(config.cssClass);
    this.style = stringOrDefault(config.style);
    this.text = stringOrDefault(config.text);
    this.tooltip = stringOrDefault(config.tooltip);
    this.url = stringOrDefault(config.url);
  }
}
