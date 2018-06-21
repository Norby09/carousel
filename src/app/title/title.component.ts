import { Component, OnInit, Input, Output } from '@angular/core';
import {Title} from '../../data/title';
import {Comp} from '../../data/comp';
@Component({
  selector: 'bl-carousel-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss', '../app.component.scss']
})
export class TitleComponent implements OnInit {
  title: Title = null;
  @Input() comp: Comp = null;
  constructor() { }

  ngOnInit() {
    this.title = new Title();
  }
  addToComponents(comp: Comp): void {
    comp.title = this.title;
  }
}
