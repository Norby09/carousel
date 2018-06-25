import { Component, OnInit, Input, Output } from '@angular/core';
import {Title} from '../../data/title';
import { LanguagesService } from '../languages.service';

@Component({
  selector: 'bl-carousel-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss', '../app.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() title: Title = null;

  resources : String[];

  constructor(private languageService : LanguagesService) { 
    this.resources = this.languageService.getResources();
  }

  ngOnInit() {}

}
