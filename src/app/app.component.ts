import { Component, OnInit } from '@angular/core';
import { I18nSelectPipe } from '@angular/common';
import { Slide } from 'data/slide';
import { Comp } from 'data/comp';
import { LinksArray } from 'data/links-array';

@Component({
  selector: 'bl-carousel-configurator',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  i18n = {
    edit: 'Edit',
    import: 'Import',
    export: 'Export'
  };

  slides: Array<Slide> = [];
  comp: Comp = null;
  links: Array<LinksArray> = [];
  link: LinksArray;
  saveSlide(slide: Slide): void {
    if (!~this.slides.indexOf(slide)) {
      this.addSlide(slide);
    }
  }
  ngOnInit() {
    this.comp = new Comp();
  }
  addSlide(slide: Slide): void {
    this.slides.push(slide);
  }
  saveLink(link: LinksArray): void {
    if (!~this.links.indexOf(link)) {
      this.adLink(link);
    }
  }
  adLink(link: LinksArray): void {
    this.links.push(link);
    console.log(this.links);
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
  exportItems(format: string = 'json'): string {
    switch ((format || '').toLowerCase()) {
      case 'json':
        return JSON.stringify({ components: this.comp});
      default:
        console.warn(`Unknown export format'${format}'`);
        return this.toString();
    }
  }
  importItems(config: string, format: string = 'json'): boolean {
    switch (format.toLowerCase()) {
      case 'json':
        this.comp = JSON.parse(config).comp;
        return true;
      default:
        return false;
    }
  }
}
