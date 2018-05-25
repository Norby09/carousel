import { Component, OnInit, Input } from '@angular/core';
import {LinksArray} from '../../data/links-array';
import {Comp} from '../../data/comp';

@Component({
  selector: 'bl-carousel-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  @Input() comp: Comp = null;
  debugger;
  constructor() { }
  ngOnInit() {
    if (!this.comp) {
      this.resetLink();
    }
  }
  resetLink() {
    this.comp = new Comp();
  }
}
