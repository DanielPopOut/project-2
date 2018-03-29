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
        // On change le tableau pour actualiser l'ordre des cartes
        // this.cardElement.voters = this.cardElementList.slice();
    }

    public getTotalVotersNumber(): number {
        let totalVotersNumber = 0;
        for (let voter of this.cardElement.voters) {
            totalVotersNumber += voter.nbVotes;
        }
        return totalVotersNumber;
    }

    public navigateToEvent(): void {
        this.router.navigate(['event']);
    }

}
