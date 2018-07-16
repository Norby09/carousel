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

  constructor(private languageService : LanguagesService) { 
  }

  ngOnInit() {}

  loadResources() {
    this.resources = this.languageService.getResources();
  }

  loadLanguages() {
    this.defaultLanguages = this.languageService.getLanguages();
  }

  saveResource(resourceValue) {
    let resourceName = "@description" + Math.floor(Math.random()*10+1);
    let languageExists = false;
    for(let language of this.languages) {
          if( language.name === this.selectedLanguage) {
              language.resources.push( new Resource({name : resourceName, value: resourceValue}));
              languageExists = true;
          }
    }
    if( !languageExists ){
      this.languages.push( Language.create({ name  : this.selectedLanguage, resources : new Array<Resource>(new Resource({name : resourceName , value : resourceValue}))}) );
    }
  }

}
