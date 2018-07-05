import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nComponent } from './i18n.component';
import { FormsModule } from '@angular/forms';
import { LanguagesService } from '../languages.service';

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
});
