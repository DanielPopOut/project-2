import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../event.service';
import { HomeCookEvent } from '../home-cook-event';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user.service';

@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

    public event: HomeCookEvent;
    public userName: string;
    private subscription: Subscription;
    @ViewChild('newGuestName') newGuestNameInput: ElementRef;
    @ViewChild('buttonModal') buttonModal: ElementRef;


    constructor(private eventService: EventService, private userService: UserService) {
        this.userService.nonConnected$.subscribe(bool => {
            this.showConnexionModal();
        });
    }

    ngOnInit() {
        this.event = this.eventService.event;
    }

    public chooseName(guest: string): void {
        this.userName = guest;
        this.userService.username = guest;
        console.log("new user " + this.userName);
    }

    public addNewGuest(newGuestName: string): void {
        console.log(newGuestName);
        let validNewName: [boolean, string];
        validNewName = this.userService.addNewGuest(newGuestName);
        if (validNewName[0]) {
            this.userName = newGuestName;
        } else {
            console.log(validNewName[1]);
        }
    }

    public newGuestNameInputFocus(): void {
        setTimeout(() => {
            this.newGuestNameInput.nativeElement.focus();
        }, 500);
    }

    public showConnexionModal() : void {
         this.buttonModal.nativeElement.click();
    }
}
