import { Component, OnInit, Input } from '@angular/core';
import {I18nElement} from '../../data/i18nelement';
export type addLanguageFunc = () => void;
export type bindLanguageName = () => void;
@Component({
  selector: 'bl-carousel-i18n',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss']
})
export class I18nComponent implements OnInit {
  @Input() element: I18nElement;
  @Input() addNewLanguage: addLanguageFunc;
  @Input() bindLanguageAndAddToMainObject: bindLanguageName;
  @Input() arrayOfI18n: Array<I18nElement> = [];

  showButton = false;

  constructor() {}
  ngOnInit() {
  }

  showBindButton() {
    this.showButton  = true;
  }
}
