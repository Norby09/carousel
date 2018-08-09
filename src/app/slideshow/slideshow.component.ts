import { Component, Input } from '@angular/core';
import {Slideshow} from '../../data/slideshow';
@Component({
  selector: 'bl-carousel-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss', '../app.component.scss']
})
export class SlideshowComponent {
  /**
  * This property is used to hold an instance of the Slideshow object
  * @name    slideshow
  * @type    {Slideshow}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() slideshow: Slideshow = null;

}
