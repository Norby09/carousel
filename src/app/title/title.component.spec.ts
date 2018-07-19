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

  // it('should hide dropdown on select', () => {
  //   component.showDropdown = false;
  //   component.onSelect("en");
  //   expect(component.showDropdown).toEqual(true);
  // });
});
