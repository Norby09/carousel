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

@Component({
  selector: 'bl-carousel-carousel-item-list',
  templateUrl: './itemList.component.html',
  styleUrls: ['./itemList.component.scss', '../app.component.scss']
})

export class ItemListComponent implements OnInit {
  items: Item[] = [];
  slideshow: Slideshow = null;
  type: Type = null;
  setting: Settings = null;
  languages: Language[] = [];
  languageObj: Object;

  constructor(public languageService : LanguagesService, private http: HttpClient) {
    this.items.push(new Item({id : 1}));
  }

  ngOnInit() {
    this.languageObj = Object.create(null);
    this.slideshow = Slideshow.create();
    this.type = Type.create();
    this.setting = Settings.create();
  }

  export(format: string = 'json'): string {

    this.languages = this.languageService.getLanguagesAndResources();

    console.log('Languages on export : ', this.languages);

    for (let i = 0; i < this.languages.length; i++) {
      const name = this.languages[i].name;
      const language = this.languageObj[name] = {};

      for (let j = 0 ; j < this.languages[i].resources.length ; j++) {

        const resource = this.languages[i].resources[j];
        language[ stringOrDefault( resource.name) ] = resource.value;
      }
    }

    switch ((format).toLowerCase()) {
      case 'json':
          const retVal = JSON.stringify({items: this.items, slideshow: this.slideshow, types: this.type, settings: this.setting, i18n: this.languageObj});
          this.http.post('http://localhost:3000/save', {data : retVal}).subscribe(
            res => {
              console.log(res);
              const frame = <HTMLIFrameElement> document.getElementById('previewIframe');
              frame.src = frame.src;
            },
            (err) => {
              console.log(err.error);
              console.log(err.name);
              console.log(err.message);
              console.log(err.status);
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

        this.items = json.items;

        console.log(this.items);

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
        return true;
      default:
        return false;
    }
  }
}
