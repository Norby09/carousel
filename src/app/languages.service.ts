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

  // flattenResources = (accumulator, num) =>{
  //   for(let i=0 ; i <= this.languages; i++) {
  //   const flattenedResources = this.languages.resources
  //   }
  // }
  getResources() {
    const resources = this.languages.map( l => l.resources.map ( r => r.name ));
    var mergedResources = [].concat.apply([],resources);
    return mergedResources;
  }

  getLanguages() {
    return [ 'cz', 'cs', 'de', 'en', 'es', 'fr', 'hu', 'it', 'jp', 'ja', 'ko', 'nl', 'pl', 'bg', 'pt', 'ru', 'tr', 'cn', 'tw'];
  }

}
