import { Component, OnInit, Input } from '@angular/core';
import { SlideAction } from 'data/slide-action';

@Component({
  selector: 'bl-carousel-slide-action',
  templateUrl: './slide-action.component.html',
  styleUrls: ['./slide-action.component.scss']
})
export class SlideActionComponent implements OnInit {

  @Input() action: SlideAction = null;

  i18n = {
    insertText: 'Insert Text...',
    insertURL: 'Insert URL...'
  };

  constructor() { }

  ngOnInit() { }

  reset() {
    this.action = new SlideAction();
  }

}
