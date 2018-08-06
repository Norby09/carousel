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
  @Input() description: Description;

  public defaultLanguages;
  public selectedLanguage;
  public resourceValue;
  public showDropdown = true;
  public resourceName = "@description" + Math.floor(Math.random() * 10000 + 1);
  public languageAndResources = [];
  public inputValue: string;

  constructor(private languageService: LanguagesService) {}

  ngOnInit() {
    if (this.description.text !== "") {
      this.languageAndResources.push( Language.create({ name  : "en", resources : new Array<Resource>(new Resource({name : this.description.text , value : this.inputValue}))}) );
      this.resourceName = this.description.text.toString();
    } else {
      this.defaultLanguages = this.languageService.getLanguages();
      this.languageAndResources.push( Language.create({ name  : " ", resources : new Array<Resource>(new Resource({name : this.resourceName , value : this.inputValue}))}) );
    }
  }
  ngOnChanges() {
    this.inputValue = this.languageService.getResourceValue(this.description.text.toString());
  }
  detectChange(event, key) {
    this.languageService.setResourceValue(key, event.target.value);
    this.languageService.setResourceName(key, this.resourceName);
  }
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
  onClick() {
    this.showDropdown = true;
  }
  onInputResource(resourceValue) {
    const lang = this.languageAndResources.pop();
    this.languageAndResources.push( Language.create({ name  : lang.name , resources : new Array<Resource>(new Resource({name : this.resourceName , value : resourceValue}))}) );
    this.languageService.saveLanguageAndResource(lang.name, this.resourceName, resourceValue);
    this.description.text = this.resourceName;

  }
  addLanguage() {
    this.languageAndResources.push( Language.create({ name  : "", resources : new Array<Resource>(new Resource({name : this.resourceName , value : ""}))}) );
    this.languageService.getLanguagesAndResources();
  }
}
