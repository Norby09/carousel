import {Component, OnInit, Input} from '@angular/core';
import {Link} from '../../data/link';
import {LanguagesService} from '../languages.service';

@Component({
  selector: 'bl-carousel-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss', '../app.component.scss']
})
export class LinkComponent{
  @Input() link: Link = null;
  @Input() links: Link[];
  resources;
  constructor(private languageService: LanguagesService) { }

  loadResources() {
    this.resources = this.languageService.getResources();
  }
}
