import { Component } from '@angular/core';
import { I18nSelectPipe } from '@angular/common';
import { Slide } from 'data/slide';

@Component({
  selector: 'bl-carousel-configurator',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  i18n = {
    edit: 'Edit',
    import: 'Import',
    export: 'Export'
  };

  slides: Array<Slide> = [];

  saveSlide(slide: Slide): void {
    if (!~this.slides.indexOf(slide)) {
      this.addSlide(slide);
    }
  }

  addSlide(slide: Slide): void {
    this.slides.push(slide);
  }

  removeSlide(slide: Slide | number): void {
    const index = (typeof slide === 'number') ? slide : this.slides.indexOf(slide);
    if (!~index) {
      this.slides.splice(index, 1);
    }
  }

  removeAllSlides(): void {
    this.slides = [];
  }

  import(config: string, format: string = 'json'): boolean {
    switch (format.toLowerCase()) {
      case 'json':
        this.slides = JSON.parse(config).slides;
        return true;
      default:
        return false;
    }
  }

  export(format: string = 'json'): string {
    switch ((format || '').toLowerCase()) {
      case 'json':
        return JSON.stringify({ slides: this.slides });
      default:
        console.warn(`Unknown export format '${format}'`);
        return this.toString();
    }
  }
}
