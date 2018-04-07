import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { CardElementService } from '../card-element.service';
import { ModalsService } from '../modals.service';
import { HomeCookCard } from '../home-cook-card';
import { CardElement } from '../card-element';
import { EventService } from '../event.service';
import { ServerService } from '../server.service';

@Component({
    selector: 'app-card-element-modal',
    templateUrl: './card-element-modal.component.html',
    styleUrls: ['./card-element-modal.component.css']
})
export class CardElementModalComponent implements OnInit {
    public newCardElementName: string;
    public elementCardParent: HomeCookCard;
    @ViewChild('newCardElementNameInput') newCardElementNameInput: ElementRef;
    @ViewChild('buttonHiddenCardElementModal') buttonHiddenCardElementModal: ElementRef;

    constructor(private userService: UserService, private cardElementService: CardElementService,
                private modalsService: ModalsService, private eventService: EventService, private serverService: ServerService) {
        this.modalsService.newCardElementSubject$.subscribe(card => {
            this.elementCardParent = card;
            this.showNewCardElementModal();
        });
    }

    ngOnInit() {
    }

    public newCardElementNameInputFocus(): void {
        setTimeout(() => {
            this.newCardElementNameInput.nativeElement.focus();
        }, 500);
    }

    public createNewCardElement(title: string): void {
        let cardElementToCreate = new CardElement(undefined, title, this.elementCardParent.type,
            this.eventService.event._id, this.elementCardParent._id, this.userService.username);
        this.addCardElement(cardElementToCreate);
        this.newCardElementName = "";
    }

    public showNewCardElementModal(): void {
        this.buttonHiddenCardElementModal.nativeElement.click();
        this.newCardElementNameInputFocus();
    }

    public addCardElement(cardElementToAdd: CardElement): void {
        this.serverService.addCardElementRequest(cardElementToAdd).subscribe(response => {
            if (response.status === 200) {
                cardElementToAdd._id = response.body;
                this.cardElementService.addCardElement(cardElementToAdd);
            }
        });
    }

}
