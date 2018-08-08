import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Link } from '../../data/link';
import { Comp } from '../../data/comp';

@Component({
  selector: 'bl-carousel-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss', '../app.component.scss']
})
export class ComponentsComponent implements OnInit {
  /**
  * Instantiation of a Comp Class sent from a superior level through Input
  * @name    comp
  * @type    {Comp}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() comp: Comp = null;
  /**
  * Array of link objects sent from parent through Input
  * @name    links
  * @type    {link[]}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() links: Link[] = null;
  /**
  * Event Emitter to send data back to the parent through Output
  * @name    save
  * @type    {EventEmitter<Comp>}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Output() save: EventEmitter<Comp> = new EventEmitter();

  /**
  * Basic constructor, no operations done here
  * @author		Norbert Layis <Norbert.Layis@blackline.com>
  * @added		8/8/2018
  * @memberOf	components.component
  * @example		<caption>Basic Usage</caption>
  */
  constructor() {
  }

  /**
   * No operations or data processing necessary here
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
   * Public method responsible with emitting(sending) data back to the parent
   * @method   onSubmitItems
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.onSubmitItems();
   */
  public onSubmitItems() {
    this.save.emit(this.comp);
  }
}
