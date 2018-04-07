import { Component, Input, OnInit } from '@angular/core';
import { HomeCookEvent } from '../home-cook-event';
import { EventService } from '../event.service';
import { HomeCookCard } from '../home-cook-card';
import { UserService } from '../user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public event: HomeCookEvent;

    constructor(private eventService: EventService, private userService: UserService) {

    }

    ngOnInit() {
        this.event = this.eventService.event;
    }

    public setIdCardToShow(card: HomeCookCard) : void {
        this.eventService.cardIdToShow = card._id;
        for (let i in this.event.cards){
            if(this.event.cards[i]._id=== this.eventService.cardIdToShow){
                this.eventService.setCardNumberToShow(parseFloat(i));
                return;
            }
        }
        this.eventService.setCardNumberToShow(0);
        return
    }


    public newCardClick() {
        if (this.userService.isUserNameValid()){
            this.eventService.showNewCardModal();
        }else {
            this.userService.showConnexionFormEvent(true);
            return;
        }
    }

    public newCardElementClick() {
        if (this.userService.isUserNameValid()){
            this.eventService.checkUsernameAndOpenCardElementModal();
        }else {
            this.userService.showConnexionFormEvent(true);
            return;
        }
    }
}
