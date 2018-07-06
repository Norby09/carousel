import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionComponent } from './description.component';
import { LanguagesService } from '../languages.service';
import { Resource } from 'data/resource';

import { FormsModule } from '@angular/forms';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;

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
      declarations: [ DescriptionComponent ],
      providers: [{
                    provide : LanguagesService ,
                    useValue : languageService
                  } 
                ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionComponent);
    component = fixture.componentInstance;
  });

  it('should return resources', () => {
    component.loadResources();
    expect(component.resources).toEqual([resource1.name, resource2.name,resource3.name,resource4.name]);
  })
});
