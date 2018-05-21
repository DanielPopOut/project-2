import { Component, Input, OnInit } from '@angular/core';
import { CardElement } from '../card-element';
import { CardElementService } from '../card-element.service';
import { EventService } from '../event.service';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { ServerService } from '../server.service';
import { Voter } from '../voter';

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
                private userService: UserService, private serverService: ServerService, private router: Router) {
    }

    ngOnInit() {
        this.showInfosBoolean = true;
        this.color = this.getRandomColor();
    }

    public checkUsernameValidAndVoteForCard(): void {
        if (this.userService.isUserNameValid()) {
            this.voteForCardElement();
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
        this.router.navigate(['card-details']);
    }

    public getUserNumberVotes(): number {
        let voter = this.cardElementService.cardElementContainsVoter(this.cardElement, this.userService.username);
        // let numberVotes = this.cardElement.voters.filter(voter => voter.name === this.eventService.username).length;
        return voter == null ? 0 : voter.nbVotes;
    }

    public voteForCardElement(): void {
        let userVoterData = this.cardElementService.cardElementContainsVoter(this.cardElement, this.userService.username);
        userVoterData = userVoterData == null ? new Voter(this.userService.username, 1) : new Voter(this.userService.username, (userVoterData.nbVotes + 1) % 3);

        this.serverService.voteCardElementRequest(this.cardElement, userVoterData).subscribe(response => {
            // this.cardElementService.mettreAJourCardElement(resp.body);
            if (response.status === 200) {
                this.cardElementService.voteForCardElement(this.cardElement._id, this.userService.username);
            }
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

    public test(){
        console.log("yayaya");
    }
}
