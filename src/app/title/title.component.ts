import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Title } from '../../data/title';
import { LanguagesService } from '../languages.service';
import { Language } from 'data/language';
import { Resource } from 'data/resource';
import {isMethodMetadata} from '@angular/compiler-cli';
import {processProjectedNode} from '@angular/core/src/render3/node_manipulation';

@Component({
  selector: 'bl-carousel-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss', '../app.component.scss']
})
export class TitleComponent implements OnInit, OnChanges {
  /**
  * Title of the carousel slider item
  * @name    title
  * @type    {Title}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() title: Title = null;
  /**
  * An array of the resources available for a specific language
  * @name    resources
  * @type    { object[] }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  resources;
  /**
  * An array of languages from which the user can select
  * @name    defaultLanguages
  * @type    { string[] }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  defaultLanguages;
  /**
  * The resource value associated for a resource object
  * @name    resourceValue
  * @type    { string }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  resourceValue;
  /**
  * Changes the state of a dropdown, whether it's open or closed
  * @name    showDropdown
  * @type    {  boolean }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  showDropdown = true;
  /**
  * The resource name contained in a resource object, name generated randomly
  * @name    resourceName
  * @type    {  string  }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  resourceName = "@title" + Math.floor(Math.random() * 10000 + 1);
  /**
  * Used to bind to resourceValue if the input detects changes
  * @name    inputValue
  * @type    {  string  }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  inputValue: string = '';
  /**
  * Array that contains languages and the resources associated for each language
  * @name    languageAndResources
  * @type    {  lang && resources []}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  languageAndResources = [];

  /**
   * Constructor for title component
   * @method   constructor()
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined} No return value
   * @example    <caption>Initializes service</caption>
   * this.constructor;
   */
  constructor(private languageService: LanguagesService) {
  }

  /**
   * Angular component lifecycle hook used to initialize the component and make different operations
   * @method    ngOnInit
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.ngOnInit();
   */
   public ngOnInit(): void {
    this.defaultLanguages = this.languageService.getLanguages();
    if( this.title.text ) {
      this.languageAndResources.push( Language.create({ name  : "en", resources : new Array<Resource>(new Resource({name : this.title.text , value : this.inputValue}))}) );
      this.resourceName = this.title.text.toString();
    } else {
      this.languageAndResources.push( Language.create({ name  : " ", resources : new Array<Resource>(new Resource({name : this.resourceName , value : ""}))}) );
    }
  }

  /**
   * Angular component lifecycle hook used to detect changes on input and modify specific values with the ones in the inputs
   * @method   ngOnChanges
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.ngOnChanges();
   */
  public ngOnChanges(): void {
    const resourceValues = this.languageService.getResourceValue(this.title.text.toString());
    this.inputValue = resourceValues["en"];
  }

  /**
   * Click handler that changes the state of the dropdown
   * @method   onClick
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.onClick();
   */
  public onClick(): void {
    this.showDropdown = true;
  }

  /**
   * Selects a language from the dropdown, and hides it from the dropdown list
   * @method   onSelectLanguage
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.onSelectLanguage();
   */
  public onSelectLanguage(language) {
    this.showDropdown = !this.showDropdown;
    this.languageAndResources.pop();
    this.languageAndResources.push(Language.create({
      name: language.lang,
      resources: new Array<Resource>(new Resource({name: this.resourceName, value: ""}))
    }));
    for (let i = 0; i < this.defaultLanguages.length; i++) {
      if (this.defaultLanguages[i].lang === language.lang) {
        this.defaultLanguages.splice(i, 1);
      }
    }
  }

  /**
   * Method that adds a specific resource to the correct language in the languageService service
   * @method   onInputResource
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.onInputResource();
   */
  public onInputResource(resourceValue) {
    const lang = this.languageAndResources.pop();
    this.languageAndResources.push( Language.create({ name  : lang.name , resources : new Array<Resource>(new Resource({name : this.resourceName , value : resourceValue}))}) );
    this.languageService.saveLanguageAndResource(lang.name, this.resourceName, resourceValue);
    this.title.text = this.resourceName;
  }

  /**
   * Adds the selected language to the array of languages
   * @method   addLanguage
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.addLanguage();
   */
  public addLanguage() {
    this.languageAndResources.push( Language.create({ name  : "", resources : new Array<Resource>(new Resource({name : this.resourceName , value : ""}))}) );
  }
}
