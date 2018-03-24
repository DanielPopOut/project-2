import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HomeCookEvent } from '../home-cook-event';
import { HomeCookCard } from '../home-cook-card';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
    public event: HomeCookEvent;
    public cardTypeList = [new HomeCookCard("Question-Card", 0), new HomeCookCard("One-Vote-Card", 1), new HomeCookCard("Multiple-Vote-Card", 2)];
    public cardToCreate: HomeCookCard;

    constructor(private eventService: EventService) {
        this.eventService.mock();
    }

    ngOnInit() {
        this.event = this.eventService.event;
    }

    public setTypeCardToCreate(homeCookCardToCreate: HomeCookCard) {
        console.log('type defined ' + homeCookCardToCreate.type);
        this.cardToCreate = new HomeCookCard("", homeCookCardToCreate.type );
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
