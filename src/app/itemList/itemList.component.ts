import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Link } from 'data/link';
import { Item } from '../../data/item';
import { Slideshow } from '../../data/slideshow';
import { Type } from '../../data/type';
import { Settings } from '../../data/settings';
import { Language } from '../../data/language';
import { Resource } from '../../data/resource';
import { stringOrDefault } from '../../utils/value-or-default';
import { LanguagesService } from '../languages.service';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';


@Component({
  selector: 'bl-carousel-carousel-item-list',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.component.scss', '../app.component.scss']
})
export class ItemListComponent implements OnInit{
  items: Item[] = [];
  slideshow: Slideshow = null;
  type: Type = null;
  setting: Settings = null;
  languages: Language[] = [];
  languageObj: Object;
  additionalLanguages;


  constructor(public languageService: LanguagesService, private http: HttpClient, @Inject(DOCUMENT) public doc: any) {
    this.items.push(new Item({id : 1}));
  }

  ngOnInit() {
    this.languageObj = Object.create(null);
    this.slideshow = Slideshow.create();
    this.type = Type.create();
    this.setting = Settings.create();
  }
  export(format: string = 'json'): string {
    this.additionalLanguages = this.languageService.getLanguagesAndResources();
    for (let i = 0; i < this.additionalLanguages.length; i++) {
      // current additional language
      const currentLang = this.additionalLanguages[i]
        // corresponding language that was prior to updates
        , beforeLang = this.languages.find(language => language.name === currentLang.name)
        // resource key names for newly inserted i18n strings
        , currentLangKeys = currentLang && currentLang.resources.map(element => element.name)
        // resource key names for existing i18n strings
        , beforeLangKeys = beforeLang && beforeLang.resources.map(element => element.name)
      ;

      if (!beforeLang) {
        this.languages.push(currentLang);
      }
      for (let j = 0 ; j < currentLangKeys.length ; j++ ) {
        if (beforeLang) {
          if (beforeLangKeys.indexOf(currentLangKeys[i]) > -1) {
            let resource = beforeLang.resources.find(res => res.name === currentLangKeys[i]);
            let resourceAditional = currentLang.resources.find(res => res.name === currentLangKeys[i]);
            resource.value = resourceAditional.value;
          } else {
            let newResource = this.additionalLanguages[i].resources.find(element => element.name !== beforeLangKeys);
            let languageName = this.additionalLanguages[i].name;
            let foundElement = this.languages.find(element => element.name === languageName)
            foundElement.resources.push(newResource);
            // this.languages.find(element => element.name !== currentLangKeys[i])
          }
        }
      }
    }
    for (let i = 0; i < this.languages.length; i++) {
      const name = this.languages[i].name;
      const language = this.languageObj[name] = {};

      for (let j = 0 ; j < this.languages[i].resources.length ; j++) {

        const resource = this.languages[i].resources[j];
        language[ stringOrDefault( resource.name) ] = resource.value;
      }
    }
    format = format.toLowerCase();
    const self = this;

    switch (format) {
      case 'json':
          const retVal = JSON.stringify({items: this.items, slideshow: this.slideshow, types: this.type, settings: this.setting, i18n: this.languageObj});
          this.http.post('http://localhost:3000/save', {data : retVal}).subscribe(
            res => {
              const frame = self.doc.getElementById('previewIframe');
              frame.contentWindow.location.reload();
            },
            err => {
              console.error(err.error, err.message);
            }
          );
          return retVal;
      default:
        console.warn(`Unknown export format'${format}'`);
        return `Unknown export format ${format}`;
    }
  }

  import(config: string, format: string = 'json'): boolean {
    switch (format.toLowerCase()) {
      case 'json':
        let json;
        try {
          JSON.parse(config);
        } catch (e) {
          return false;
        }
        json = JSON.parse(config);

        this.slideshow = json.slideshow;
        this.type = json.types;
        this.setting = json.settings;
        this.languageObj = json.i18n;

        this.languages = [];

        for (const language in this.languageObj) {
            const element = Language.create({name : language});
            const resources = this.languageObj[language];
            for (const resourceName in resources ) {
              element.resources.push(new Resource({name : resourceName, value : resources[resourceName] }));
            }
            this.languages.push(element);
        }

        this.items = [];
        for(let i=0; i<json.items.length; i++) {
          this.items.push( new Item(json.items[i]) );
        }

        this.languageService.loadI18n(this.languages);
        const retVal = JSON.stringify({items: this.items, slideshow: this.slideshow, types: this.type, settings: this.setting, i18n: this.languageObj});
        const self = this;
        this.http.post('http://localhost:3000/save', {data : retVal}).subscribe(
          res => {
            const frame = self.doc.getElementById('previewIframe');
            frame.contentWindow.location.reload();
          },
          err => {
            console.error(err.error, err.message);
          }
        );
        return true;
      default:
        return false;
    }
  }
}
