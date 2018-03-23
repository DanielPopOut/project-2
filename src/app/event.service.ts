import { Injectable } from '@angular/core';
import { HomeCookEvent } from './home-cook-event';

@Injectable()
export class EventService {
  public event: HomeCookEvent;

  constructor() { }

  public createNewEvent(homeCookEvent: HomeCookEvent) : boolean {
    //TODO envoi requete vers server

    //Version test
    this.event = homeCookEvent;
    this.event['id'] = "12345678910";
    return true
  }
}
