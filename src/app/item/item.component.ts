import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../data/item';
import { TypesService } from '../types.service';

let itemId = 1;

@Component({
  selector: 'bl-carousel-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss', '../app.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item = null;
  @Input() items: Item[];

  types = [];

  constructor(public typeService: TypesService ) {
    this.types = typeService.getTypes();
  }

  ngOnInit() {
  }

  addItem() {
    if (this.items) {
      const element = this.items[this.items.length - 1];
      itemId = element.id;
      this.items.push(new Item({id: ++itemId}));
    }
  }

  removeItem(item: Item) {
    if (this.items.length > 1) {
      const index = this.items.indexOf(item);
      this.items.splice(index,1);
    }
  }

}
