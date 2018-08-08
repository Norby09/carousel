import { Component, OnInit, Input } from '@angular/core';
import { Type } from '../../data/type';

@Component({
  selector: 'bl-carousel-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss', '../app.component.scss']
})
export class TypesComponent implements OnInit {
  /**
  * This property of type Type is sent from a superior level through Input
  * @name    type
  * @type    {Type}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() type: Type = null;

  /**
  * No data processing done here
  * @author		Norbert Layis <Norbert.Layis@blackline.com>
  * @added		8/8/2018
  * @memberOf	types.component
  * @example		<caption>Basic Usage</caption>
  */
  constructor() {}

  /**
   * This method is used to create a new instance of type Type
   * @method   ngOnInit
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.ngOnInit();
   */
  ngOnInit() {
     this.type = Type.create();
  }

}
