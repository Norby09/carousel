import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypesComponent } from './types.component';
import { FormsModule } from '@angular/forms';
import { Type } from '../../data/type';

describe('TypesComponent', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new type object on init', () => {
    component.ngOnInit();
    expect(component.type).toEqual(jasmine.any(Type));
    expect(component.type.standard).toEqual(1);
    expect(component.type.custom).toEqual(2);
    expect(component.type.customTemplate).toEqual(3);

  });
});
