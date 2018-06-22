import { Injectable } from '@angular/core';

@Injectable()
export class LanguagesService {
  getLanguages() {
    return [ 'cz', 'cs', 'de', 'en', 'es', 'fr', 'hu', 'it', 'jp', 'ja', 'ko', 'nl', 'pl', 'bg', 'pt', 'ru', 'tr', 'cn', 'tw'];
  }
  constructor() { }

}
