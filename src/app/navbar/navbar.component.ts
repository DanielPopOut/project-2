import { Component, OnInit } from '@angular/core';
import { HomeCookEvent } from '../home-cook-event';
import { EventService } from '../event.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public event: HomeCookEvent;

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.event = this.eventService.event;
    }



}
