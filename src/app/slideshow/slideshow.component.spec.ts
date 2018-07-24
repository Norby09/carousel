import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowComponent } from './slideshow.component';
import { FormsModule } from '@angular/forms';

describe('SlideshowComponent', () => {
  let component: SlideshowComponent;
  let fixture: ComponentFixture<SlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideshowComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new slideshow object on init', () => {
    component.ngOnInit();
    expect(component.slideshow.interval).toEqual(100);
    expect(component.slideshow.restart).toEqual(100);
  });
});
