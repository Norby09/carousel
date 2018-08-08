import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Title } from '../../data/title';
import { LanguagesService } from '../languages.service';
import { Language } from 'data/language';
import { Resource } from 'data/resource';

@Component({
  selector: 'bl-carousel-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss', '../app.component.scss']
})
export class TitleComponent implements OnInit, OnChanges {
  @Input() title: Title = null;

  resources;
  defaultLanguages;
  resourceValue;
  showDropdown = true;
  resourceName = "@title" + Math.floor(Math.random() * 10000 + 1);
  inputValue: string = '';

  languageAndResources = [];

  constructor(private languageService: LanguagesService) {
  }
  
  public ngOnInit() : void {
    this.defaultLanguages = this.languageService.getLanguages();
    if( this.title.text ) {
      this.languageAndResources.push( Language.create({ name  : "en", resources : new Array<Resource>(new Resource({name : this.title.text , value : this.inputValue}))}) );
      this.resourceName = this.title.text.toString();
    } else {
      this.languageAndResources.push( Language.create({ name  : " ", resources : new Array<Resource>(new Resource({name : this.resourceName , value : ""}))}) );
    }
  }
  public ngOnChanges() : void {
    const resourceValues = this.languageService.getResourceValue(this.title.text.toString());
    this.inputValue = resourceValues["en"];
  }

  public onClick() : void {
    this.showDropdown = true;
  }

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

  public onInputResource(resourceValue) {
    const lang = this.languageAndResources.pop();
    this.languageAndResources.push( Language.create({ name  : lang.name , resources : new Array<Resource>(new Resource({name : this.resourceName , value : resourceValue}))}) );
    this.languageService.saveLanguageAndResource(lang.name, this.resourceName, resourceValue);
    this.title.text = this.resourceName;
  }

  public addLanguage() {
    this.languageAndResources.push( Language.create({ name  : "", resources : new Array<Resource>(new Resource({name : this.resourceName , value : ""}))}) );
  }

}
