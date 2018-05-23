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
    public inputNewGuestVisible: boolean;
    public newGuestNameTyped: string;
    @ViewChild('newGuestName') newGuestNameInput: ElementRef;
    @ViewChild('buttonModal') buttonModal: ElementRef;


    constructor(private eventService: EventService, private userService: UserService, private serverService: ServerService) {
        this.userService.nonConnected$.subscribe(bool => {
            this.showConnexionModal();
        });
    }

    ngOnInit() {
        this.event = this.eventService.event;
        this.inputNewGuestVisible = false;
    }

    public chooseName(guest: string): void {
        this.userName = guest;
        this.userService.setUsername(guest);
        console.log("new user " + this.userName);
        this.buttonModal.nativeElement.click();
        // this.newGuestNameInput.nativeElement.setAttribute('value', "nuir");
    }

    public addNewGuest(newGuestName: string): void {
        if (!this.validGuestName(newGuestName)) {
            return;
        }
        this.serverService.addHomeCookGuestRequest(this.eventService.event._id, newGuestName).subscribe(response => {
            if (response.status === 200 || response.status === 304) {
                this.userName = newGuestName;
                this.userService.addNewGuest(newGuestName);
                this.newGuestNameTyped = '';
                this.hideInputNewGuest();
                this.buttonModal.nativeElement.click();
            } else {
                console.log("erreur ajout de nom");
            }

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

    public showInputNewGuest() : void {
        this.inputNewGuestVisible = true;
        this.newGuestNameInputFocus();
    }

    public hideInputNewGuest() : void {
        this.inputNewGuestVisible = false;
    }
}
