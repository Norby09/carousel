import {Component, Inject, OnInit} from '@angular/core';
import { LanguagesService } from '../app/languages.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'bl-carousel-configurator',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LanguagesService],

})
export class AppComponent {
  doc;
  constructor(@Inject(DOCUMENT) public document: any) {
    console.log(document);
    this.doc = document;
  }
}
