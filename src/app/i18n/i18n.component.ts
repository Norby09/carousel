import { Component, OnInit, Input } from '@angular/core';
import { Language } from '../../data/language';
import { Resource } from '../../data/resource';
import {LanguagesService} from '../languages.service';

export type addLanguageFunc = () => void;
export type addResourceFunc = () => void;
export type bindLanguageName = () => void;

@Component({
  selector: 'bl-carousel-i18n',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss', '../app.component.scss']
})
export class I18nComponent implements OnInit {
  @Input() languages: Language[] = [];
  @Input() selectableLanguages: any[];

  constructor(private _languageService: LanguagesService) {
    this.selectableLanguages = _languageService.getLanguages();
  }

  ngOnInit() {}

  addNewLanguage() {
    const element = Language.create({ name  : '', resources : new Array<Resource>(new Resource({name : '', value : ''}))});
    this.languages.push(element);
  }

  addNewResource(language: Language) {
    language.resources.push( new Resource( { name : '', value : ''} ));
  }

}
