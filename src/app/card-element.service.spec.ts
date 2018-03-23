import { TestBed, inject } from '@angular/core/testing';

import { CardElementService } from './card-element.service';

describe('CardElementService', () => {
  let service: CardElementService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardElementService]
    });
    service = TestBed.get(CardElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
