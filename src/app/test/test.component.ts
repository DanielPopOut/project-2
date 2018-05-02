import { Component, OnInit } from '@angular/core';
import { HomeCookEvent } from '../home-cook-event';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { HomeCookCard } from '../home-cook-card';
import { CardElement } from '../card-element';
import { Voter } from '../voter';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    public model;
    public test_model = {
        host_name: "eqerezq",
        name: "ezQVINPNPEZf",
        place: "nIEZPFNIPEA",
        date: "2018-03-30T12:42",
        mail: "feafeafea"
    };

    public fakeEvent = {
        _id: undefined,
        host_name: "Daniel",
        name: "Soirée sushis",
        place: "2223 rue saint antoine",
        date: "2018-03-30T12:42",
        mail: "dnaioeno@gmail.com",
        description: "Ce sera du lourd !!!",
        guests: ['Maxime', 'Amandine', 'Prunelle', 'Theo', 'Ash'],
        cards: [new HomeCookCard("0", "Entrée", 0), new HomeCookCard('1', "Plat", 1), new HomeCookCard('2', "Boissons", 2)]
    };
    public voter = new Voter("daniel", 3);

    constructor(private eventService: EventService, private router: Router, private serverService: ServerService) {
    }

    ngOnInit() {
        this.model = new HomeCookEvent()
    }

    testEnvoiEvent() {
        // this.serverService.addHomeCookEventRequest(this.fakeEvent).subscribe(resp => console.log(resp));
        // this.serverService.getAllHomeCookEventRequest("popout").subscribe(resp => console.log(resp));
        // let fakeVoter = new Voter(this.voter.name, (this.voter.nbVotes + 1) % 3);
        // this.serverService.voteCardElementRequest(
        //     new CardElement("5acf76b5ef98fc62f1256371", "Pastèque", 2, "eafeafea", "0", "Remy"), fakeVoter)
        //     .subscribe(response => {
        //         console.log(response);
        //         if (response.status === 200) {
        //             this.voter.nbVotes = fakeVoter.nbVotes;
        //             console.log("nouveau nbVote : ", this.voter.nbVotes);
        //         }
        //     })
        //this.serverService.getCardsElementWithEventIdRequest("popout").subscribe(resp => console.log(resp));
    }
}
