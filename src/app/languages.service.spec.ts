import { TestBed, inject } from '@angular/core/testing';

import { LanguagesService } from './languages.service';
import { Language } from 'data/language';
import { Resource } from 'data/resource';

describe('LanguagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguagesService]
    });
  });

  it('should return an array of languages', inject([LanguagesService], (service: LanguagesService) => {
    expect(service.getLanguages())
      .toEqual([ 'cz', 'cs', 'de', 'en', 'es', 'fr', 'hu', 'it', 'jp', 'ja', 'ko', 'nl', 'pl', 'bg', 'pt', 'ru', 'tr', 'cn', 'tw']);
  }));

  it('should return an array of languages', inject([LanguagesService], (service: LanguagesService) => {
    var languages = service.getLanguages(); 
    for( let l of languages ){
        expect(l.length).toEqual(2);
    }
  }));

  it('should return all the resources', inject([LanguagesService], (service: LanguagesService) => {
        var languages = [];
        languages.push( Language.create({ name  : 'en', resources : new Array<Resource>( new Resource({name : '@title1', value : 'This is title1'}), new Resource({name : '@description1', value : 'This is description1'}))}) );
        languages.push( Language.create({ name  : 'fr', resources : new Array<Resource>( new Resource({name : '@title2', value : 'This is title2'}), new Resource({name : '@description2', value : 'This is description2'}))}) );
        service.languages = languages;
        expect(service.getResources())
            .toEqual([ '@title1', '@description1', '@title2', '@description2']);
  }));

});
