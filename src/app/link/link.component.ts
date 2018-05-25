import { Component, OnInit, Input } from '@angular/core';
import {LinksArray} from '../../data/links-array';

@Component({
  selector: 'bl-carousel-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  @Input() link: LinksArray = null;
  constructor() { }

  ngOnInit() {
  }

}
