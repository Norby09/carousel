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
    return [ 'cz', 'cs', 'de', 'en', 'es', 'fr', 'hu', 'it', 'jp', 'ja', 'ko', 'nl', 'pl', 'bg', 'pt', 'ru', 'tr', 'cn', 'tw'];
  }

}
