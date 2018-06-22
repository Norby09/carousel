import { Component, OnInit, Input } from '@angular/core';
import {Settings} from '../../data/settings';
@Component({
  selector: 'bl-carousel-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss', '../app.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() setting: Settings = null;

  constructor() { }

  ngOnInit() {
  }
}
