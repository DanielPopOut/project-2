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
}
