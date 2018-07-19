import { Component, OnInit, Input, Output } from '@angular/core';
import {Title} from '../../data/title';
import { LanguagesService } from '../languages.service';
import { Language } from 'data/language';
import { Resource } from 'data/resource';

@Component({
  selector: 'bl-carousel-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss', '../app.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() title: Title = null;
  @Input() languages : Language[];

  resources;
  defaultLanguages;
  selectedLanguage;
  resourceValue;
  showDropdown = true;
  resourceName = "@description" + Math.floor(Math.random()*10000+1);
  selectedLanguages = [];

  languageAndResources = [];

  constructor(private languageService : LanguagesService) {
  }

  ngOnInit() {
    this.defaultLanguages = this.languageService.getLanguages();
    this.languageAndResources.push( Language.create({ name  : " ", resources : new Array<Resource>(new Resource({name : this.resourceName , value : ""}))}) );
  }

  onClick() {
    this.showDropdown = true;
  }

  onSelectLanguage(language) {
    this.showDropdown = !this.showDropdown;
    console.log('Selected language : ', language);
    const lang = this.languageAndResources.pop();
    this.languageAndResources.push( Language.create({ name  : language.lang , resources : new Array<Resource>(new Resource({name : this.resourceName , value : ""}))}) );
    console.log('Languages: ', this.languageAndResources);
  }

  onInputResource(resourceValue){

    const lang = this.languageAndResources.pop();
    this.languageAndResources.push( Language.create({ name  : lang.name , resources : new Array<Resource>(new Resource({name : this.resourceName , value : resourceValue}))}) );
    console.log('Languages: ', this.languageAndResources);
    this.languageService.saveLanguageAndResource(lang.name,this.resourceName, resourceValue);
  }

  addLanguage() {
    this.languageAndResources.push( Language.create({ name  : "", resources : new Array<Resource>(new Resource({name : this.resourceName , value : ""}))}) );
    this.languageService.getLanguagesAndResources();
  }

}
