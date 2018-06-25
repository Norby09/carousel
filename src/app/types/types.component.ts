import { Component, OnInit, Input } from '@angular/core';
import {Type} from '../../data/type';
@Component({
  selector: 'bl-carousel-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss', '../app.component.scss']
})
export class TypesComponent implements OnInit {
  @Input() type: Type = null;
  
  constructor() { }

  ngOnInit() {
    this.type = Type.create();
  }

}
