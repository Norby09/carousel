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
        const languages = [];
        const resource1 = new Resource({name : '@title1', value : 'This is title1'});
        const resource2 = new Resource({name : '@description1', value : 'This is description1'});
        const resource3 = new Resource({name : '@title2', value : 'This is title2'});
        const resource4 = new Resource({name : '@description2', value : 'This is description2'});

        languages.push( Language.create({ name  : 'en', resources : new Array<Resource>(resource1, resource2 )}) );
        languages.push( Language.create({ name  : 'fr', resources : new Array<Resource>(resource3, resource4 )}) );

        service.languages = languages;
        expect(service.getResources())
            .toEqual([ resource1.name, resource2.name, resource3.name, resource4.name]);
  }));

});
