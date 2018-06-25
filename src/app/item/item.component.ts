import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../data/item';
import { Link } from 'data/link';

@Component({
  selector: 'bl-carousel-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss', '../app.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itm: Item = null;
  @Input() items : Item[];
  @Input() links : Link[];

  itemId = 1; 

  constructor() {
  }

  ngOnInit() {}

  addItem() {
    ++this.itemId;
    this.items.push(new Item({id : this.itemId}));
  }

}
