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
import {bindLanguageName} from '../i18n/i18n.component';
import {ResourceSample} from '../../data/resourceSample';

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
  // i18n: Map<String, Array<ResourceSample>;
  i18n: Object;
  itemId = 0;
  languageId = 0;
  titles;
  LANGUAGES = [ 'cz', 'cs', 'de', 'en', 'es', 'fr', 'hu', 'it', 'jp', 'ja', 'ko', 'nl', 'pl', 'bg', 'pt', 'pt', 'ru', 'tr', 'cn', 'tw'];

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
    this.element = I18nElement.create({ languageName : '', resources : new Array<ResourceSample>(new ResourceSample({resourceName : '', resourceValue : ''}))});

    console.log(this.element.resources);
    this.arrayOfI18n.push(this.element);
    console.log(this.element);
  }
  addNewResource = (i18n: I18nElement): any => {
    i18n.resources.push( new ResourceSample( { resourceName : '', resourceValue : ''} ));
  }
  bindLanguageAndAddToMainObject: any = () => {

    for (let i = 0; i < this.arrayOfI18n.length; i++) {
      const name = this.arrayOfI18n[i].languageName;
      this.i18n[name] = {};
      for (let j = 0 ; j < this.arrayOfI18n[i].resources.length ; j++) {
        this.i18n[name][stringOrDefault(this.arrayOfI18n[i].resources[j].resourceName)] = this.arrayOfI18n[i].resources[j].resourceValue;
      }
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
        this.items = JSON.parse(config).items;
        this.slideshow = JSON.parse(config).slideshow;
        this.type = JSON.parse(config).type;
        this.setting = JSON.parse(config).setting;
        this.i18n = JSON.parse(config).i18n;
        this.titles = JSON.parse(config).items.components;
        console.log(this.titles);
        break;
      default:
        return false;
    }
  }
}
