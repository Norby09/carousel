import { Component, Input } from '@angular/core';
import { Settings } from '../../data/settings';

@Component({
  selector: 'bl-carousel-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss', '../app.component.scss']
})
export class SettingsComponent {
  /**
  * This property holds an object of type Settings sent through Input
  * @name    setting
  * @type    {Settings}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  @Input() setting: Settings = null;
}
