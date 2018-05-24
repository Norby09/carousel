import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SlideActionComponent } from './slide-action.component';
import { SlideAction } from 'data/slide-action';

describe('SlideActionComponent', () => {
  let component: SlideActionComponent;
  let fixture: ComponentFixture<SlideActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideActionComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideActionComponent);
    component = fixture.componentInstance;
    component.action = new SlideAction();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
