import { Injectable } from '@angular/core';
import { HomeCookEvent } from './home-cook-event';
import { HomeCookCard } from './home-cook-card';
import { CardElement } from './card-element';
import { Subject } from 'rxjs/Subject';
import { Voter } from './voter';

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
        cards: [new HomeCookCard("0", "Entrée", 0), new HomeCookCard('1', "Plat", 1), new HomeCookCard('2', "Boissons", 2)]
    };
    public username: string;
    public cardElementToShowDetails: CardElement;
    private nonConnected = new Subject<boolean>();
    public savedCardElementList: CardElement[];
    public innerWidth: number;

    constructor() {
        this.mock();
    }

    //Prend le faux évènement créé plus haut
    public mock() {
        this.event = this.fakeEvent;
    }


    public createNewEvent(homeCookEvent: HomeCookEvent): boolean {
        //TODO envoi requete vers server

        //Version test
        this.event = homeCookEvent;
        this.event['id'] = "12345678910";
        return true
    }



    public validCardName(name: string): [boolean, string] {
        if (!name) {
            return [false, 'Name length > 0 plz'];
        }
        for (let card of this.event.cards) {
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

    public setCardDetails(cardElement: CardElement) {
        this.cardElementToShowDetails = cardElement;
    }

    public isContainerWidthSmall(): boolean {
        return this.innerWidth < 576;
    }

}
