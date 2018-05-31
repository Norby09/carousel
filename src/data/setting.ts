import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Setting {
  defaultTemplateUrl: String;
  templateStyle: String;
  animation: String;
  static create(config?: any) {
    if (!config) {
      return new Setting({});
    }
    return new Setting(config);
  }
  constructor(config: any) {
    this.defaultTemplateUrl = stringOrDefault(config.defaultTemplateUrl);
    this.templateStyle = stringOrDefault(config.templateStyle);
    this.animation = stringOrDefault(config.animation);
  }
}
