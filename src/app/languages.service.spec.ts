import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { LanguagesService } from './languages.service';
import { FormsModule } from '@angular/forms';
import { Language } from 'data/language';

describe('LanguagesService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguagesService]
    }).compileComponents();
  });

  it('should return an array of languages', inject([LanguagesService], (service: LanguagesService) => {
    expect(service.getLanguages().map(l => l.lang))
      .toEqual([ 'en', 'cs', 'de', 'cz', 'es', 'fr', 'hu', 'it', 'jp', 'ja', 'ko', 'nl', 'pl', 'bg', 'pt', 'ru', 'tr', 'cn', 'tw']);
  }));

  it('should return the created languages', inject([LanguagesService], (service: LanguagesService) => {
    const lang = [ new Language({name: "en"}), new Language({name: "fr"}), new Language({name: "de"})]
    service.languages = lang;
    expect(service.getLanguagesAndResources()).toEqual(lang);
  }));

  it('should return an array of languages', inject([LanguagesService], (service: LanguagesService) => {
    var languages = service.getLanguages(); 
    for( let l of languages ){
        expect(l.lang.length).toEqual(2);
    }
  }));

  it('should create a new language with the provided resource if it does not exist', inject([LanguagesService], (service: LanguagesService) => {
    service.languages = [];
    service.saveLanguageAndResource("en", "@resource1", "Value of resource 1");
    expect(service.languages.length).toEqual(1);
    expect(service.languages[0].name).toEqual("en");
  }));

  it('should add the resource to the existing language', inject([LanguagesService], (service: LanguagesService) => {
    const lang = [ Language.create({name: "en", resources : []}), Language.create({name: "fr"}), Language.create({name: "de"})];
    service.languages = lang;
    service.saveLanguageAndResource("en", "@resource1", "Value of resource 1");
    const en =  service.languages.filter(l => l.name === "en")[0];
    expect(en.resources.length).toEqual(1);
  }));


});
