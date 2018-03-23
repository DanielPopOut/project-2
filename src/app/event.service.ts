import { Injectable } from '@angular/core';
import { HomeCookEvent } from './home-cook-event';

@Injectable()
export class EventService {
    public event: HomeCookEvent;
    public fakeEvent = {
        id: "12345678910",
        host_name: "Daniel",
        name: "Soirée sushis",
        place: "2223 rue saint antoine",
        date: "2018-03-30T12:42",
        mail: "dnaioeno@gmail.com",
        description: "Ce sera du lourd !!!",
        guests: ['Maxime', 'Amandine', 'Prunelle', 'Theo', 'Ash']
    };
    public username: string;

    constructor() {
    }

    //Prend le faux évènement créé plus haut
    public mock() {
        this.event =  this.fakeEvent;
    }

    public createNewEvent(homeCookEvent: HomeCookEvent): boolean {
        //TODO envoi requete vers server

        //Version test
        this.event = homeCookEvent;
        this.event['id'] = "12345678910";
        return true
    }

    public validName(name: string): [boolean, string] {
        console.log(name + ' valid name ' + this.event.guests.indexOf(name));
        if (!name) {
            return [false, 'Name length > 0 plz'];
        } else if (this.event.guests.indexOf(name) > -1) {
            return [false,'This name is already taken'];
        }
        return [true,''];
    }

    public addNewGuest(newGuestName: string): [boolean, string] {
        if (!this.validName(newGuestName)[0])
            return this.validName(newGuestName);
        //TODO envoie requete vers server

        this.fakeEvent.guests.push(newGuestName);
        this.username = newGuestName;
        return [true,''];
    }

}
