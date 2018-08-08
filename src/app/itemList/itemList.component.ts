import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class ItemListComponent implements OnInit {
  /**
  * Array containing all the items in the application 
  * @name    items
  * @type    {Item[]}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  items: Item[] = [];
  /**
  * Object of type Slideshow
  * @name    slideshow
  * @type    {Slideshow}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  slideshow: Slideshow = null;
  /**
  * Property of type Type
  * @name    type
  * @type    {Type}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  type: Type = null;
  /**
  * Property/object of type Settings
  * @name    setting
  * @type    {Settings}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  setting: Settings = null;
  /**
  * Array containing languages
  * @name    languages
  * @type    {Language[]}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  languages: Language[] = [];
  /**
  * Property of type Object, using this property we will construct internationalization object properly
  * @name    languageObj
  * @type    {Object}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  languageObj: Object;
  /**
  * Property that holds the languages the user will select
  * @name    additionalLanguages
  * @type    {undefined}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  additionalLanguages;

  /**
  * Constructor of the itemList component that initializes the languageService, HttpClient and doc
  * @author		Norbert Layis <Norbert.Layis@blackline.com>
  * @added		8/8/2018
  * @memberOf	itemList.component
  * @example		<caption>Basic Usage</caption>
  */
  constructor(public languageService: LanguagesService, private http: HttpClient, @Inject(DOCUMENT) public doc: any) {
    this.items.push(new Item({id : 1}));
  }

  /**
   * Public method used to initiate the component, instantiating the properties that are types of predefined objects
   * @method   ngOnInit
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.ngOnInit();
   */
  public ngOnInit() {
    this.languageObj = Object.create(null);
    this.slideshow = Slideshow.create();
    this.type = Type.create();
    this.setting = Settings.create();
  }

  /**
   * This public method is responsible with generating a valid json based on specific inputs and also with processing data such as
   * creating and modifying the internationalization object. There's also a http call that writes the json to a config file that is
   * later taken by the carousel and then generating slides
   * @method   export
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {string} A valid json if everything went fine else an error message
   * @example    <caption>Basic Usage</caption>
   * this.export();
   */
  public export(format: string = 'json'): string {
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
        return `Unknown export format ${format}`;
    }
  }

  /**
   * This public method is responsible with taking in a valid json and processing it. If the json is valid, the json will be propagated through
   * the app and based on the input several components will be created, each type of object from the json corresponding to a type of object in the app.
   * There's also an http call that, just as export writes in a config file from which the carousel takes the information and generates slides
   * @method   import
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {boolean}  True if all items were created correctly and no other errors were encountered, else it generates error
   * @example    <caption>Basic Usage</caption>
   * this.import();
   */
  public import(config: string, format: string = 'json'): boolean {
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

        this.languageService.setI18n(this.languages);
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
