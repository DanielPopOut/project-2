import { Injectable } from '@angular/core';
import { CardElement } from './card-element';
import { Voter } from './voter';

@Injectable()
export class CardElementService {
    public cardElementList: CardElement[];

    constructor() {
        this.cardElementList = [];
    }

    public addCardElement(cardElementToCreate: CardElement): void {
        this.cardElementList.push(cardElementToCreate);
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
            if (voter.name === voterName) return voter as Voter;
        }
        return null;
    }

    public sortCardElementList(): void {
        this.cardElementList.sort(function (a, b) {
            let [b_total, a_total] = [0, 0];
            for (let voter of b.voters) {
                b_total += voter.nbVotes;
            }
            for (let voter of a.voters) {
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

    public mettreAJourCardElement(cardElementToUpdate: CardElement) {
        this.cardElementList[this.cardElementList.findIndex(obj => obj._id == cardElementToUpdate._id)] = cardElementToUpdate;
    }

    public setCardElementList(newCardElementList: CardElement[]) {
        for (let cardElement of newCardElementList) {
            for (let voter in cardElement.voters) {
                let voterdata = cardElement.voters[voter]
                cardElement.voters[voter] = new Voter(voterdata.name, voterdata.nbVotes);
            }
        }
        this.cardElementList = newCardElementList;
    }


}
