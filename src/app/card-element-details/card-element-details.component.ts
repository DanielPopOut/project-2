import { Component, OnInit } from '@angular/core';
import { CardElement } from '../card-element';
import { EventService } from '../event.service';
import { CardElementService } from '../card-element.service';
import { Router } from "@angular/router";
import { ModalParams } from '../modal/modalClass';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'app-card-element-details',
    templateUrl: './card-element-details.component.html',
    styleUrls: ['./card-element-details.component.css']
})
export class CardElementDetailsComponent implements OnInit {
    public cardElement: CardElement;
    public votersValues: any[];
    public positiveVoters : any[];
    public negativeVoters : any[];
    public maxTableSize: number;
    public tableSizeRangeArray: number [];

    constructor(private eventService: EventService, private cardElementService: CardElementService, private router: Router, private modalService: ModalService) {
        this.eventService.cardElementDeleted$.subscribe(value => {
            if (value) {
                this.navigateToEvent();
            }
        })
    }

    ngOnInit() {
        this.cardElement = this.eventService.cardElementToShowDetails;
        this.votersValues = [];
        this.sortCardElementVoter();
        this.handlePositiveNegativeVotes();
    }

    public handlePositiveNegativeVotes() {
        this.positiveVoters = this.cardElement.voters.filter( x => x.nbVotes == 1);
        this.negativeVoters = this.cardElement.voters.filter( x => x.nbVotes == 2);
        this.maxTableSize = Math.max(this.positiveVoters.length, this.negativeVoters.length);
        this.tableSizeRangeArray = Array.from({length: this.maxTableSize}, (x, i) => i);
    }

    public sortCardElementVoter(): void {
        this.cardElement.voters.sort(function (a, b) {
            return b.nbVotes - a.nbVotes
        });
    }


    public getTotalVotersNumber(valeurVoulue: number): number {
        if (this.cardElement.voters.length < 1) {
            return 0;
        }
        let tableauNumber1 = this.cardElement.voters.map(x => (x.nbVotes === valeurVoulue ? 1 : 0));
        return tableauNumber1.reduce(this.getSum, 0);
    }

    public getSum(total, num) {
        return total + num;
    }

    public deleteCardElement() {
        let modalData = new ModalParams();
        modalData.setQuestion("Voulez vous vraiment supprimer cette carte ?", 'Attention, cela est irréversible', 'Oui');
        this.modalService.listenToNewValueAndOpenModal(this, modalData, (valueReturned) => {
            if (valueReturned) {
                this.eventService.deleteCardElement(this.cardElement);
            }
        });
    }

    public navigateToEvent(): void {
        this.eventService.emitNewHomeCookEvent();
    }

}
