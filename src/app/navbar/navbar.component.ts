import { Component, OnInit } from '@angular/core';
import { HomeCookEvent } from '../home-cook-event';
import { EventService } from '../event.service';
import { HomeCookCard } from '../home-cook-card';
import { UserService } from '../user.service';
import { ModalsService } from '../modals.service';
import { Router } from '@angular/router';
import { ModalParams } from '../modal/modalClass';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public event: HomeCookEvent;

    constructor(private eventService: EventService, private userService: UserService, private modalService: ModalService, private modalsService: ModalsService, private router: Router) {

    }

    ngOnInit() {
        this.event = this.eventService.event;
    }

    public setIdCardToShow(card: HomeCookCard): void {
        this.eventService.cardIdToShow = card._id;
        for (let i in this.event.cards) {
            if (this.event.cards[i]._id === this.eventService.cardIdToShow) {
                this.eventService.setCardNumberToShow(parseFloat(i));
                return;
            }
        }
        this.eventService.setCardNumberToShow(0);
        return
    }


    public newCardClick() {
        this.modalsService.showNewCardModal();
    }

    public newCardElementClick() {
        this.modalsService.showNewCardElementModal(this.eventService.getActiveCard());
    }

    public deleteCardClick() {
        // this.eventService.deleteCard(this.eventService.getActiveCard());
        this.modalsService.openModalToDeleteCard(this.eventService.getActiveCard());
    }

    public shouldNavBarCardBeVisible(card_id: string): boolean {
        let carteAffichee = this.eventService.cardNumberToShow;
        let nbcartes = this.eventService.event.cards.length;
        if (nbcartes < 1) {
            return false;
        }
        let valeursATester = [];
        if (carteAffichee - 1 < 0) {
            valeursATester = [carteAffichee, (carteAffichee + 1) % nbcartes, (carteAffichee + 2  ) % nbcartes];
        } else if (carteAffichee + 1 === nbcartes) {
            valeursATester = [carteAffichee, (carteAffichee - 1 + nbcartes) % nbcartes, (carteAffichee - 2 ) % nbcartes];
        } else {
            valeursATester = [carteAffichee, (carteAffichee - 1 + nbcartes) % nbcartes, (carteAffichee + 1 ) % nbcartes];
        }
        if (this.eventService.event.cards[valeursATester[0]]._id === card_id ||
            this.eventService.event.cards[valeursATester[1]]._id === card_id ||
            this.eventService.event.cards[valeursATester[2]]._id === card_id) {
            return true;
        }
        return false;
    }

    public goBackToHome() {
        this.router.navigate(['']);
    }

    public optionsMenuClick() {

        let modalData = new ModalParams();
        modalData.setOneChoice("Action ", ['New card', 'New choice', 'Delete card']);
        this.modalService.listenToNewValueAndOpenModal(this, modalData, (actionChosen) => {
            this.executeActionChosen(actionChosen)
        });
    }

    public executeActionChosen(actionChosen: string) {
        switch (actionChosen) {
            case 'New card':
                this.newCardClick();
                break;

            case 'New choice':
                this.newCardElementClick();
                break;

            case 'Delete card':
                this.deleteCardClick();
                break;

        }
    }
}
