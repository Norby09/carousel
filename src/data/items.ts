import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {Comp} from './comp';
export class Items {
  backgroundColor: String;
  backgroundUrl: String;
  name: String;
  type: String;
  id: number;
  components: Comp;

  constructor(config?: any) {
    console.log('Config : ', Object.values(config));
    this.components = new Comp();
    this.id = config.id;
  }
}


