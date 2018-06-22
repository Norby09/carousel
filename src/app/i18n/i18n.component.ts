import { Component, OnInit, Input } from '@angular/core';
import { Language } from '../../data/language';
export type addLanguageFunc = () => void;
export type addResourceFunc = () => void;
export type bindLanguageName = () => void;
@Component({
  selector: 'bl-carousel-i18n',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss', '../app.component.scss']
})
export class I18nComponent implements OnInit {
  @Input() addNewLanguage: addLanguageFunc;
  @Input() addNewResource: addResourceFunc;
  @Input() languages: Language[] = [];
  @Input() selectableLanguages: any[];

  constructor() {}

  ngOnInit() {}

}
