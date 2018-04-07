import { Injectable } from '@angular/core';
import { HomeCookEvent } from './home-cook-event';
import { HomeCookCard } from './home-cook-card';
import { CardElement } from './card-element';
import { Subject } from 'rxjs/Subject';
import { Voter } from './voter';
import { ServerService } from './server.service';

@Injectable()
export class EventService {
    public event: HomeCookEvent;
    public fakeEvent = {
        _id: "12345678910",
        host_name: "Daniel",
        name: "Soirée sushis",
        place: "2223 rue saint antoine",
        date: "2018-03-30T12:42",
        mail: "dnaioeno@gmail.com",
        description: "Ce sera du lourd !!!",
        guests: ['Maxime', 'Amandine', 'Prunelle', 'Theo', 'Ash'],
        cards: [new HomeCookCard("0", "Entrée", 0), new HomeCookCard('1', "Plat", 1), new HomeCookCard('2', "Boissons", 2)]
    };
    public testEventId = '5ac6232ff94294ecb3d63409';
    public cardElementToShowDetails: CardElement;
    public savedCardElementList: CardElement[];
    public innerWidth: number;
    public cardIdToShow: string;
    public cardNumberToShow: number;

    constructor( private serverService: ServerService) {
        this.mockWithServer();
        // this.event =this.fakeEvent;
        this.setCardNumberToShow(0);
    }
    //Prend le faux évènement créé plus haut
    public mockWithServer() {
        this.event = new HomeCookEvent();
        this.event.cards = [];
        this.event.guests = [];
        //this.event.setHomeCookEvent(this.fakeEvent);

        setTimeout(()=> {
            this.serverService.getHomeCookEventRequest(this.testEventId).subscribe(response => {
                if (response.status === 200 || response.status === 304 ) {
                    this.event.setHomeCookEvent(response.body);
                    this.getHomeCookCards(this.event._id);
                }
                console.log(this.event);
            });
        }, 1000);
    }

    public getHomeCookCards(eventId: string): void {
        this.serverService.getHomeCookCardsWithEventIdRequest(this.event._id).subscribe(response => {
            this.setNewEventCards(response.body);
        })
    }

    public setNewEventCards(newHomeCookCards : HomeCookCard[]) {
        this.event.cards = newHomeCookCards;
        if(this.event.cards.length > 1) {
            this.cardNumberToShow = 0;
        }
    }

    public setCardNumberToShow(number: number) : void {
        if (this.event.cards.length< 1){
            this.cardNumberToShow = null;
            this.cardIdToShow = null;
        }else {
            this.cardNumberToShow = number;
            this.cardIdToShow = this.event.cards[number]._id;
        }
    }

    public createNewEvent(homeCookEvent: HomeCookEvent): boolean {
        //TODO envoi requete vers server

        //Version test
        this.event = homeCookEvent;
        // this.event['id'] = "12345678910";
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

    public getCardToAddElement(): HomeCookCard {
        if (this.event.cards.length< 1){
            return null;
        }else {
            return this.event.cards[this.cardNumberToShow];
        }
    }
}
