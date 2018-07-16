import {Component, OnInit, Input} from '@angular/core';
import {Link} from '../../data/link';
import {LanguagesService} from '../languages.service';
import { Language } from 'data/language';
import { Resource } from 'data/resource';

@Component({
  selector: 'bl-carousel-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss', '../app.component.scss']
})
export class LinkComponent{
  @Input() link: Link = null;
  @Input() links: Link[];
  @Input() languages : Language[];

  resources;
  defaultLanguages;
  selectedLanguage;
  resourceValue;
  
  constructor(private languageService: LanguagesService) { }

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
