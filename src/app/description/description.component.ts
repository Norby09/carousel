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
export class DescriptionComponent implements OnInit {
  @Input() description: Description;

  resources;
  defaultLanguages;
  selectedLanguage;
  resourceValue;
  showDropdown = true;
  resourceName = "@description" + Math.floor(Math.random() * 10000 + 1);
  languageAndResources = [];
  inputValue = '';

  constructor(private languageService: LanguagesService) {}

  ngOnInit() {
    if (this.description.text !== "") {
      this.languageAndResources.push( Language.create({ name  : "en", resources : new Array<Resource>(new Resource({name : this.description.text , value : this.inputValue}))}) );
      this.resourceName = this.description.text.toString();
    } else {
      this.defaultLanguages = this.languageService.getLanguages();
      this.languageAndResources.push( Language.create({ name  : " ", resources : new Array<Resource>(new Resource({name : this.resourceName , value : this.inputValue}))}) );
    }
    console.log(this.languageAndResources);
  }
  detectChange(event,key) {
    this.resourceName = "@description" + Math.floor(Math.random() * 10000 + 1);
    this.languageService.setResourceValue(key, event.target.value);
    this.languageAndResources[0].resources[0].name = this.resourceName;
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
