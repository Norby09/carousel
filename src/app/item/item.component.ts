import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../data/item';
import { TypesService } from '../types.service';

/**
* Property responsible with storing unique item id for each new item created
* @name    itemId
* @type    {  number  }
* @author    Norbert Layis <Norbert.Layis@blackline.com>
* @added    8/8/2018
*/
let itemId = 1;

@Component({
  selector: 'bl-carousel-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss', '../app.component.scss']
})
export class ItemComponent implements OnInit {
  /**
  * Property that handles through Input each new instantiation of an Item class
  * @name    item
  * @type    {Item}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() item: Item = null;

  /**
  * Array that holds all the items created
  * @name    items
  * @type    {  item[]  }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() items: Item[];
  /**
  * Array that holds all possible categories of types
  * @name    types
  * @type    {  Array  }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  types = [];
  /**
  * Constructor used to initiate the item component with the typeService and store the types in a property
  * @author		Norbert Layis <Norbert.Layis@blackline.com>
  * @added		8/8/2018
  * @memberOf	item.component
  * @example		<caption>Basic Usage</caption>
  */
  constructor(public typeService: TypesService) {
    this.types = typeService.getTypes();
  }

  /**
   * No neccessary processing to be done here
   * @method   ngOnInit
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.ngOnInit();
   */
  ngOnInit() {
  }

  /**
   * Adds a new item to the items array, each item with a unique Id
   * @method   addItem
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.addItem();
   */
  addItem() {
    if (this.items) {
      const element = this.items[this.items.length - 1];
      itemId = element.id;
      this.items.push(new Item({id: ++itemId}));
    }
  }

  /**
   * Removes a given item from the items array
   * @method   removeItem
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.removeItem();
   */
  removeItem(item: Item) {
    if (this.items.length > 1) {
      const index = this.items.indexOf(item);
      this.items.splice(index,1);
    }
  }

}
