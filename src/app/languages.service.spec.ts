import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { LanguagesService } from './languages.service';
import { FormsModule } from '@angular/forms';
import { Language } from 'data/language';
import { Resource } from 'data/resource';
import { asTextData } from '../../node_modules/@angular/core/src/view';

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

  it('should set the given resources name', inject([LanguagesService], (service: LanguagesService) => {
    const newName = "newTitle1";
    service.i18n = [];
    service.i18n.push(new Language({name: "en", resources : [ new Resource({ name : "title1", value : "This is title 1"})] }));
    service.setResourceName("title1",newName);
    expect(service.i18n[0].resources[0].name).toEqual(newName);
  }));

  it('should not set the given resources name if name is not given', inject([LanguagesService], (service: LanguagesService) => {
    service.i18n = [];
    service.i18n.push(new Language({name: "en", resources : [ new Resource({ name : "title1", value : "This is title 1"})] }));
    service.setResourceName(null,"newTitle1");
    expect(service.i18n[0].resources[0].name).toEqual("title1");
  }));

  it('should set the given resources value', inject([LanguagesService], (service: LanguagesService) => {
    const newValue = "This is a new value.";
    service.i18n = [];
    service.i18n.push(new Language({name: "en", resources : [ new Resource({ name : "title1", value : "This is title 1"})] }));
    service.setResourceValue("title1",newValue);
    expect(service.i18n[0].resources[0].value).toEqual(newValue);
  }));

  it('should not set the resources value if the language is not given', inject([LanguagesService], (service: LanguagesService) => {
    const newValue = "This is a new title";
    service.i18n = [];
    service.i18n.push(new Language({name: "en", resources : [ new Resource({ name : "title1", value : "This is title 1"})] }));
    service.setResourceValue("title1",newValue,"en");
    expect(service.i18n[0].resources[0].value).toEqual("This is title 1");
  }));

  it('should set i18n', inject([LanguagesService], (service: LanguagesService) => {
    const lang1 = new Language({name: "en", resources : [ new Resource({ name : "title1", value : "This is title 1"})] });
    const lang2 = new Language({name: "cs", resources : [ new Resource({ name : "title2", value : "This is title 2"})] });
    const value = [lang1, lang2];
    service.i18n = [];
    service.setI18n(value);
    expect(service.i18n).toEqual(value);
  }));

  it('should get a resource value', inject([LanguagesService], (service: LanguagesService) => {
    const lang1 = new Language({name: "en", resources : [ new Resource({ name : "@title1", value : "This is title 1"})] });
    const lang2 = new Language({name: "cs", resources : [ new Resource({ name : "@title2", value : "This is title 2"})] });
    service.i18n = [lang1, lang2];
    const resVal = service.getResourceValue("@title1");
    expect(resVal).toEqual({en : "This is title 1"});
  }));

  it('should not get the resource value if the language is not given', inject([LanguagesService], (service: LanguagesService) => {
    const lang1 = new Language({name: "en", resources : [ new Resource({ name : "@title1", value : "This is title 1"})] });
    const lang2 = new Language({name: "cs", resources : [ new Resource({ name : "@title2", value : "This is title 2"})] });
    service.i18n = [lang1, lang2];
    const resVal = service.getResourceValue("@title1","en");
    expect(resVal).toEqual(undefined);
  }));

});
