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
    public userName: string;
    public errorNameMessage: string;
    public cardTypeList = [new HomeCookCard("Question-Card", 0), new HomeCookCard("One-Vote-Card", 1), new HomeCookCard("Multiple-Vote-Card", 2)];
    public cardTypeToCreate;
    public cardToCreate: HomeCookCard;

    constructor(private eventService: EventService) {
        this.eventService.mock();
    }

    ngOnInit() {
        this.event = this.eventService.event;
        console.log("username" + this.userName);

    }

    public chooseName(guest: string): void {
        this.userName = guest;
        console.log("username" + this.userName);
    }

    public addNewGuest(newGuestName: string): void {
        console.log(newGuestName);
        let validNewName: [boolean, string];
        validNewName = this.eventService.addNewGuest(newGuestName);
        if (!validNewName[0]) {
            console.log(validNewName[1]);
        } else {
            this.userName = newGuestName;
        }
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
