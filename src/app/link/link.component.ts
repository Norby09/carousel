import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Link } from '../../data/link';
import { LanguagesService } from '../languages.service';
import { Language } from 'data/language';
import { Resource } from 'data/resource';

@Component({
  selector: 'bl-carousel-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss', '../app.component.scss']
})
export class LinkComponent implements OnInit, OnChanges {
  /**
  * This property is of type Link sent from a superior level through Input
  * @name    link
  * @type    {Link}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() link: Link = null;
  /**
  * Array containing all the links
  * @name    links
  * @type    {Link[]}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() links: Link[];
  /**
  * This property will hold all the languages available
  * @name    defaultLanguages
  * @type    {undefined}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public defaultLanguages;
  /**
  * This property holds the resource value for a specific resource object
  * @name    resourceValue
  * @type    {undefined}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public resourceValue;
  /**
  * This public property holds boolean values for whether the dropdown is open or closed
  * @name    showDropdown
  * @type    {boolean}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public showDropdown = true;
  /**
  * This property holds the resource name for a specific resource object, this value is generated randomly
  * @name    resourceName
  * @type    {string}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public resourceName: string = "@link" + Math.floor(Math.random() * 10000 + 1);
  /**
  * Array of both languages and associated resources for that language
  * @name    languageAndResources
  * @type    {Language[]}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public languageAndResources = [];
  /**
  * This property is used to update the resource value if the text fields that hold the values change
  * @name    inputValue
  * @type    {string}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public inputValue = '';

  /**
  * This constructor is used to initialize the component with the languageService that holds all the languages
  * @author		Norbert Layis <Norbert.Layis@blackline.com>
  * @added		8/8/2018
  * @memberOf	link.component
  * @example		<caption>Basic Usage</caption>
  */
  constructor(private languageService: LanguagesService) { }

  /**
   * This lifecycle hook is used to initialize different elements in the app. Also here we get the languages from the languageService.
   * If there's already a value for text inside the link object then we push it in the languageAndResource array
   * @method    ngOnInit
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.ngOnInit();
   */
  public ngOnInit(): void {
    this.defaultLanguages = this.languageService.getLanguages();
    if( this.link.text ) {
      this.resourceName = this.link.text.toString();
      this.languageAndResources.push( Language.create({ name  : "en", resources : new Array<Resource>(new Resource({name : this.link.text , value : this.inputValue}))}) );
    } else {
      this.languageAndResources.push( Language.create({ name  : "", resources : new Array<Resource>(new Resource({name : this.resourceName , value : this.inputValue}))}) );
    }
  }

  /**
   * This lifecycle hook is used to bind the new resource value if the inputs change to the existing one in the corresponding resource object
   * @method   ngOnChanges
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.ngOnChanges();
   */
  ngOnChanges() {
    const resourceValues = this.languageService.getResourceValue(this.link.text.toString());
    this.inputValue = resourceValues["en"];
  }

  /**
   * This method is used to process the languages selected into a new array and also remove that selected language from the available
   * languages from the dropdown
   * @method    onSelectLanguage
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.onSelectLanguage();
   */
  public onSelectLanguage(language): void {
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
   * This public method is used to set the showDropdown property to true thus displaying the dropdown open
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
   * This public method is used to update the language array, more specifically the resource value to the one in the textfield
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
    this.link.text = this.resourceName;
  }

  /**
   * This method adds a language object to the language array
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
