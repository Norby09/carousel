import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class SlideAction {
  url: String;
  text: String;

  static create(config: any): SlideAction {
    if (!config) {
      return new SlideAction();
    }

    return new SlideAction(config);
  }

  constructor(config?: any) {
    config = objectOrDefault(config) || {};
    this.text = stringOrDefault(config.text);
    this.url = stringOrDefault(config.url);
  }
}
