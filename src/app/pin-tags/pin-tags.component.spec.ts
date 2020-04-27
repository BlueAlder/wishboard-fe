import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinTagsComponent } from './pin-tags.component';

describe('PinTagsComponent', () => {
  let component: PinTagsComponent;
  let fixture: ComponentFixture<PinTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
