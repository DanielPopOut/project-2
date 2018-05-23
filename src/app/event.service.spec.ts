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
    //service.setEvent(new HomeCookEvent());
    expect(service.setEvent(new HomeCookEvent())).toBe(true);
  });

  it('should return event with _id 12345678910', () => {
    service.setEvent(new HomeCookEvent());
    expect(service.event._id).toContain("12345678910");
  });
});
