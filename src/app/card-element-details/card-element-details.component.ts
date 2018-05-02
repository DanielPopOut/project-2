import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardElement } from '../card-element';
import { EventService } from '../event.service';
import { CardElementService } from '../card-element.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-card-element-details',
    templateUrl: './card-element-details.component.html',
    styleUrls: ['./card-element-details.component.css']
})
export class CardElementDetailsComponent implements OnInit, OnDestroy {
    public cardElement: CardElement;
    public votersValues: any[];

    constructor(private eventService: EventService, private cardElementService: CardElementService, private router: Router) {
    }

    ngOnInit() {
        this.cardElement = this.eventService.cardElementToShowDetails;
        this.votersValues = [];
        this.sortCardElementVoter();
        setTimeout(() => {
            console.log("nginit cardelementdetails");
            console.log(this.cardElementService.cardElementList.map(x => x.voters));
        }, 2000);
    }

    ngOnDestroy() {
        console.log("destroy card element details");
        console.log(this.cardElementService.cardElementList.map(x => x.voters));
    }

    public sortCardElementVoter(): void {
        this.cardElement.voters.sort(function (a, b) {
            return b.nbVotes - a.nbVotes
        });
        // On change le tableau pour actualiser l'ordre des cartes
        // this.cardElement.voters = this.cardElementList.slice();
    }


    public getTotalVotersNumber(valeurVoulue: number) : number {
        let tableauNumber1 = this.cardElement.voters.map(x => x.nbVotes === valeurVoulue ? 1 : 0);
        //return tableauNumber1.reduce( (accumulator, currentValue) => accumulator + currentValue );
        return 1;
    }

    // public getTotalVotersNumber(): number {
    //     let totalVotersNumber = 0;
    //     for (let voter of this.cardElement.voters) {
    //         totalVotersNumber += voter.nbVotes;
    //     }
    //     return totalVotersNumber;
    // }

    public navigateToEvent(): void {
        this.router.navigate(['event']);
    }

}
