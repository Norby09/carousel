import { Component, OnInit, Input } from '@angular/core';
import {Description} from '../../data/description';

@Component({
  selector: 'bl-carousel-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss', '../app.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() description: Description = null;
  constructor(){}

  ngOnInit() {}

}
