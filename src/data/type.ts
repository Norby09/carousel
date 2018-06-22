import { stringOrDefault, objectOrDefault, arrayOrDefault,numberOrDefault } from 'utils/value-or-default';

export class Type {
  standard: number = 1;
  custom: number = 2;
  customTemplate: number = 3;
  static create(config?: any) {
    if (!config) {
      return new Type({});
    }
    return new Type(config);
  }
  constructor(config?: any) {
  }
}
