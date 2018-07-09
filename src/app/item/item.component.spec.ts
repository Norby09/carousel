import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { FormsModule } from '@angular/forms';
import { ComponentsComponent } from '../components/components.component';
import { TitleComponent } from '../title/title.component';
import { DescriptionComponent } from '../description/description.component';
import { LinkComponent } from '../link/link.component';
import { LanguagesService } from '../languages.service';
import { Item } from '../../data/item';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [ LanguagesService ],
      declarations: [ ItemComponent, ComponentsComponent, TitleComponent, DescriptionComponent, LinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
  });

  it('should add an item', () => {
    component.items = [];
    const length = component.items.length;
    component.addItem();
    expect(component.items.length).toEqual(length+1);
  })

});
