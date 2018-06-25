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
      console.log(data); // I have data! Let's return it so subscribers can use it!
      // we can do stuff with data if we want
      this.myMethodSubject.next(data);
      this.languages = data;
  }

  getResources() {
    this.languages.map( l => l.resources.map ( r => console.log(r.name) ) );
    return null;
  }

  getLanguages() {
    return [ 'cz', 'cs', 'de', 'en', 'es', 'fr', 'hu', 'it', 'jp', 'ja', 'ko', 'nl', 'pl', 'bg', 'pt', 'ru', 'tr', 'cn', 'tw'];
  }

}
