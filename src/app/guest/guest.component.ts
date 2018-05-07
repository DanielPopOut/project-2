import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../event.service';
import { HomeCookEvent } from '../home-cook-event';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user.service';
import { ServerService } from '../server.service';

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


    constructor(private eventService: EventService, private userService: UserService, private serverService: ServerService) {
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
        if (!this.validGuestName(newGuestName)) {
            return;
        }
        this.serverService.addHomeCookGuestRequest(this.eventService.event._id, newGuestName).subscribe(resp => {
            console.log(resp);
            this.userService.addNewGuest(newGuestName);
        });
    }

    public validGuestName(name: string): boolean {
        if (!name.trim()) {
            return false;
        } else if (this.eventService.event.guests.indexOf(name.trim()) > -1 || this.eventService.event.host_name === name.trim()) {
            return false;
        }
        return true;
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
