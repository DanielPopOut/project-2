import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardElementModalComponent } from './card-element-modal.component';

describe('CardElementModalComponent', () => {
  let component: CardElementModalComponent;
  let fixture: ComponentFixture<CardElementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardElementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardElementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
