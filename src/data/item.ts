import {Comp} from './comp';

export class Item {
  backgroundColor: String;
  backgroundUrl: String;
  name: String;
  type = 1;
  id: number;
  components: Comp;

  constructor(config?: any) {
    this.components = new Comp();
    this.id = config.id;
    this.type = config.type ? config.type : 1;
  }
}


