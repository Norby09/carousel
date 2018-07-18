import { Component, OnInit, Input } from '@angular/core';
import {Slideshow} from '../../data/slideshow';
@Component({
  selector: 'bl-carousel-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss', '../app.component.scss']
})
export class SlideshowComponent implements OnInit {
  @Input() slideshow: Slideshow = null;

  ngOnInit(){
    this.slideshow = Slideshow.create();
  }

}
