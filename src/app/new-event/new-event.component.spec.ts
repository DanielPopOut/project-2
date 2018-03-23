import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventComponent } from './new-event.component';
import { FormsModule } from '@angular/forms';
import { EventService } from '../event.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewEventComponent', () => {
  let component: NewEventComponent;
  let fixture: ComponentFixture<NewEventComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [NewEventComponent],
        imports: [
          FormsModule,
          RouterTestingModule
        ],
        providers: [
          EventService
        ]
      }).compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

})
;
