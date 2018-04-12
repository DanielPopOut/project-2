import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HomeCookCard } from '../home-cook-card';
import { EventService } from '../event.service';
import { UserService } from '../user.service';
import { ServerService } from '../server.service';
import { ModalsService } from '../modals.service';

@Component({
    selector: 'app-card-creation',
    templateUrl: './card-creation.component.html',
    styleUrls: ['./card-creation.component.css']
})
export class CardCreationComponent implements OnInit {
    public cardToCreate: HomeCookCard;
    // public cardTypeList = [new HomeCookCard("0", "Question-Card", 0), new HomeCookCard('1', "One-Vote-Card", 1), new HomeCookCard('2', "Multiple-Vote-Card", 2)];

    @ViewChild('newCardNameInput') newCardNameInput: ElementRef;
    @ViewChild('buttonHiddenCardModal') buttonHiddenCardModal: ElementRef;


    constructor(private eventService: EventService, private userService: UserService, private serverService: ServerService, private modalsService: ModalsService) {
        this.modalsService.newCardSubject$.subscribe(bool => {
            this.showModal();
        });
    }

    ngOnInit() {
        this.cardToCreate = new HomeCookCard(undefined, "", 0, this.eventService.event._id);
    }

    public showModal() : void {
        this.cardToCreate = new HomeCookCard(undefined, "", 0, this.eventService.event._id);
        this.buttonHiddenCardModal.nativeElement.click();
        this.newCardNameInputFocus();
    }

    public createNewCard(cardToCreateName: string): void {
        this.cardToCreate = new HomeCookCard(undefined, cardToCreateName, 0, this.eventService.event._id);
        this.addHomeCookCard(this.cardToCreate);
    }

    public newCardNameInputFocus(): void {
        setTimeout(() => {
            this.newCardNameInput.nativeElement.focus();
        }, 500)
    }

    public addHomeCookCard(homeCookCard: HomeCookCard): void {
        this.serverService.addHomeCookCardRequest(homeCookCard).subscribe(response => {
            if (response.status === 200) {
                homeCookCard._id = response.body;
                this.eventService.addNewCard(this.cardToCreate);
            }
        });
    }

}
