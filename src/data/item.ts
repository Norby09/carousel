import {Comp} from './comp';

export class Item {
  backgroundColor: string;
  backgroundUrl: string;
  name: string;
  type = 1;
  id: number;
  components: Comp;

  constructor(config?: any) {
    this.components = new Comp();
    this.id = config.id;
    this.type = config.type ? config.type : 1;
  }
}


