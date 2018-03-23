import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HomeCookEvent } from '../home-cook-event';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
    public event: HomeCookEvent;
    public userName: string;
    public errorNameMessage: string;
    public cardTypeList = [{name:"Question-Card", type:0}, {name:"One-Vote-Card",type:1},{name:"Multiple-Vote-Card",type:2} ];

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
        let validNewName: boolean;
        let errorMessage:  string;
        [validNewName, errorMessage] = this.eventService.addNewGuest(newGuestName);
        if(!validNewName){
            console.log(errorMessage);
        } else {
            this.userName =  newGuestName;
        }
    }

    public afficher(s: String) {
        console.log(s);
    }

    public createNewCard(value: String) {


    }
}
