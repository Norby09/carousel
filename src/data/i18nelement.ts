import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class I18nElement {
  title: string;
  languageName: string;
  description: string;
  static create(config?: any): I18nElement {
    if (!config) {
      return new I18nElement();
    }
    return new I18nElement(config);
  }
  constructor(config?: any) {
    config = objectOrDefault(config) || {};
    this.languageName = stringOrDefault(config.languageName)
    this.title = stringOrDefault(config.title);
    this.description = stringOrDefault(config.description);
  }
}
