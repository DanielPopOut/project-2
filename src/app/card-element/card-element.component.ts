import { Component, Input, OnInit } from '@angular/core';
import { CardElement } from '../card-element';
import { CardElementService } from '../card-element.service';
import { EventService } from '../event.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-card-element',
    templateUrl: './card-element.component.html',
    styleUrls: ['./card-element.component.css']
})
export class CardElementComponent implements OnInit {
    public title = 'none';
    public showInfosBoolean: boolean;
    public color: string;
    @Input() cardElement: CardElement;

    constructor(private cardElementService: CardElementService, private eventService: EventService, private router: Router) {
    }

    ngOnInit() {
        this.showInfosBoolean = true;
        this.cardElement.voters = [];
        this.color = this.getRandomColor();
    }

    public showInfos(bool: boolean): void {
        this.showInfosBoolean = bool;
    }

    public voteForCard(): void {
        if (this.eventService.isUserNameValid()) {
            this.cardElementService.voteForCardElement(this.cardElement.id, this.eventService.username);
        } else {
            this.eventService.userInvalidEvent(true);
        }
    }

    public unvoteForCard(): void {
        if (this.eventService.isUserNameValid()) {
            this.cardElementService.unvoteForCardElement(this.cardElement.id, this.eventService.username);
        } else {
            this.eventService.userInvalidEvent(true);
        }
    }

    public getRandomColor(): string {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return "#" + ((1 << 24) * Math.random() | 0).toString(16);
        // return color;
    }

    public showCardDetails(): void {
        console.log('ici');
        this.eventService.setCardDetails(this.cardElement);
        this.cardElementService.saveCardElementList();

        this.router.navigate(['card-details']);
    }

    public getUserNumberVotes(): string {
        let voter = this.cardElementService.cardElementContainsVoter(this.cardElement, this.eventService.username);

        // let numberVotes = this.cardElement.voters.filter(voter => voter.name === this.eventService.username).length;
        return voter == null ? '0' : voter.nbVotes.toString();
    }


}
