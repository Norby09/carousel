import { Component, OnInit } from '@angular/core';
import { Link } from 'data/link';
import { Items } from '../../data/items';
import { Slideshow } from '../../data/slideshow';
import { Type } from '../../data/type';
import { Setting } from '../../data/setting';
import { Language } from '../../data/language';
import { Resource } from '../../data/resource';
import { stringOrDefault } from '../../utils/value-or-default';
import { LanguagesService} from '../languages.service';
@Component({
  selector: 'bl-carousel-carousel-element',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss', '../app.component.scss']
})

export class ItemComponent implements OnInit {
  links: Array<Link> = [];
  link: Link;
  items: Array<Items> = [];
  slideshow: Slideshow = null;
  type: Type = null;
  setting: Setting = null;
  languages: Array<Language> = [];
  languageObj: Object;

  itemId = 0;

  selectableLanguages = []; 

  constructor(private _languageService: LanguagesService) {
    this.addNewLanguage();
    this.addItem();
  }

  ngOnInit() {
    this.slideshow = Slideshow.create();
    this.type = Type.create();
    this.setting = Setting.create();
    this.languageObj = Object.create(null);
    this.selectableLanguages = this._languageService.getLanguages();
  }

  addNewLanguage() {
    const element = Language.create({ languageName : '', resources : new Array<Resource>(new Resource({resourceName : '', resourceValue : ''}))});
    this.languages.push(element);
  }

  addNewResource = (language: Language): any => {
    language.resources.push( new Resource( { resourceName : '', resourceValue : ''} ));
  }

  saveLink(link: Link): void {
    if (!~this.links.indexOf(link)) {
      this.addLink(link);
    }
  }

  addLink(link: Link): void {
    this.links.push(link);
  }

  addItem() {
    ++this.itemId;
    this.items.push(new Items({id : this.itemId}));
  }

  exportItems(format: string = 'json'): string {

    for (let i = 0; i < this.languages.length; i++) {

      const name = this.languages[i].languageName;
      const language = this.languageObj[name] = {};

      for (let j = 0 ; j < this.languages[i].resources.length ; j++) {

        const resource = this.languages[i].resources[j];
        language[ stringOrDefault( resource.resourceName) ] = resource.resourceValue;
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
            const element = Language.create({languageName: language});
            const resources = this.languageObj[language];

            for( const resourceName in resources ) {
              element.resources.push(new Resource({'resourceName' : resourceName, 'resourceValue' : resources[resourceName] }));
            }
            this.languages.push(element);
        }
        break;
      default:
        return false;
    }
  }
}
