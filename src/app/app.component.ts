import { Component } from '@angular/core';
import { LanguagesService } from '../app/languages.service';
import { TypesService } from './types.service';

@Component({
  selector: 'bl-carousel-configurator',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LanguagesService, TypesService],

})
export class AppComponent {
}
