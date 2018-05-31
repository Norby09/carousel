import { Component, OnInit, Input } from '@angular/core';
import {Setting} from '../../data/setting';
@Component({
  selector: 'bl-carousel-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() setting: Setting = null;
  constructor() { }

  ngOnInit() {
  }

}
