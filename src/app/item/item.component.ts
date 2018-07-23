import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../data/item';
import { Language } from 'data/language';

@Component({
  selector: 'bl-carousel-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss', '../app.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itm: Item = null;
  @Input() items: Item[];
  @Input() languages : Language[];
  @Input() doc;

  itemId = 1;

  constructor() {}

  ngOnInit() {}

  addItem() {
    ++this.itemId;
    this.items.push(new Item({id : this.itemId}));
  };

  removeItem(item : Item) {
    if(this.items.length > 1) {
      const index = this.items.indexOf(item);
      this.items.splice(index,1);
    }
  }

}
