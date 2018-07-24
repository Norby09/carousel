import { Component } from '@angular/core';
import { LanguagesService } from '../app/languages.service';

@Component({
  selector: 'bl-carousel-configurator',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LanguagesService],

})
export class AppComponent {
}
