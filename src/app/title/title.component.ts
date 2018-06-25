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

  resources;

  constructor(private languageService : LanguagesService) { 
  }

  ngOnInit() {}

  loadResources() {
    this.resources = this.languageService.getResources();
  }

}
