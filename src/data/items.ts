import { stringOrDefault, objectOrDefault, arrayOrDefault } from 'utils/value-or-default';
import {Component} from './component';
export class Items {
  backgroundColor: String;
  backgroundUrl: String;
  name: String;
  type: String;
  components: Component;
}
