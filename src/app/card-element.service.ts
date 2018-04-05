import { Injectable } from '@angular/core';
import { CardElement } from './card-element';
import { HomeCookCard } from './home-cook-card';
import { Voter } from './voter';
import { EventService } from './event.service';

@Injectable()
export class CardElementService {
    public cardElementToCreate: CardElement;
    public cardElementList: CardElement[];
    public fakeCardElementList: CardElement[] = [
        new CardElement("test0", "Pastèque", 2, "eafeafea", "0", "Remy"),
        new CardElement("test1", "Banane", 2, "eafeafea", "2", "Remy"),
        new CardElement("test2", "Poulet", 2, "eafeafea", "1", "Remy"),
        new CardElement("test3", "Tofu", 2, "fnoqeaf", "1", "Remy"),
        new CardElement("test4", "Ceci est un test avec une ligne plus grande que les autres pour voir si elle aura la meme taille", 2, "fnoqeaf", "2", "Remy")];


    constructor(private eventService: EventService) {
        this.cardElementList = this.fakeCardElementList;
        console.log("build cardelementservice")
    }

    public setCardElementToCreate(card: HomeCookCard): void {
        this.cardElementToCreate = new CardElement("", "", null, "", "", "");
        this.cardElementToCreate.type = card.type;
        this.cardElementToCreate.card_id = card._id;
    }

    public newCardElement(eventId: string, title: string): void {
        this.cardElementToCreate.event_id = eventId;
        this.cardElementToCreate.title = title;
        // this.cardElementList.push(this.cardElementToCreate);
        this.cardElementList.push(this.cardElementToCreate);
        this.cardElementList = this.cardElementList.slice();
    }

    public voteForCardElement(cardId: string, voterName: string): void {
        let cardElement = this.cardElementList.find(card => card._id === cardId);
        let voter = this.cardElementContainsVoter(cardElement, voterName);
        if (voter) {
            voter.vote();
        } else {
            voter = new Voter(voterName, 1);
            cardElement.voters.push(voter);
        }
        // this.sortCardElementList();
    }

    public cardElementContainsVoter(cardElement: CardElement, voterName: string): Voter {
        for (let voter of cardElement.voters) {
            if (voter.name === voterName) return voter;
        }
        return null;
    }

    public sortCardElementList(): void {
        this.cardElementList.sort(function (a, b) {
            let [b_total, a_total] = [0, 0];
            for(let voter of b.voters){
                b_total += voter.nbVotes;
            }
            for(let voter of a.voters){
                a_total += voter.nbVotes;
            }
            return b_total - a_total;
        });
        // On change le tableau pour actualiser l'ordre des cartes
        this.cardElementList = this.cardElementList.slice();
    }

    public getTotalVotersNumber(cardId: string): number {
        const cardElement = this.cardElementList.find(card => card._id === cardId);
        let totalVotersNumber = 0;
        for (let voter of cardElement.voters) {
            totalVotersNumber += voter.nbVotes;
        }
        return totalVotersNumber;
    }


    public saveCardElementList() : void {
        this.eventService.savedCardElementList = this.cardElementList.slice();
        for (let voter in this.cardElementList ){
            this.eventService.savedCardElementList[voter] = Object.assign({}, this.cardElementList[voter]) as CardElement;
        }
    }

    public restoreCardElementList() : void {
        for (let voter in this.cardElementList ){
            this.cardElementList[voter].voters = this.eventService.savedCardElementList[voter].voters.slice();
        }
    }
}
