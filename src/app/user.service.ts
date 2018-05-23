import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { EventService } from "./event.service";

@Injectable()
export class UserService {
    //aim : check if user connected. Handle user connexion.
    public username: string;

    private nonConnected = new Subject<boolean>();
    public nonConnected$ = this.nonConnected.asObservable();


    constructor(private eventService: EventService) {
    }

    public setUsername(newUsername :  string){
        this.username =  newUsername;
        this.eventService.username = newUsername;
        localStorage.setItem(this.eventService.event._id, newUsername);
    }

    public retrieveUsername() {
        let nameFound = localStorage.getItem(this.eventService.event._id);
        if(nameFound){
            this.setUsername(nameFound);
        }else {
            this.showConnexionFormEvent(true);
        }
    }

    public showConnexionFormEvent(bool: boolean) {
        if (bool) {
            this.nonConnected.next(bool);
        }
    }

    public isUserNameValid(): boolean {
        if (!this.username || this.username.trim().length < 1) {
            return false;
        }
        return true;
    }

    public addNewGuest(newGuestName: string): void {
        this.eventService.event.guests.push(newGuestName);
        this.setUsername(newGuestName);
    }

    public validGuestName(name: string): [boolean, string] {
        if (!name.trim()) {
            return [false, 'Name length > 0 plz '];
        } else if (this.eventService.event.guests.indexOf(name.trim()) > -1 || this.eventService.event.host_name === name.trim()) {
            return [false, 'This name is already taken'];
        }
        return [true, ''];
    }

}
