import { TestBed, inject } from '@angular/core/testing';

import { LanguagesService } from './languages.service';

describe('LanguagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguagesService]
    });
  });

  it('should return an array of languages', inject([LanguagesService], (service: LanguagesService) => {
    expect(service.getLanguages().map(l => l.lang))
      .toEqual([ 'en', 'cs', 'de', 'cz', 'es', 'fr', 'hu', 'it', 'jp', 'ja', 'ko', 'nl', 'pl', 'bg', 'pt', 'ru', 'tr', 'cn', 'tw']);
  }));

  it('should return an array of languages', inject([LanguagesService], (service: LanguagesService) => {
    var languages = service.getLanguages(); 
    for( let l of languages ){
        expect(l.lang.length).toEqual(2);
    }
  }));

});
