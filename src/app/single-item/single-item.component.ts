import {Component, Input, OnInit} from '@angular/core';
import {Comp} from '../../data/comp';
import {Items} from '../../data/items';

@Component({
  selector: 'bl-carousel-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  @Input() itm: Items = null;

  constructor() { }

  ngOnInit() {
  }

}
