import { Component, OnInit } from '@angular/core';
import { CardElement } from '../card-element';
import { EventService } from '../event.service';
import { CardElementService } from '../card-element.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-card-element-details',
    templateUrl: './card-element-details.component.html',
    styleUrls: ['./card-element-details.component.css']
})
export class CardElementDetailsComponent implements OnInit {
    public cardElement: CardElement;
    public votersValues: any[];

    constructor(private eventService: EventService, private cardElementService: CardElementService, private router: Router) {
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
        return tableauNumber1.reduce((accumulator, currentValue) => accumulator + currentValue);
    }

    // public getTotalVotersNumber(): number {
    //     let totalVotersNumber = 0;
    //     for (let voter of this.cardElement.voters) {
    //         totalVotersNumber += voter.nbVotes;
    //     }
    //     return totalVotersNumber;
    // }

    public deleteCardElement() {
        this.eventService.deleteCardElement(this.cardElement);
    }

    public navigateToEvent(): void {
        this.eventService.emitNewHomeCookEvent();
    }

}
