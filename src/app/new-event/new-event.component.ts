import { Component, OnInit } from '@angular/core';
import { HomeCookEvent } from '../home-cook-event';
import { EventService } from '../event.service';
import { ServerService } from '../server.service';
import { UserService } from "../user.service";

@Component({
    selector: 'app-new-event',
    templateUrl: './new-event.component.html',
    styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
    public eventToCreate;

    constructor(private eventService: EventService, private serverService: ServerService, private userService: UserService) {
    }

    ngOnInit() {
        this.eventToCreate = new HomeCookEvent();
        this.eventToCreate.cards = [];
        this.eventToCreate.guests = [];
    }

    public onSubmit() {
        this.addHomeCookEvent(this.eventToCreate);
    }

    public addHomeCookEvent(homeCookEvent: HomeCookEvent): void {
        this.serverService.addHomeCookEventRequest(homeCookEvent).subscribe(response => {
            if (response.status === 200) {
                homeCookEvent._id = response.body;
                if (this.eventService.setEvent(this.eventToCreate)) {
                    this.eventService.emitNewHomeCookEvent();
                    this.eventService.setNewEventCards([]);
                    this.userService.setUsername(homeCookEvent.host_name);
                }
            }
        });
    }

}
