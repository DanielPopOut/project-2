import { Injectable } from '@angular/core';
import { HomeCookCard } from './home-cook-card';
import { UserService } from './user.service';
import { ModalParams } from './modal/modalClass';
import { ModalService } from './modal/modal.service';
import { ServerService } from './server.service';
import { EventService } from './event.service';
import { CardElement } from './card-element';
import { CardElementService } from './card-element.service';

@Injectable()
export class ModalsService {
    private elementCardParent: HomeCookCard;

    constructor(private userService: UserService, private modalService: ModalService,
                private serverService: ServerService, private eventService: EventService,
                private cardElementService: CardElementService) {
    }

    public showNewCardModal(): void {
        if (this.userService.isUserNameValid()) {
            this.openModalToCreateNewCard();
        } else {
            this.userService.showConnexionFormEvent(true);
            return;
        }
    }

    public showNewCardElementModal(card: HomeCookCard): void {
        this.elementCardParent = card;
        if (this.userService.isUserNameValid()) {
            this.openModalToCreateNewCardElement();
        } else {
            this.userService.showConnexionFormEvent(true);
        }
    }

    public openModalToDeleteCard(cardToDelete: HomeCookCard): void {
        let modalData = new ModalParams();
        modalData.setQuestion("Voulez vous vraiment supprimer cette carte ?", 'Attention, cela est irréversible', 'Oui');
        this.modalService.listenToNewValueAndOpenModal(this, modalData, (valueReturned) => {
            if (valueReturned) {
                this.eventService.deleteCard(cardToDelete);
            }
        });
    };

    public openModalToCreateNewCard(): void {
        let modalData = new ModalParams();
        modalData.setModalIput("New card", '', '');
        this.modalService.listenToNewValueAndOpenModal(this, modalData, (cardToCreateName) => {
            let cardToCreate = new HomeCookCard(undefined, cardToCreateName, 0, this.eventService.event._id);
            this.addHomeCookCard(cardToCreate);
        });
    }

    public addHomeCookCard(homeCookCard: HomeCookCard): void {
        this.serverService.addHomeCookCardRequest(homeCookCard).subscribe(response => {
            if (response.status === 200) {
                homeCookCard._id = response.body;
                this.eventService.addNewCard(homeCookCard);
            }
        });
    }

    public openModalToCreateNewCardElement(): void {
        let modalData = new ModalParams();
        modalData.setModalIput("New choice", '', '');
        this.modalService.listenToNewValueAndOpenModal(this, modalData, (cardElementTitleToCreate) => {
            let cardElementToCreate = new CardElement(undefined, cardElementTitleToCreate, this.elementCardParent.type,
                this.eventService.event._id, this.elementCardParent._id, this.userService.username);
            this.addCardElement(cardElementToCreate);
        });
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
