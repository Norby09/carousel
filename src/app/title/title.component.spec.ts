import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';
import { LanguagesService } from '../languages.service';
import { Resource } from 'data/resource';
import { Language } from 'data/language';

import { FormsModule } from '@angular/forms';
import { Title } from 'data/title';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  const resource1 = new Resource({name : '@title1', value : 'This is title1'});
  const resource2 = new Resource({name : '@description1', value : 'This is description1'});
  const resource3 = new Resource({name : '@title2', value : 'This is title2'});
  const resource4 = new Resource({name : '@description2', value : 'This is description2'});

  const languageService = 
  {
    getResources() {
      return [resource1.name,resource2.name,resource3.name,resource4.name];
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleComponent ],
      providers: [{
        provide : LanguagesService,
        useValue : languageService
      } 
    ],
    imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
  });

  it('should change showDropdown on click', () => {
    component.onClick();
    expect(component.showDropdown).toEqual(true);
  });

  it('should hide dropdown on select', () => {
    component.showDropdown = false;
    component.onSelect("en");
    expect(component.showDropdown).toEqual(true);
  });

  it('should add the resource to the existent language', () => {
    const language = new Language({ name : "en" , resource : [] });
    language.resources.push( new Resource({ name : '@Resource1', value : 'Test resource'}));
    component.languages = [];
    component.languages.push(language);

    component.title = new Title();
    component.selectedLanguage = "en";
    component.saveResource("Test resource 2");

    const lang = component.languages.filter( l => l.name === component.selectedLanguage);
    expect(lang[0].resources.length).toEqual(2);
  });

  it('should create the language with the resource if it does not exists', () => {
    component.title = new Title();
    component.languages = [];
    component.selectedLanguage = "fr";
    component.saveResource("Test resource");

    expect(component.languages.length).toEqual(1);
    expect(component.languages[0].name).toEqual( component.selectedLanguage );
    expect(component.languages[0].resources.length).toEqual(1);
  });

  it('should create the language with the resource if it does not exists on default languages', () => {
    component.title = new Title();
    const language = new Language({ name : "en" , resource : [] });
    language.resources.push( new Resource({ name : '@Resource1', value : 'Test resource'}));
    component.languages = [];
    component.languages.push(language);
    component.selectedLanguage = "zz";
    component.saveResource("Test resource");

    expect(component.languages.length).toEqual(2);
  });
});
