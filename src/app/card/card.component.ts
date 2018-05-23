import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeCookCard } from '../home-cook-card';
import { CardElementService } from '../card-element.service';
import { EventService } from '../event.service';
import { ModalParams } from '../modal/modalClass';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    @Output() onNewElementClick = new EventEmitter<HomeCookCard>();
    @Input() private card: HomeCookCard;
    @Input() private cardNumberToShow: string;

    constructor(private cardElementService: CardElementService, private eventService: EventService, private modalService: ModalService) {
    }

    ngOnInit() {
    }

    public newElementButtonClick(): void {
        this.onNewElementClick.emit(this.card);
    }

    public deleteCardButtonClick(): void {
        this.openModalToDeleteCard(this.card);
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

}
