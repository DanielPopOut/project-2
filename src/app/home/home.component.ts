import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    public eventCodeInput: string;
    private eventId: string;
    private hostname: string;

    constructor(private router: Router, private eventService: EventService) {
    }

    public newEventClick(): void {
        this.router.navigate(['newevent']);
    }

    public findEvent() {
        if (this.eventCodeInput) {
            let urlSplited = this.eventCodeInput.split('/');
            if (urlSplited.length > 1) {
                this.eventId = urlSplited[0];
                this.hostname = urlSplited[1];
                this.eventService.requestEventFromServer(this.eventCodeInput);
            } else {

            }
        } else {

        }
    }

}
