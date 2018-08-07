import {Comp} from './comp';

export class Item {
  backgroundColor: String;
  backgroundUrl: String;
  name: String;
  type = 1;
  id: number;
  components: Comp;

  constructor(config?: any) {
    this.backgroundColor = config.backgroundColor;
    this.backgroundUrl = config.backgroundUrl; 
    this.name = config.name;
    this.type = config.type ? config.type : 1;
    this.id = config.id;
    this.components = config.components ? new Comp(config.components) : new Comp();
  }
}


