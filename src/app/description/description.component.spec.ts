import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionComponent } from './description.component';
import { LanguagesService } from '../languages.service';
import { Resource } from 'data/resource';

import { FormsModule } from '@angular/forms';
import {Description} from '../../data/description';
import {Language} from '../../data/language';
import {Title} from '../../data/title';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;

  const resource1 = new Resource({name : '@title1', value : 'This is title1'});
  const resource2 = new Resource({name : '@description1', value : 'This is description1'});
  const resource3 = new Resource({name : '@title2', value : 'This is title2'});
  const resource4 = new Resource({name : '@description2', value : 'This is description2'});

  const languageService =
  {
    getLanguages: () => {
      return [  { lang : 'en' , img: '' }, { lang: 'fr', img: ''}];
      },
    saveLanguageAndResource : (languageName, resourceName, resourceValue) => {
      let languageExists = false;
      const languages = [];
      languages.push(Language.create({name: '', resources : []}));
      for(let language of languages) {
        if( language.name === languageName) {
          language.resources.push( new Resource({name : resourceName, value: resourceValue}));
          languageExists = true;
        }
      }
      if ( !languageExists ) {
        languages.push( Language.create({ name  : languageName, resources : new Array<Resource>(new Resource({name : resourceName , value : resourceValue}))}) );
      }
    },
    getLanguagesAndResources() {
      return this.languages;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionComponent ],
      providers: [{
                    provide : LanguagesService ,
                    useValue : languageService
                  }
                ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionComponent);
    component = fixture.componentInstance;
  });

  it('should change showDropdown to true', () => {
    component.onClick();
    expect(component.showDropdown).toEqual(true);
  });
  // it('should select a specific language', () => {
  //   component.onSelect('fr');
  //   expect(component.showDropdown).toEqual(false);
  // });
  it('should test for a non existing description object', () => {
    component.description = new Description();
    component.description.text = "";
    component.ngOnInit();
    expect(component.defaultLanguages).toEqual([  { lang : 'en' , img: '' }, {lang: 'fr', img: ''}]);
    expect(component.languageAndResources.length).toEqual(1);
  });
  it('check the onSelectLanguage method', () => {
    const language = {lang: 'en', img: ''};
    component.defaultLanguages = languageService.getLanguages();
    component.onSelectLanguage(language);
    expect(component.showDropdown).toEqual(false);
    expect(component.defaultLanguages).toEqual([{lang: 'fr', img: ''}]);
  });
  it('check the if branch for onSelect language method', () => {
    const language = {lang: 'zz', img: ''};
    component.defaultLanguages = languageService.getLanguages();
    component.onSelectLanguage(language);
    expect(component.showDropdown).toEqual(false);
    expect(component.defaultLanguages).toEqual([{ lang : 'en' , img: '' }, { lang: 'fr', img: ''}]);
  });
  it('tests onInputResource method', () => {
    component.languageAndResources = [{name: 'en', resources: [{name: component.resourceName, value: 'default'}]}];
    component.description = new Description();
    component.onInputResource('default');
    expect(component.languageAndResources.length).toEqual(1);
  });
  it('tests the addLanguage method functionality', () => {
    component.resourceName = '@description'
    component.languageAndResources = [{name: 'en', resources: [{name: '@description', value: ''}]}];
    component.addLanguage();
    expect(component.languageAndResources.length).toEqual(2);
  })
});
