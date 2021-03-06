import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComponentsComponent } from './components.component';
import { TitleComponent } from '../title/title.component';
import { DescriptionComponent } from '../description/description.component';
import { LinkComponent } from '../link/link.component';
import { FormsModule } from '@angular/forms';

import { LanguagesService } from '../languages.service';

import { Comp } from 'data/comp';
import { Title } from 'data/title';
import { Description } from 'data/description';

describe('ComponentsComponent', () => {
  let component: ComponentsComponent;
  let fixture: ComponentFixture<ComponentsComponent>;
  let componentDe;
  let expectedComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsComponent,
                      TitleComponent,
                      DescriptionComponent,
                      LinkComponent],
      imports: [ FormsModule ],
      providers: [ LanguagesService ],

    })
    .compileComponents();
    fixture = TestBed.createComponent(ComponentsComponent);
    component = fixture.componentInstance;

    componentDe = fixture.debugElement.query(By.css('.component'));

    const title = Title.create({ cssClass : 'form-control', style : 'inline-block', text : 'Title 1'});
    const description = Description.create({ cssClass : 'form-control', style : 'inline-block', text : 'Description 1'});

    expectedComponent= new Comp({title : title, description : description, links : null });
    component.comp = expectedComponent;
  }));

  it('ngOnInit with empty component', () => {
    fixture.detectChanges();
    expect(component.comp).toEqual(expectedComponent);
  });

  it('ngOnInit with component with link', () => {
    const title = Title.create({ cssClass : 'form-control', style : 'inline-block', text : 'Title 1'});
    const description = Description.create({ cssClass : 'form-control', style : 'inline-block', text : 'Description 1'});

    component.comp = Comp.create({title : title, description : description , links : []});
    fixture.detectChanges();
    expect(component.comp.title).toEqual(title);
    expect(component.comp.description).toEqual(description);
    expect(component.comp.links).toEqual([]);
  });

  it('ngOnInit with component without link', () => {
    const title = Title.create({ cssClass : 'form-control', style : 'inline-block', text : 'Title 1'});
    const description = Description.create({ cssClass : 'form-control', style : 'inline-block', text : 'Description 1'});

    component.comp = new Comp({title : title, description : description, links : null });
    fixture.detectChanges();
    expect(component.comp.title).toEqual(title);
    expect(component.comp.description).toEqual(description);
    expect(component.comp.links.length).toEqual(0);
  });

  it('should raise selected event when clicked (triggerEventHandler)', (done) => {
    fixture.detectChanges();
    let selectedComponent: Comp = new Comp();
    component.save.subscribe(g => selectedComponent = g);
    component.onSubmitItems();
    expect(selectedComponent).toEqual(expectedComponent);
    done();
  });

});
