import { Component, OnInit, Input } from '@angular/core';
import {Description} from '../../data/description';
import { LanguagesService } from '../languages.service';

@Component({
  selector: 'bl-carousel-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss', '../app.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() description: Description = null;
  resources;

  constructor(private languageService : LanguagesService){
    
  }

  ngOnInit() {}

  loadResources() {
    this.resources = this.languageService.getResources();
  }

}
