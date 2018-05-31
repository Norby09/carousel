import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Type {
  standard: String;
  custom: String;
  customTemplate: String;
  static create(config?: any) {
    if (!config) {
      return new Type({});
    }
    return new Type(config);
  }
  constructor(config: any) {
    this.standard = stringOrDefault(config.standard);
    this.custom = stringOrDefault(config.standard);
    this.customTemplate = stringOrDefault(config.customTemplate);
  }
}
