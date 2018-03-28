import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HomeCookEvent } from '../home-cook-event';

@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

    public event: HomeCookEvent;
    public userName: string;

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.event = this.eventService.event
    }

    public chooseName(guest: string): void {
        this.userName = guest;
        this.eventService.username = guest;
        console.log("new user " + this.userName);
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
}
