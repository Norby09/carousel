import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Language } from 'data/language';

@Injectable()
export class LanguagesService {

  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  languages : Language[];

  constructor() {
      this.myMethod$ = this.myMethodSubject.asObservable();
  }

  myMethod(data) {
      this.myMethodSubject.next(data);
      this.languages = data;
  }
  
  getResources() {
    const resources = this.languages.map( l => l.resources.map ( r => r.name )); 
    const mergedResources = [].concat.apply([],resources);
    return mergedResources;
  }

  getLanguages() {
    return [  { lang : 'en' , img :  '../assets/images/united_kingdom.png'}, 
              { lang : 'cs' , img :  '' }, 
              { lang : 'de' , img : '' }, 
              { lang : 'cz' , img : ''},
              { lang : 'es' , img :  ''},
              { lang : 'fr' , img :  ''},
              { lang : 'hu' , img :  ''},
              { lang : 'it' , img :  ''},
              { lang : 'jp' , img :  ''},
              { lang : 'ja' , img :  ''},
              { lang : 'ko' , img :  ''},
              { lang : 'nl' , img :  ''},
              { lang : 'pl' , img :  ''},
              { lang : 'bg' , img :  ''},
              { lang : 'pt' , img :  ''},
              { lang : 'ru' , img :  ''},
              { lang : 'tr' , img :  ''},
              { lang : 'cn' , img :  ''},
              { lang : 'tw' , img :  ''} ];
            };
    // return [  'en', 'cs', 'de', 'cz', 'es', 'fr', 'hu', 'it', 'jp', 'ja', 'ko', 'nl', 'pl', 'bg', 'pt', 'ru', 'tr', 'cn', 'tw' ];
  }

}
