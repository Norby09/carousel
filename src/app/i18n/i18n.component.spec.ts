import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nComponent } from './i18n.component';
import { FormsModule } from '@angular/forms';
import { LanguagesService } from '../languages.service';
import {Language} from '../../data/language';
import {Resource} from '../../data/resource';

describe('I18nComponent', () => {
  let component: I18nComponent;
  let fixture: ComponentFixture<I18nComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I18nComponent ],
      imports: [ FormsModule ],
      providers: [ LanguagesService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a new language', () => {
    component.languages = [];
    component.addNewLanguage();
    expect(component.languages.length).toEqual(1);
  });

  it('should add a new resource to a language', () => {
    component.languages = [];
    component.addNewLanguage();
    component.addNewResource(component.languages[0]);
    expect(component.languages[0].resources.length).toEqual(2);
  });
  it('should remove a resource from a language' ,() => {

    const resource1 = new Resource({name : '@title1', value : 'This is title1'});
    const resource2 = new Resource({name : '@description1', value : 'This is description1'});
    const resource3 = new Resource({name : '@title2', value : 'This is title2'});
    const resource4 = new Resource({name : '@description2', value : 'This is description2'});

    component.languages[0] = new Language();
    component.languages[0].resources = [resource1, resource2, resource3, resource4];
    component.removeResource(resource1, component.languages[0].resources)
    expect(component.languages[0].resources).toEqual( [ resource2, resource3, resource4]);

  })
  it('should remove a language', () => {
    const language1 = new Language({name: 'en', resources: []});
    component.languages.push(language1);
    const language2 = new Language({name: 'ene', resources: []});
    component.languages.push(language2);
    component.removeLanguage(language2);
    expect(component.languages[0]).toEqual(language1);
  });
});
