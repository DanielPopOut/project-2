import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HomeCookEvent } from '../home-cook-event';
import { CardElementService } from '../card-element.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
    public event: HomeCookEvent;
    public newCardElementName: string;

    constructor(private eventService: EventService, private cardElementService: CardElementService ) {
        this.eventService.mock();
    }

    ngOnInit() {
        this.newCardElementName = "";
        this.event = this.eventService.event;
    }

    public createNewCardElement(name : string) {
        this.cardElementService.newCardElement(name);
        this.newCardElementName = "";
    }
}
