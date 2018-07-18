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
  resourceName = "@description" + Math.floor(Math.random()*10+1);
  arrayOfSelectedLanguages = [];
  constructor(private languageService : LanguagesService) {
  }

  ngOnInit() {
    this.loadLanguages();
  }


  loadLanguages() {
    this.defaultLanguages = this.languageService.getLanguages();
  }

  saveResource(resourceValue) {
    let languageExists = false;
    this.title.text = this.resourceName;

    for(let language of this.languages) {
          if( language.name === this.selectedLanguage) {
              language.resources.push( new Resource({name : this.resourceName, value: resourceValue}));
              languageExists = true;
          }
    }
    if( !languageExists ){
      this.languages.push( Language.create({ name  : this.selectedLanguage, resources : new Array<Resource>(new Resource({name : this.resourceName , value : resourceValue}))}) );
    }
  }

  onClick() {
    this.showDropdown = true;
  }

  onSelect(language) {
    this.selectedLanguage = language.lang;
    this.showDropdown = !this.showDropdown;
  }
  onSelectSpecialised(language) {
    this.arrayOfSelectedLanguages.push(language.lang);
    this.showDropdown = !this.showDropdown;
  }

  addResource(resourceValue) {
    const element = Language.create({ name  : '', resources : new Array<Resource>(new Resource({name : '', value : resourceValue}))});
    this.languages.push(element);
  }

}
