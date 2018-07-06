import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Settings {
  defaultTemplateUrl: String;
  templateStyle: String;
  animation: String = "slide" ;

  static create(config?: any) {
    if (!config) {
      return new Settings();
    }
    return new Settings(config);
  }
  constructor(config?: any) {
    config = config ? objectOrDefault(config) : {};
    this.defaultTemplateUrl = stringOrDefault(config.defaultTemplateUrl);
    this.templateStyle = stringOrDefault(config.templateStyle);
  }
}
