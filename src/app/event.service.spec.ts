import { TestBed, inject } from '@angular/core/testing';

import { EventService } from './event.service';
import { HomeCookEvent } from './home-cook-event';

describe('EventService', () => {
  let service : EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService]
    });
    service = TestBed.get(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new event', () => {
    //service.createNewEvent(new HomeCookEvent());
    expect(service.createNewEvent(new HomeCookEvent())).toBe(true);
  });

  it('should return event with _id 12345678910', () => {
    service.createNewEvent(new HomeCookEvent());
    expect(service.event._id).toContain("12345678910");
  });
});
