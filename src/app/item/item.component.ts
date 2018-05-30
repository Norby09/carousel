import { Component, OnInit } from '@angular/core';
import { Comp } from 'data/comp';
import { LinksArray } from 'data/links-array';
import {Slide} from '../../data/slide';
import {Items} from '../../data/items';

@Component({
  selector: 'bl-carousel-carousel-element',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  slides: Array<Slide> = [];
  comp: Comp = null;
  links: Array<LinksArray> = [];
  link: LinksArray;
  items: Array<Items> = [];
  itm: Items = null;
  constructor() { }

  ngOnInit() {
    this.comp = new Comp();
    this.itm = new Items();
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
  addItem() {
    this.items.push(new Items());
  }
  pushObject(item: Items): void {
    this.items.push(item);
  }
  exportItems(format: string = 'json'): string {
    switch ((format || '').toLowerCase()) {
      case 'json':
          this.itm.components = this.comp;
          console.log(this.items);
          this.pushObject(this.itm);
          return JSON.stringify({items: this.items});
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
