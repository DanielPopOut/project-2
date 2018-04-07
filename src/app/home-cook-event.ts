import { HomeCookCard } from './home-cook-card';

export class HomeCookEvent {
  public _id: string;
  public name: string;
  public place: string;
  public date: string;
  public description: string;
  public host_name: string;
  public mail;
  public guests: string[];
  public cards: HomeCookCard [];

  public setHomeCookEvent(newHomeCookEvent: HomeCookEvent) {
      this._id = newHomeCookEvent._id;
      this.name = newHomeCookEvent.name;
      this.place = newHomeCookEvent.place;
      this.date = newHomeCookEvent.date;
      this.description = newHomeCookEvent.description;
      this.host_name = newHomeCookEvent.host_name;
      this.mail = newHomeCookEvent.mail;
      this.guests = newHomeCookEvent.guests;
      this.cards = newHomeCookEvent.cards;

  }
}
