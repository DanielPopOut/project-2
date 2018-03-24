import { Component, OnInit } from '@angular/core';
import { HomeCookCard } from '../home-cook-card';
import { EventService } from '../event.service';

@Component({
    selector: 'app-card-creation',
    templateUrl: './card-creation.component.html',
    styleUrls: ['./card-creation.component.css']
})
export class CardCreationComponent implements OnInit {
    public cardToCreate: HomeCookCard;
    public cardTypeList = [new HomeCookCard("Question-Card", 0), new HomeCookCard("One-Vote-Card", 1), new HomeCookCard("Multiple-Vote-Card", 2)];


    constructor(private eventService: EventService) {

    }

    ngOnInit() {
    }

    public setTypeCardToCreate(homeCookCardToCreate: HomeCookCard) {
        console.log('type defined ' + homeCookCardToCreate.type);
        this.cardToCreate = new HomeCookCard("", homeCookCardToCreate.type);
    }

    public createNewCard(cardToCreateName: string): void {
        this.cardToCreate.name = cardToCreateName;
        console.log(this.cardToCreate);
        let validCardName: [boolean, string];
        validCardName = this.eventService.createNewCard(this.cardToCreate);
        if (!validCardName[0]) {
            console.log(validCardName[1]);
        }
    }

}
