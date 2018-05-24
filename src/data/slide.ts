import { SlideAction } from 'data/slide-action';
import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';

export class Slide {
  title: String;
  description: String;
  backgroundColor: String;
  backgroundImage: String;
  actions: Array<SlideAction>;

  static create(config: any): Slide {
    if (!config) {
      return new Slide();
    }

    return new Slide(config);
  }

  constructor(config?: any) {
    config = objectOrDefault(config) || {};

    this.title = stringOrDefault(config.title);
    this.description = stringOrDefault(config.description);
    this.actions = arrayOrDefault(config.actions).map(SlideAction.create);
  }

  addAction() {
    this.actions.push(new SlideAction());
  }

  removeAction(action: SlideAction | number) {
    const index = (typeof action === 'number') ? action : this.actions.indexOf(action);
    this.actions.splice(index, 1);
  }
}
