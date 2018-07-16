import { Component, OnInit, Input } from '@angular/core';
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
  @Input() description: Description = null;
  @Input() languages : Language[];

  resources;
  defaultLanguages;
  selectedLanguage;
  resourceValue;
  
  constructor(private languageService: LanguagesService) {
  }

  ngOnInit() {}

  loadResources() {
    this.resources = this.languageService.getResources();
  }

  loadLanguages() {
    this.defaultLanguages = this.languageService.getLanguages();
  }

  saveResource(resourceValue) {
    let resourceName = "@title" + Math.floor(Math.random()*10+1);
    let languageExists = false;
    for(let language of this.languages) {
          if( language.name === this.selectedLanguage) {
              language.resources.push(new Resource({name : resourceName, value: resourceValue}));
              languageExists = true;
          }
    }

    if( !languageExists ){
      this.languages.push( Language.create({ name  : this.selectedLanguage, resources : new Array<Resource>(new Resource({name : resourceName , value : resourceValue}))}) );
    }
  }

}
