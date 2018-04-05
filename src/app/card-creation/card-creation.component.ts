import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HomeCookCard } from '../home-cook-card';
import { EventService } from '../event.service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-card-creation',
    templateUrl: './card-creation.component.html',
    styleUrls: ['./card-creation.component.css']
})
export class CardCreationComponent implements OnInit {
    public cardToCreate: HomeCookCard;
    // public cardTypeList = [new HomeCookCard("0", "Question-Card", 0), new HomeCookCard('1', "One-Vote-Card", 1), new HomeCookCard('2', "Multiple-Vote-Card", 2)];
    public cardToCreateName: string;

    @ViewChild('newCardNameInput') newCardNameInput: ElementRef;
    @ViewChild('buttonHiddenCardModal') buttonHiddenCardModal: ElementRef;


    constructor(private eventService: EventService, private userService: UserService) {
        this.eventService.newCardSubject$.subscribe(bool => {
            this.showModal();
        });
    }

    ngOnInit() {
        this.cardToCreate = new HomeCookCard("", "", 0);
    }

    public showModal() : void {
        this.cardToCreate = new HomeCookCard("5", "", 0);
        this.buttonHiddenCardModal.nativeElement.click();
        this.newCardNameInputFocus();
    }

    public createNewCard(cardToCreateName: string): void {
        this.cardToCreate.name = cardToCreateName;
        this.cardToCreate._id = Math.floor(Math.random() * 16).toString();
        this.cardToCreateName = "lalala";
        console.log(this.cardToCreate);
        let validCardName: [boolean, string];
        validCardName = this.eventService.createNewCard(this.cardToCreate);
        if (!validCardName[0]) {
            console.log(validCardName[1]);
        }
    }

    public newCardNameInputFocus(): void {
        setTimeout(() => {
            this.newCardNameInput.nativeElement.focus();
        }, 500)
    }

}
