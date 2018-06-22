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
  languages: Array<I18nElement> = [];
  languageObj: Object;

  itemId = 0;
  languageId = 0;

  LANGUAGES = [ 'cz', 'cs', 'de', 'en', 'es', 'fr', 'hu', 'it', 'jp', 'ja', 'ko', 'nl', 'pl', 'bg', 'pt', 'pt', 'ru', 'tr', 'cn', 'tw'];

  constructor() {
    this.addNewLanguage();
    this.addItem();
  }

  ngOnInit() {
    this.slideshow = Slideshow.create();
    this.type = Type.create();
    this.setting = Setting.create();
    this.languageObj = Object.create(null);
  }
  addNewLanguage() {
    this.languageId++;
    this.element = I18nElement.create({ languageName : '', resources : new Array<ResourceSample>(new ResourceSample({resourceName : '', resourceValue : ''}))});
    this.languages.push(this.element);
  }
  addNewResource = (languageObj: I18nElement): any => {
    languageObj.resources.push( new ResourceSample( { resourceName : '', resourceValue : ''} ));
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
  }
  addItem() {
    ++this.itemId;
    this.items.push(new Items({id : this.itemId}));
  }
  exportItems(format: string = 'json'): string {

    for (let i = 0; i < this.languages.length; i++) {
      const name = this.languages[i].languageName;
      this.languageObj[name] = {};
      for (let j = 0 ; j < this.languages[i].resources.length ; j++) {
        this.languageObj[name][stringOrDefault(this.languages[i].resources[j].resourceName)] = this.languages[i].resources[j].resourceValue;
      }
    }

    switch ((format || '').toLowerCase()) {
      case 'json':
          return JSON.stringify({items: this.items, slideshow: this.slideshow, types: this.type, settings: this.setting, i18n: this.languageObj});
      default:
        console.warn(`Unknown export format'${format}'`);
        return this.toString();
    }
  }
  importItems(config: string, format: string = 'json'): boolean {
    switch (format.toLowerCase()) {
      case 'json':

        const json = JSON.parse(config);

        this.items = json.items;
        this.slideshow = json.slideshow;
        this.type = json.types;
        this.setting = json.settings;
        this.languageObj = json.i18n;

        this.languages = [];

        for( const language in this.languageObj) {
            const element = I18nElement.create({languageName: language});
            const resources = this.languageObj[language];

            for( const resourceName in resources ) {
              element.resources.push(new ResourceSample({'resourceName' : resourceName, 'resourceValue' : resources[resourceName] }));
            }
            this.languages.push(element);
        }
        break;
      default:
        return false;
    }
  }
}
