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
  @Input() link: Link = null;
  @Input() links: Link[];

  public defaultLanguages;
  public resourceValue;
  public showDropdown = true;
  public resourceName = "@link" + Math.floor(Math.random() * 10000 + 1);
  public languageAndResources = [];
  public inputValue = '';
  
  constructor(private languageService: LanguagesService) { }

  ngOnInit() {
    this.defaultLanguages = this.languageService.getLanguages();
    if( this.link.text ) {
      this.resourceName = this.link.text.toString();
      this.languageAndResources.push( Language.create({ name  : "en", resources : new Array<Resource>(new Resource({name : this.link.text , value : this.inputValue}))}) );
    } else {
      this.languageAndResources.push( Language.create({ name  : "", resources : new Array<Resource>(new Resource({name : this.resourceName , value : this.inputValue}))}) );
    }
  }
  ngOnChanges() {
    const resourceValues = this.languageService.getResourceValue(this.link.text.toString());
    this.inputValue = resourceValues["en"];
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
    this.link.text = this.resourceName;
  }
  addLanguage() {
    this.languageAndResources.push( Language.create({ name  : "", resources : new Array<Resource>(new Resource({name : this.resourceName , value : ""}))}) );
  }
}
