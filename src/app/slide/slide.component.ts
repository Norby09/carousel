import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Slide } from 'data/slide';

@Component({
  selector: 'bl-carousel-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  @Input() slide: Slide = null;
  saved = false;

  i18n = {
    insertTitle: 'Insert Title...',
    insertDescription: 'Insert Description...',
    backgroundSettings: 'Background Settings',
    insertBackgroundColor: 'Choose Background Color...',
    insertBackgroundImage: 'Choose Background Image...',
    addAction: 'Add Action',
    addSlide: 'Add Slide',
    updateSlide: 'Update Slide'
  };

  @Output() save: EventEmitter<Slide> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (!this.slide) {
      this.reset();
    }
  }

  reset() {
    this.slide = new Slide();
    this.saved = false;
  }

  edit(slide: Slide) {
    this.slide = slide;
    this.saved = true;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.save.emit(this.slide);
    this.reset();
  }

}
