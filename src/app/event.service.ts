import { Injectable } from '@angular/core';
import { HomeCookEvent } from './home-cook-event';
import { HomeCookCard } from './home-cook-card';
import { CardElement } from './card-element';
import { ServerService } from './server.service';
import { CardElementService } from './card-element.service';
import { Subject } from "rxjs/Subject";

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
    public cardElementToShowDetails: CardElement;
    public innerWidth: number;
    public cardIdToShow: string;
    public cardNumberToShow: number;
    private eventFoundSubject = new Subject<boolean>();
    public eventFoundSubject$ = this.eventFoundSubject.asObservable();
    private cardElementDeleted = new Subject<boolean>();
    public cardElementDeleted$ = this.cardElementDeleted.asObservable();

    constructor(private serverService: ServerService, private cardElementService: CardElementService) {
        //
        // if (!this.testEventResearch) {
        //     this.requestEventFromServer();
        // }else {
        //     this.requestEventFromServer(this.testEventResearch);
        // }
        // this.setCardNumberToShow(0);
    }

    //Prend le faux évènement créé plus haut
    public requestEventFromServer(researchUrl = '5acf7677ef98fc62f125636d/Daniel') {
        this.event = new HomeCookEvent();
        this.event.cards = [];
        this.event.guests = [];
        return this.serverService.getHomeCookEventRequest(researchUrl).subscribe(response => {
            if (response.status === 200 || response.status === 304) {
                console.log(response);
                this.event.setHomeCookEvent(response.body);
                this.getHomeCookCards(this.event._id);
                this.getCardElements(this.event._id);
                this.setCardNumberToShow(0);
                this.emitNewHomeCookEvent();
            } else {
                this.emitNewHomeCookEvent(false);
            }
        });
    }

    public emitNewHomeCookEvent(bool: boolean = true) {
        this.eventFoundSubject.next(bool);

    }

    public getCardElements(eventId: string): void {
        this.serverService.getCardsElementWithEventIdRequest(eventId).subscribe(cards => {
            this.cardElementService.setCardElementList(cards.body as CardElement[]);
        });
    }

    public getHomeCookCards(eventId: string): void {
        this.serverService.getHomeCookCardsWithEventIdRequest(eventId).subscribe(response => {
            this.setNewEventCards(response.body);
        })
    }

    public deleteCard(cardToDelete: HomeCookCard): void {
        if (cardToDelete.type < 0) {
            return;
        }
        this.serverService.deleteHomeCookCardRequest(cardToDelete._id).subscribe(response => {
            console.log("carte " + cardToDelete.name, cardToDelete._id, "supprimée");
            // this.setNewEventCards(response.body);
            this.event.cards.splice(this.event.cards.findIndex(obj => obj._id == cardToDelete._id), 1);
            this.setCardNumberToShow((this.cardNumberToShow - 1 + this.event.cards.length) % this.event.cards.length);
        })
    }

    public deleteCardElement(cardElementToDelete: CardElement): void {
        this.serverService.deleteCardElementRequest(cardElementToDelete._id).subscribe(response => {
            console.log("carte " + cardElementToDelete.title, cardElementToDelete._id, "supprimée");
            // this.setNewEventCards(response.body);
            this.cardElementService.cardElementList.splice(this.cardElementService.cardElementList.findIndex(obj => obj._id == cardElementToDelete._id), 1);
            this.cardElementDeleted.next(true);
        })
    }

    public generateInformationCard(): HomeCookCard {
        return new HomeCookCard('0', "Informations", -1, this.event._id);
    }

    public setNewEventCards(newHomeCookCards: HomeCookCard[]) {
        this.event.cards = newHomeCookCards;
        this.event.cards.unshift(this.generateInformationCard());
        //this.setCardNumberToShow(0);
        if (this.event.cards.length > 0) {
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
        this.setCardNumberToShow(this.event.cards.length - 1);
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
