import { Injectable } from '@angular/core';
import { HomeCookEvent } from './home-cook-event';
import { HomeCookCard } from './home-cook-card';

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
        guests: ['Maxime', 'Amandine', 'Prunelle', 'Theo', 'Ash'],
        cards: [new HomeCookCard("0", "Question-Card", 0), new HomeCookCard('1', "One-Vote-Card", 1), new HomeCookCard('2',"Multiple-Vote-Card", 2)]
    };
    public username: string;

    constructor() {
    }

    //Prend le faux évènement créé plus haut
    public mock() {
        this.event = this.fakeEvent;
    }

    public testUsername(): boolean {
        if(!this.username) {
            return false;
        }
        return true;
    }

    public createNewEvent(homeCookEvent: HomeCookEvent): boolean {
        //TODO envoi requete vers server

        //Version test
        this.event = homeCookEvent;
        this.event['id'] = "12345678910";
        return true
    }

    public validGuestName(name: string): [boolean, string] {
        console.log(name + ' valid name ' + this.event.guests.indexOf(name));
        if (!name) {
            return [false, 'Name length > 0 plz'];
        } else if (this.event.guests.indexOf(name) > -1) {
            return [false, 'This name is already taken'];
        }
        return [true, ''];
    }

    public addNewGuest(newGuestName: string): [boolean, string] {
        if (!this.validGuestName(newGuestName)[0])
            return this.validGuestName(newGuestName);
        //TODO envoie requete vers server

        this.fakeEvent.guests.push(newGuestName);
        this.username = newGuestName;
        return [true, ''];
    }

    public validCardName(name: string): [boolean, string] {
        if (!name) {
            return [false, 'Name length > 0 plz'];
        }
        for (let card in this.event.cards) {
            console.log(card + ' ' + this.event.cards[card].name);
        }
        for (let card of this.event.cards) {
            console.log(card.name + ' vs ' + name );
            console.log( card.name === name);
            if (card.name === name) {
                return [false, 'This name is already taken'];
            }
        }
        return [true, ''];
    }

    public createNewCard(cardToCreate: HomeCookCard): [boolean, string] {
        let x = this.validCardName(cardToCreate.name);
        if (x[0]) {
            let newEventList = this.event.cards.slice();
            newEventList.push(cardToCreate);
            // this.event.cards.push(cardToCreate);
            this.event.cards = newEventList;
            return [true, ''];
        }
        return x;
    }
}
