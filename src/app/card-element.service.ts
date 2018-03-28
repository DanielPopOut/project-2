import { Injectable } from '@angular/core';
import { CardElement } from './card-element';
import { HomeCookCard } from './home-cook-card';

@Injectable()
export class CardElementService {
    public cardElementToCreate: CardElement;
    public cardElementList: CardElement[];

    constructor() {
        this.cardElementList = [{id: "test0", type: 2, card_id: "2", title: "Pastèque"}, {
            id: "test1",
            type: 2,
            card_id: "2",
            title: "Banane"
        },
            {id: "test2", type: 2, card_id: "1", title: "Poulet"}, {id: "test3", type: 2, card_id: "1", title: "Tofu"},
            {
                id: "test4",
                type: 2,
                card_id: "1",
                title: "Ceci est un test avec une ligne plus grande que les autres pour voir si elle aura la meme taille"
            }];
    }

    public setCardElementToCreate(card: HomeCookCard): void {
        this.cardElementToCreate = new CardElement();
        this.cardElementToCreate.type = card.type;
        this.cardElementToCreate.card_id = card.id;
    }

    public newCardElement(title: string): void {
        this.cardElementToCreate.title = title;
        // this.cardElementList.push(this.cardElementToCreate);
        let newCardElementList = this.cardElementList.slice();
        newCardElementList.push(this.cardElementToCreate);
        // this.event.cards.push(cardToCreate);
        this.cardElementList = newCardElementList;
        console.log(this.cardElementList);
    }

    public voteForCardElement(cardId: string, voterName: string): void {
        const card = this.cardElementList.find(card => card.id === cardId);
        card.voters.push(voterName);
        this.sortCardElementList();

    }

    public unvoteForCardElement(cardId: string, voterName: string): void {
        const card = this.cardElementList.find(card => card.id === cardId);
        let index = card.voters.indexOf(voterName);
        if (index > -1) {
            card.voters.splice(index, 1);
        }
        this.sortCardElementList();
    }

    public sortCardElementList(): void {
        this.cardElementList.sort(function(a, b){return b.voters.length-a.voters.length})
        let newCardElementList = this.cardElementList.slice();
        // On change le tableau pour actualiser l'ordre des cartes
        this.cardElementList = newCardElementList;
    }
}
