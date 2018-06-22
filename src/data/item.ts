import {Comp} from './comp';

export class Item {
  backgroundColor: String;
  backgroundUrl: String;
  name: String;
  type: String;
  id: number;
  components: Comp;

  constructor(config?: any) {
    this.components = new Comp();
    this.id = config.id;
  }
}


