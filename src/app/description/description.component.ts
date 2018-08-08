import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { Description } from '../../data/description';
import { LanguagesService } from '../languages.service';
import { Language } from '../../data/language';
import { Resource } from 'data/resource';

@Component({
  selector: 'bl-carousel-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss', '../app.component.scss']
})
export class DescriptionComponent implements OnInit, OnChanges {
  /**
  * Instantiation of a description object comming from a superior level as Input
  * @name    description
  * @type    {Description}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() description: Description;
  /**
  * Array of default languages available in the context of our application
  * @name    defaultLanguages
  * @type    { string[] }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public defaultLanguages = [];
  /**
  * The corresponding resource value for a specific resource object
  * @name    resourceValue
  * @type    {  string  }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public resourceValue: string;
  /**
  * Boolean value that decides whether the dropdown will be open or closed
  * @name    showDropdown
  * @type    {  boolean   } By default true
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public showDropdown: boolean = true;
  /**
  * The corresponding resource name for a resource object generated randomly
  * @name    resourceName
  * @type    {  string  }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public resourceName: string = "@description" + Math.floor(Math.random() * 10000 + 1);
  /**
  * Array with objects that contain both the language and the associated resources for each language
  * @name    languageAndResources
  * @type    { lang && resources[]}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public languageAndResources = [];
  /**
  * Used to apply changes detected in inputs for resource values
  * @name    inputValue
  * @type    {  string  }
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  public inputValue: string;
  /**
  * Initializes the component with the LanguageService
  * @author		Norbert Layis <Norbert.Layis@blackline.com>
  * @added		8/8/2018
  * @memberOf	description.component
  * @example		<caption>Basic Usage</caption>
  */
  constructor(private languageService: LanguagesService) {}

  /**
   * Initializes the component and processes data if that data already exists
   * @method   ngOnInit
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined} No return type
   * @example    <caption>Basic Usage</caption>
   * this.ngOnInit();
   */
  public ngOnInit(): void {
    this.defaultLanguages = this.languageService.getLanguages();
    if (this.description.text) {
      this.languageAndResources.push( Language.create({ name  : "en", resources : new Array<Resource>(new Resource({name : this.description.text , value : this.inputValue}))}) );
      this.resourceName = this.description.text;
    } else {
      this.languageAndResources.push( Language.create({ name  : " ", resources : new Array<Resource>(new Resource({name : this.resourceName , value : this.inputValue}))}) );
    }
  }

  /**
   * If a change is detected on the inputs this lifecycle hook will process data received from those inputs
   * @method   ngOnChanges
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.ngOnChanges();
   */
  ngOnChanges() {
    const resourceValues = this.languageService.getResourceValue(this.description.text.toString());
    this.inputValue = resourceValues["en"];
  }

  /**
   * This method is responsible to set the resource value and resource name if 2 corresponding keys are not equal
   * @method   detectChange
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.detectChange();
   */
  detectChange(event, key) {
    if (key !== this.resourceName) {
      this.languageService.setResourceValue(key, event.target.value);
      this.languageService.setResourceName(key, this.resourceName);
    }
  }

  /**
   * This method is responsible for handling the selection of a language from a dropdown and also with the elimination of the
   * selected language from the dropdown
   * @method   onSelectLanguage
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.onSelectLanguage();
   */
  onSelectLanguage(language) {
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
   * Method that sets the display of the dropdown to true and displays the default languages available
   * @method   onClick
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.onClick();
   */
  onClick() {
    this.showDropdown = true;
  }

  /**
   * Sets the resource to its corresponding language and saves it in the service so it can be accessed later
   * @method   onInputResource
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {undefined}  No return type
   * @example    <caption>Basic Usage</caption>
   * this.onInputResource();
   */
  onInputResource(resourceValue) {
    const lang = this.languageAndResources.pop();
    this.languageAndResources.push( Language.create({ name  : lang.name , resources : new Array<Resource>(new Resource({name : this.resourceName , value : resourceValue}))}) );
    this.languageService.saveLanguageAndResource(lang.name, this.resourceName, resourceValue);
    this.description.text = this.resourceName;

    /**
     * Adds a language and resource object to the array so it can be processed later and transformed into the internationalization object
     * @method   addLanguage
     * @author    Norbert Layis <Norbert.Layis@blackline.com>
     * @added    8/8/2018
     * @returns    {undefined}  No return type
     * @example    <caption>Basic Usage</caption>
     * this.addLanguage();
     */
  }
  addLanguage() {
    this.languageAndResources.push( Language.create({ name  : "", resources : new Array<Resource>(new Resource({name : this.resourceName , value : ""}))}) );
  }
}
