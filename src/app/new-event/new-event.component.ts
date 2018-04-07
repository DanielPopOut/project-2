import { Component, OnInit } from '@angular/core';
import { HomeCookEvent } from '../home-cook-event';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { UserService } from "../user.service";

@Component({
    selector: 'app-new-event',
    templateUrl: './new-event.component.html',
    styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
    public eventToCreate;
    public test_model = {
        host_name: "eqerezq",
        name: "ezQVINPNPEZf",
        place: "nIEZPFNIPEA",
        date: "2018-03-30T12:42",
        mail: "feafeafea"
    }

    constructor(private eventService: EventService, private router: Router, private serverService: ServerService, private userService: UserService) {
    }

    ngOnInit() {
        this.eventToCreate = new HomeCookEvent();
        this.eventToCreate.cards = [];
        this.eventToCreate.guests = [];
    }

    public onSubmit() {
        console.log("avant submit ", this.eventToCreate);
        this.addHomeCookEvent(this.eventToCreate);
    }

    public addHomeCookEvent(homeCookEvent: HomeCookEvent): void {
        this.serverService.addHomeCookEventRequest(homeCookEvent).subscribe(response => {
            if (response.status === 200) {
                homeCookEvent._id = response.body;
                this.userService.username = homeCookEvent.host_name;
                if (this.eventService.createNewEvent(this.eventToCreate)) {
                    console.log("event crée après submit ", this.eventService.event);
                    this.router.navigate(['event']);
                }
            }
        });
    }

}
