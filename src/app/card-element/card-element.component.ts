import { Component, Input, OnInit } from '@angular/core';
import { CardElement } from '../card-element';
import { CardElementService } from '../card-element.service';
import { EventService } from '../event.service';
import { Router } from "@angular/router";
import { UserService } from '../user.service';

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

    constructor(private cardElementService: CardElementService, private eventService: EventService,
                private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.showInfosBoolean = true;
        this.cardElement.voters = [];
        this.color = this.getRandomColor();
    }

    public checkUsernameValidAndVoteForCard(): void {
        if (this.userService.isUserNameValid()) {
            this.cardElementService.voteForCardElement(this.cardElement._id, this.userService.username);
        } else {
            this.userService.showConnexionFormEvent(true);
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
        this.eventService.setCardDetails(this.cardElement);
        this.cardElementService.saveCardElementList();
        this.router.navigate(['card-details']);
    }

    public getUserNumberVotes(): number {
        let voter = this.cardElementService.cardElementContainsVoter(this.cardElement, this.userService.username);
        // let numberVotes = this.cardElement.voters.filter(voter => voter.name === this.eventService.username).length;
        return voter == null ? 0 : voter.nbVotes;
    }
}
