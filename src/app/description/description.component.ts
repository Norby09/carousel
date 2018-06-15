import { Component, OnInit, Input } from '@angular/core';
import {Description} from '../../data/description';
import {Comp} from '../../data/comp';
@Component({
  selector: 'bl-carousel-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss', '../app.component.scss']
})
export class DescriptionComponent implements OnInit {
  description: Description = null;
  @Input() comp: Comp = null;
  constructor() { }

  ngOnInit() {
    this.description = new Description();
  }
  addToComponentsDescription(comp: Comp) {
    comp.description = this.description;
  }
}
