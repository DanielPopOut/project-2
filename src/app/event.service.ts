import { Injectable } from '@angular/core';
import { HomeCookEvent } from './home-cook-event';
import { HomeCookCard } from './home-cook-card';
import { CardElement } from './card-element';
import { ServerService } from './server.service';
import { CardElementService } from './card-element.service';

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

    constructor(private serverService: ServerService, private cardElementService: CardElementService) {
        this.mockWithServer();
        // this.event =this.fakeEvent;
        this.setCardNumberToShow(0);
    }

    //Prend le faux évènement créé plus haut
    public mockWithServer() {
        this.event = new HomeCookEvent();
        this.event.cards = [];
        this.event.guests = [];
        this.serverService.getHomeCookEventRequest(this.testEventId).subscribe(response => {
            if (response.status === 200 || response.status === 304) {
                this.event.setHomeCookEvent(response.body);
                this.getHomeCookCards(this.event._id);
                this.getCardElements(this.event._id);
            }
        });
    }

    public getCardElements(eventId: string): void {
        this.serverService.getCardsElementWithEventIdRequest(eventId).subscribe(cards => {
            this.cardElementService.cardElementList = cards.body;
        });
    }

    public getHomeCookCards(eventId: string): void {
        this.serverService.getHomeCookCardsWithEventIdRequest(eventId).subscribe(response => {
            this.setNewEventCards(response.body);
        })
    }

    public deleteCard(card: HomeCookCard ) : void {
        this.serverService.deleteHomeCookCardRequest(card._id).subscribe(response => {
            console.log("carte " + card.name, card._id, "supprimée");
            // this.setNewEventCards(response.body);

        })
    }


    public setNewEventCards(newHomeCookCards: HomeCookCard[]) {
        this.event.cards = newHomeCookCards;
        if (this.event.cards.length > 1) {
            this.cardNumberToShow = 0;
        }
    }

    public setCardNumberToShow(number: number): void {
        if (this.event.cards.length < 1) {
            this.cardNumberToShow = null;
            this.cardIdToShow = null;
        } else {
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

    public addNewCard(cardToCreate: HomeCookCard): void {
        this.event.cards = this.event.cards.slice();
        this.event.cards.push(cardToCreate);
    }

    public setCardDetails(cardElement: CardElement) {
        this.cardElementToShowDetails = cardElement;
    }

    public isContainerWidthSmall(): boolean {
        return this.innerWidth < 576;
    }

    public getActiveCard(): HomeCookCard {
        if (this.event.cards.length < 1) {
            return null;
        } else {
            return this.event.cards[this.cardNumberToShow];
        }
    }
}
