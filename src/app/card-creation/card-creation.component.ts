import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HomeCookCard } from '../home-cook-card';
import { EventService } from '../event.service';

@Component({
    selector: 'app-card-creation',
    templateUrl: './card-creation.component.html',
    styleUrls: ['./card-creation.component.css']
})
export class CardCreationComponent implements OnInit {
    public cardToCreate: HomeCookCard;
    public cardTypeList = [new HomeCookCard("0", "Question-Card", 0), new HomeCookCard('1', "One-Vote-Card", 1), new HomeCookCard('2', "Multiple-Vote-Card", 2)];
    public cardToCreateName: string;

    @ViewChild('newCardNameInput') newCardNameInput: ElementRef;

    constructor(private eventService: EventService, private renderer2: Renderer2) {
    }

    ngOnInit() {
        this.cardToCreate = new HomeCookCard("", "", 0);
    }

    public setTypeCardToCreate(homeCookCardToCreate: HomeCookCard) {
        console.log('type defined ' + homeCookCardToCreate.type);
        this.newCardNameInput.nativeElement.focus();
        this.cardToCreate = new HomeCookCard("5", "", homeCookCardToCreate.type);
        // let onElement = this.renderer2.selectRootElement('#newCardNameInput');
        // onElement.focus();
        this.newCardNameInputFocus();
    }

    public createNewCard(cardToCreateName: string): void {
        this.cardToCreate.name = cardToCreateName;
        this.cardToCreate.id = Math.floor(Math.random() * 16).toString();
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

    public checkUserNameValid(): void {
        console.log("ici");
        if(!this.eventService.isUserNameValid()){
            this.eventService.userInvalidEvent(true);
            console.log("ici2");
        }
    }

}
