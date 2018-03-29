import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardElementDetailsComponent } from './card-element-details.component';

describe('CardElementDetailsComponent', () => {
  let component: CardElementDetailsComponent;
  let fixture: ComponentFixture<CardElementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardElementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
