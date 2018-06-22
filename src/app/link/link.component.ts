import {Component, OnInit, Input} from '@angular/core';
import {Link} from '../../data/link';

@Component({
  selector: 'bl-carousel-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss', '../app.component.scss']
})
export class LinkComponent implements OnInit {
  @Input() link: Link = null;
  constructor() { }

  ngOnInit() {
  }

}
