import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Settings {
  defaultTemplateUrl: String = "https://www.blackline.com/path/to/default-template.html";
  templateStyle: String = ".custom-class { font-size: 24px; color: #2e7ac1; }";
  animation: String = "slide" ;

  static create(config?: any) {
    if (!config) {
      return new Settings({});
    }
    return new Settings(config);
  }
  constructor(config?: any) {}
}
