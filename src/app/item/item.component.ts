import { Component, OnInit } from '@angular/core';
import { Comp } from 'data/comp';
import { LinksArray } from 'data/links-array';
import {Slide} from '../../data/slide';
import {Items} from '../../data/items';
import {Slideshow} from '../../data/slideshow';
import {Type} from '../../data/type';
import {Setting} from '../../data/setting';
import {I18nElement} from '../../data/i18nelement';
import {stringOrDefault} from '../../utils/value-or-default';

@Component({
  selector: 'bl-carousel-carousel-element',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss', '../app.component.scss']
})
export class ItemComponent implements OnInit {
  slides: Array<Slide> = [];
  links: Array<LinksArray> = [];
  link: LinksArray;
  items: Array<Items> = [];
  slideshow: Slideshow = null;
  type: Type = null;
  setting: Setting = null;
  element: I18nElement = null;
  arrayOfI18n: Array<I18nElement> = [];
  i18n: Object;

  itemId = 0;
  languageId = 0;

  // bindedElement = this.bindLanguageAndAddToMainObject.bind(this);
  constructor() {
    this.addNewLanguage();
    this.addItem();
  }

  ngOnInit() {
    this.slideshow = Slideshow.create();
    this.type = Type.create();
    this.setting = Setting.create();
    this.i18n = Object.create(null);
  }
  addNewLanguage() {
    this.languageId++;
    this.element = I18nElement.create();
    this.arrayOfI18n.push(this.element);
    console.log(this.element);
  }
  bindLanguageAndAddToMainObject: any = () => {
    // console.log(this);
    for (let i = 0; i < this.arrayOfI18n.length; i++) {
      const name = this.arrayOfI18n[i].languageName;
      this.i18n[name] = {};
      this.i18n[name][this.arrayOfI18n[i].title] = this.arrayOfI18n[i].description;
      console.log(this.i18n);
    }
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
    console.log('Link  : ', this.links);
  }
  addItem() {
    ++this.itemId;
    this.items.push(new Items({id : this.itemId}));
  }
  /*pushObject(item: Items): void {
    this.items.push(item);
  }*/
  exportItems(format: string = 'json'): string {
    switch ((format || '').toLowerCase()) {
      case 'json':
          console.log(this.items);
          console.log(this.i18n);
          return JSON.stringify({items: this.items, slideshow: this.slideshow, type: this.type, settings: this.setting, i18n: this.i18n});
      default:
        console.warn(`Unknown export format'${format}'`);
        return this.toString();
    }
  }
  importItems(config: string, format: string = 'json'): boolean {
    switch (format.toLowerCase()) {
      case 'json':
        return true;
      default:
        return false;
    }
  }
}
